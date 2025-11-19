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
            if (location) {
                // Try to split location into city and state
                const locationParts = location.split(',').map(s => s.trim());
                if (locationParts.length >= 2) {
                    params.append('city', locationParts[0]);
                    params.append('state', locationParts[1]);
                } else {
                    params.append('city', location);
                }
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
                // If subscription is inactive, use mock data for development
                if (res.status === 401) {
                    console.warn('API subscription inactive - using mock data');
                    const mockData = [
                        {
                            id: '1',
                            formattedAddress: '123 Main St, Provo, UT 84601',
                            addressLine1: '123 Main St',
                            city: 'Provo',
                            state: 'UT',
                            zipCode: '84601',
                            price: 450000,
                            bedrooms: 3,
                            bathrooms: 2,
                            squareFootage: 1800,
                            propertyType: 'Single Family'
                        },
                        {
                            id: '2',
                            formattedAddress: '456 Oak Ave, Provo, UT 84604',
                            addressLine1: '456 Oak Ave',
                            city: 'Provo',
                            state: 'UT',
                            zipCode: '84604',
                            price: 525000,
                            bedrooms: 4,
                            bathrooms: 3,
                            squareFootage: 2400,
                            propertyType: 'Single Family'
                        },
                        {
                            id: '3',
                            formattedAddress: '789 Pine Dr, Provo, UT 84606',
                            addressLine1: '789 Pine Dr',
                            city: 'Provo',
                            state: 'UT',
                            zipCode: '84606',
                            price: 380000,
                            bedrooms: 3,
                            bathrooms: 2.5,
                            squareFootage: 1650,
                            propertyType: 'Townhouse'
                        }
                    ];
                    
                    const mapped = mockData.map(item => ({
                        id: item.id,
                        address: item.formattedAddress,
                        addressLine1: item.addressLine1,
                        city: item.city,
                        state: item.state,
                        zipCode: item.zipCode,
                        price: item.price,
                        bedrooms: item.bedrooms,
                        bathrooms: item.bathrooms,
                        squareFootage: item.squareFootage,
                        propertyType: item.propertyType
                    }));
                    
                    setSearchResults(mapped);
                    
                    // Save mock results to localStorage
                    saveToLocalStorage(LOCAL_STORAGE_KEYS.PROPERTIES, mapped);
                    console.log('Saved mock data to localStorage:', mapped.length, 'properties');
                    
                    setLoading(false);
                    return;
                }
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
                price: item.price,
                bedrooms: item.bedrooms,
                bathrooms: item.bathrooms,
                squareFootage: item.squareFootage,
                lotSize: item.lotSize,
                yearBuilt: item.yearBuilt,
                propertyType: item.propertyType
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