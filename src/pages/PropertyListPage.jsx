import React, { useState } from 'react';
import PropertyList from '../components/property/PropertyList';
import PropertySearch from '../components/property/PropertySearch';
import Loading from '../components/common/Loading';

export default function PropertyListPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (searchCriteria) => {
        // TODO: Implement search functionality
        console.log('Search criteria:', searchCriteria);
        setProperties([]);
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