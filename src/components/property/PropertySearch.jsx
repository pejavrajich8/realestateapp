import React, { useState } from 'react';

export default function PropertySearch({ onSearch }) {
    const [location, setLocation] = useState('');
    const [state, setState] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Search submitted:', { location, state, minPrice, maxPrice, propertyType });
        if (onSearch) {
            onSearch({ location, state, minPrice, maxPrice, propertyType });
        }
    };

    return (
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                    type="text"
                    placeholder="City, State (e.g., Los Angeles, CA)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                    <option value="">All Property Types</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Manufactured">Manufactured</option>
                    <option value="Multi-Family">Multi-Family (2-4 units)</option>
                    <option value="Apartment">Apartment (5+ units)</option>
                    <option value="Land">Land</option>
                </select>
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                >
                    Search
                </button>
            </div>
        </form>
    );
}