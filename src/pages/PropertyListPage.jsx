import React, { useState, useEffect } from 'react';
import PropertyList from '../components/property/PropertyList';
import PropertySearch from '../components/property/PropertySearch';
import Loading from '../components/common/Loading';
import { saveToLocalStorage, loadFromLocalStorage, LOCAL_STORAGE_KEYS } from '../js/localStorage';

export default function PropertyListPage() {
    const [properties, setProperties] = useState(() => {
        // Initialize state from localStorage
        const savedProperties = loadFromLocalStorage(LOCAL_STORAGE_KEYS.PROPERTIES);
        return savedProperties || [];
    });
    const [loading, setLoading] = useState(false);

    // Save properties to localStorage whenever they change
    useEffect(() => {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.PROPERTIES, properties);
    }, [properties]);

    const handleSearch = async (searchCriteria) => {
        // TODO: Implement search functionality
        console.log('Search criteria:', searchCriteria);
        setLoading(true);
        
        // Simulate API call - replace with actual API call later
        setTimeout(() => {
            // When you implement real API, the results will be saved automatically
            // Example: setProperties(apiResults);
            setProperties([]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Property Listings</h1>
                <PropertySearch onSearch={handleSearch} />
                {loading ? <Loading /> : <PropertyList properties={properties} />}
            </div>
        </div>
    );
}