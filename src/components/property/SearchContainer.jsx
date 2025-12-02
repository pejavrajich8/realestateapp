import React, { useState } from 'react';
import PropertySearch from './PropertySearch';
import PropertyList from './PropertyList';
import Loading from '../common/Loading';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage, LOCAL_STORAGE_KEYS } from '../../js/localStorage';

export default function SearchContainer({ hideInternalSearch = false }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeFilters, setActiveFilters] = useState({});

    let API_BASE_URL = import.meta.env.VITE_RENTCAST_API_BASE_URL;
    if (!API_BASE_URL) {
        API_BASE_URL = import.meta.env.REACT_APP_RENTCAST_API_BASE_URL;
    }
    if (!API_BASE_URL && typeof process !== 'undefined') {
        API_BASE_URL = process.env.REACT_APP_RENTCAST_API_BASE_URL;
    }

    let API_KEY = import.meta.env.VITE_RENTCAST_API_KEY;
    if (!API_KEY) {
        API_KEY = import.meta.env.REACT_APP_RENTCAST_API_KEY;
    }
    if (!API_KEY && typeof process !== 'undefined') {
        API_KEY = process.env.REACT_APP_RENTCAST_API_KEY;
    }

    const handleSearch = async ({ location, minPrice, maxPrice, propertyType, priceRange }) => {
        setLoading(true);
        setError(null);
        setSearchResults([]);

        // Store the active filters
        setActiveFilters({
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            propertyType: propertyType || null
        });

        console.log('API_KEY:', API_KEY ? 'Found' : 'Missing');
        console.log('API_BASE_URL:', API_BASE_URL);

        if (!API_BASE_URL) {
            setError('API base URL is not defined');
            setLoading(false);
            return;
        }

        const cleanedLocation = location ? location.trim() : '';
        if (!cleanedLocation) {
            setError('Please enter a location (e.g., "Provo, UT" or "San Antonio, TX")');
            setLoading(false);
            return;
        }

        try {
            if (priceRange && !minPrice && !maxPrice) {
                const priceParts = priceRange.split(/[^0-9]+/).filter(function(part) {
                    return part.length > 0;
                });
                
                if (priceParts.length === 2) {
                    minPrice = priceParts[0];
                    maxPrice = priceParts[1];
                } else if (priceParts.length === 1) {
                    minPrice = priceParts[0];
                }
            }

            const params = new URLSearchParams();
            
            const locationParts = cleanedLocation.split(',').map(function(part) {
                return part.trim().replace(/\s+/g, ' ');
            });
            
            if (locationParts.length >= 2) {
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
                setError('Please include the state. Format: "City, State" (e.g., "Los Angeles, CA" or "San Antonio, TX")');
                setLoading(false);
                return;
            }
            
            if (minPrice) {
                params.append('minPrice', minPrice);
            }
            if (maxPrice) {
                params.append('maxPrice', maxPrice);
            }
            if (propertyType) {
                params.append('propertyType', propertyType);
            }

            params.append('limit', '100');
            
            const baseUrlCleaned = API_BASE_URL.replace(/\/$/, '');
            const url = baseUrlCleaned + '/listings/sale?' + params.toString();

            const headers = {
                'Accept': 'application/json'
            };
     
            if (API_KEY) {
                headers['X-Api-Key'] = API_KEY;
            }

            console.log('Request URL:', url);
            console.log('Request Headers:', headers);

            const response = await fetch(url, { headers: headers });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                console.error('Response status:', response.status);
                console.error('Response statusText:', response.statusText);
                throw new Error('Error: ' + response.status + ' ' + response.statusText + '. Details: ' + errorText);
            }

            const data = await response.json();
            console.log('API Response:', data);
            console.log('API Response Type:', Array.isArray(data) ? 'Array' : typeof data);
            console.log('Number of results:', Array.isArray(data) ? data.length : 'N/A');
            
            // Log the structure of the response to understand it better
            if (data && typeof data === 'object') {
                console.log('Response object keys:', Object.keys(data));
            }
            
            let rawResults = [];
            if (Array.isArray(data)) {
                rawResults = data;
            } else if (data && Array.isArray(data.results)) {
                rawResults = data.results;
            } else if (data && Array.isArray(data.listings)) {
                rawResults = data.listings;
            } else if (data && Array.isArray(data.properties)) {
                rawResults = data.properties;
            } else if (data && Array.isArray(data.data)) {
                rawResults = data.data;
            }
            
            console.log('Extracted results array length:', rawResults.length);

            const mappedResults = rawResults.map(function(item, index) {
                // Debug: Log the first item to see what image fields are available
                if (index === 0) {
                    console.log('Sample property data:', item);
                    console.log('Available image fields:', {
                        images: item.images,
                        photos: item.photos,
                        photoUrl: item.photoUrl,
                        photoUrls: item.photoUrls,
                        imageUrl: item.imageUrl,
                        thumbnail: item.thumbnail,
                        thumbnailUrl: item.thumbnailUrl,
                        thumbnail_url: item.thumbnail_url
                    });
                }

                let thumbnailUrl = null;
                // Try various possible image field names from RentCast API
                if (item.thumbnail_url) {
                    thumbnailUrl = item.thumbnail_url;
                } else if (item.thumbnailUrl) {
                    thumbnailUrl = item.thumbnailUrl;
                } else if (item.thumbnail) {
                    thumbnailUrl = item.thumbnail;
                } else if (item.images && item.images.length > 0) {
                    thumbnailUrl = item.images[0];
                } else if (item.photos && item.photos.length > 0) {
                    thumbnailUrl = item.photos[0];
                } else if (item.photoUrls && item.photoUrls.length > 0) {
                    thumbnailUrl = item.photoUrls[0];
                } else if (item.photoUrl) {
                    thumbnailUrl = item.photoUrl;
                } else if (item.imageUrl) {
                    thumbnailUrl = item.imageUrl;
                }

                let allImages = [];
                if (item.images && Array.isArray(item.images)) {
                    allImages = item.images;
                } else if (item.photos && Array.isArray(item.photos)) {
                    allImages = item.photos;
                } else if (item.photoUrls && Array.isArray(item.photoUrls)) {
                    allImages = item.photoUrls;
                } else if (thumbnailUrl) {
                    // If we have a thumbnail but no array, create an array with just the thumbnail
                    allImages = [thumbnailUrl];
                }

                let fullAddress = item.formattedAddress;
                if (!fullAddress) {
                    fullAddress = item.addressLine1 + ', ' + item.city + ', ' + item.state;
                }

                return {
                    id: item.id,
                    address: fullAddress,
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
                    lastSaleDate: item.lastSaleDate,
                    lastSalePrice: item.lastSalePrice,
                    daysOnMarket: item.daysOnMarket,
                    listedDate: item.listedDate || item.listDate,
                    statusDate: item.statusDate,
                    hoa: item.hoa,
                    features: item.features,
                    owner: item.owner,
                    ownerOccupied: item.ownerOccupied,
                    images: allImages,
                    thumbnail_url: thumbnailUrl,
                    photoUrls: allImages
                };
            });

            console.log('Mapped results:', mappedResults);
            setSearchResults(mappedResults);
            
            saveToLocalStorage(LOCAL_STORAGE_KEYS.PROPERTIES, mappedResults);
            console.log('Saved to localStorage:', mappedResults.length, 'properties');
            
        } catch (err) {
            const errorMessage = err && err.message ? err.message : 'An error occurred while fetching properties';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {!hideInternalSearch && <PropertySearch onSearch={handleSearch} />}
            
            {loading && <Loading />}
            
            {error && <div className="text-red-500 mt-4">{error}</div>}
            
            {!loading && !error && <PropertyList properties={searchResults} filters={activeFilters} />}
        </div>
    );  
}
