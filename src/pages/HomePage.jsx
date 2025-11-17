import React, { useState } from 'react';
import PropertySearch from '../components/property/PropertySearch';
import PropertyList from '../components/property/PropertyList';
import Loading from '../components/common/Loading';

export default function HomePage() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (searchParams) => {
        // TODO: Implement search functionality
        console.log('Search params:', searchParams);
        setSearchResults([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to the Real Estate App</h1>
                <PropertySearch onSearch={handleSearch} />
                {loading ? (
                    <Loading />
                ) : (
                    <PropertyList properties={searchResults} />
                )}
            </div>
        </div>
    );
}