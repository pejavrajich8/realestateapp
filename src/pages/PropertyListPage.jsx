import React, { useState, useEffect } from 'react';
import PropertyList from '../components/property/PropertyList';
import { loadFromLocalStorage, LOCAL_STORAGE_KEYS } from '../js/localStorage';

export default function PropertyListPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load properties from local storage
        const savedProperties = loadFromLocalStorage(LOCAL_STORAGE_KEYS.PROPERTIES);
        if (savedProperties) {
            setProperties(savedProperties);
        }
        setLoading(false);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Property Listings</h1>
                {loading ? (
                    <div className="text-center py-8 text-gray-600">Loading properties...</div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        No saved properties found. Please search for properties on the home page.
                    </div>
                ) : (
                    <PropertyList properties={properties} filters={{}} />
                )}
            </div>
        </div>
    );
}