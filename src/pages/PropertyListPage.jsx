import React from 'react';
import SearchContainer from '../components/property/SearchContainer';

export default function PropertyListPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Property Listings</h1>
                <SearchContainer />
            </div>
        </div>
    );
}