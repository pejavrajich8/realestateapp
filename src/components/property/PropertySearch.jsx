import React, { useState } from 'react';

export default function PropertySearch({ onSearch }) {
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Search submitted:', { location, priceRange, propertyType });
        if (onSearch) {
            onSearch({ location, priceRange, propertyType });
        }
    };

    return (
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                    type="text"
                    placeholder="Price Range"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                    <option value="">Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
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