import React, { useState } from 'react';
import PropertySearch from './PropertySearch';
import PropertyList from './PropertyList';
import Loading from '../common/Loading';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage, LOCAL_STORAGE_KEYS } from '../../utils/localStorage';

export default function SearchContainer({ hideInternalSearch = false }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Vite exposes env variables on import.meta.env. Support both VITE_* and legacy REACT_APP_* names
    const BASE = import.meta.env.VITE_RENTCAST_API_BASE_URL
        || import.meta.env.REACT_APP_RENTCAST_API_BASE_URL
        || (typeof process !== 'undefined' ? process.env.REACT_APP_RENTCAST_API_BASE_URL : undefined);

    const API_KEY = import.meta.env.VITE_RENTCAST_API_KEY
        || import.meta.env.REACT_APP_RENTCAST_API_KEY
        || (typeof process !== 'undefined' ? process.env.REACT_APP_RENTCAST_API_KEY : undefined);

    const handleSearch = async ({ location, minPrice, maxPrice, propertyType, priceRange }) => {
        setLoading(true);
        setError(null);
        setSearchResults([]);

        console.log('API_KEY:', API_KEY ? 'Found' : 'Missing');
        console.log('BASE:', BASE);

        if (!BASE) {
            setError('API base URL is not defined');
            setLoading(false);
            return;
        }

        // Sanitize and validate location
        const sanitizedLocation = location?.trim();
        if (!sanitizedLocation) {
            setError('Please enter a location (e.g., "Provo, UT" or "San Antonio, TX")');
            setLoading(false);
            return;
        }

        try {
            // fields to request / keep from the response (adjust names to RentCast schema)
            const REQUESTED_FIELDS = [
                'id',
                'formattedAddress',
                'addressLine1',
                'city',
                'state',
                'zipCode',
                'price',
                'bedrooms',
                'bathrooms',
                'squareFootage',
                'lotSize',
                'yearBuilt',
                'propertyType'
            ];

            // normalize priceRange -> minPrice/maxPrice if provided as a single string
            if ((!minPrice && !maxPrice) && priceRange) {
                const parts = priceRange.split(/[^0-9]+/).filter(Boolean);
                if (parts.length === 2) {
                    minPrice = parts[0];
                    maxPrice = parts[1];
                } else if (parts.length === 1) {
                    minPrice = parts[0];
                }
            }

            const params = new URLSearchParams();
            // RentCast uses 'city' and 'state' parameters, not 'location'
            // Sanitize and parse location input
            const locationParts = sanitizedLocation.split(',').map(s => s.trim().replace(/\s+/g, ' '));
            
            if (locationParts.length >= 2) {
                // Format: "City, State" or "City, State Abbreviation"
                const city = locationParts[0];
                const state = locationParts[1];
                
                if (city && state) {
                    params.append('city', city);
                    params.append('state', state);
                } else {
                    setError('Please enter location in format: "City, State" (e.g., "Provo, UT")');
                    setLoading(false);
                    return;
                }
            } else {
                // State is required - show helpful error
                setError('Please include the state. Format: "City, State" (e.g., "Los Angeles, CA" or "San Antonio, TX")');
                setLoading(false);
                return;
            }
            
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);
            if (propertyType) params.append('propertyType', propertyType);

            const url = `${BASE.replace(/\/$/, '')}/listings/sale?${params.toString()}`;

            const headers = {
                'Accept': 'application/json',
                ...(API_KEY ? { 'X-Api-Key': API_KEY } : {}),
            };

            console.log('Request URL:', url);
            console.log('Request Headers:', headers);

            const res = await fetch(url, { headers });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            console.log('API Response:', data);
            
            const rawResults = data || [];

            // RentCast returns an array directly, map the fields we need
            const mapped = rawResults.map(item => ({
                id: item.id,
                address: item.formattedAddress || `${item.addressLine1}, ${item.city}, ${item.state}`,
                addressLine1: item.addressLine1,
                city: item.city,
                state: item.state,
                zipCode: item.zipCode,
                county: item.county,
                latitude: item.latitude,
                longitude: item.longitude,
                price: item.price,
                bedrooms: item.bedrooms,
                bathrooms: item.bathrooms,
                squareFootage: item.squareFootage,
                lotSize: item.lotSize,
                yearBuilt: item.yearBuilt,
                propertyType: item.propertyType,
                // Additional details
                lastSaleDate: item.lastSaleDate,
                lastSalePrice: item.lastSalePrice,
                hoa: item.hoa,
                features: item.features,
                owner: item.owner,
                ownerOccupied: item.ownerOccupied,
                // Include image/photo URLs from the API
                images: item.images || item.photos || [],
                thumbnail_url: item.images?.[0] || item.photos?.[0] || item.photoUrl || item.imageUrl,
                photoUrls: item.photoUrls || item.images || item.photos || []
            }));

            console.log('Mapped results:', mapped);
            setSearchResults(mapped);
            
            // Save results to localStorage
            saveToLocalStorage(LOCAL_STORAGE_KEYS.PROPERTIES, mapped);
            console.log('Saved to localStorage:', mapped.length, 'properties');
        } catch (err) {
            setError(err?.message || 'An error occurred while fetching properties');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {!hideInternalSearch && <PropertySearch onSearch={handleSearch} />}
            {loading && <Loading />}
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {!loading && !error && <PropertyList properties={searchResults} />}
        </div>
    );  
};