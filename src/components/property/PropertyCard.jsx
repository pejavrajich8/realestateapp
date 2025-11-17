import React from 'react';

export default function PropertyCard({ property }) {
    const { image, price, title, location, description } = property;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 m-2 transition-shadow duration-300 hover:shadow-xl">
            <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{title}</h2>
            <p className="text-gray-700">{location}</p>
            <p className="text-lg font-semibold text-blue-600">{price}</p>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );
}