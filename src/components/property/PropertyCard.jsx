import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/properties/${property.id}`);
    };

    const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    const image = property.thumbnail_url || property.image || defaultImage;
    const title = property.addressLine1 || property.address || 'Property';
    const location = property.city && property.state 
        ? `${property.city}, ${property.state}` 
        : property.address || 'Location not specified';
    const price = property.price ? `$${property.price.toLocaleString()}` : 'Price not available';
    const bedrooms = property.bedrooms || 'N/A';
    const bathrooms = property.bathrooms || 'N/A';
    const squareFootage = property.squareFootage ? `${property.squareFootage.toLocaleString()} sq ft` : '';
    const description = squareFootage 
        ? `${bedrooms} bed, ${bathrooms} bath • ${squareFootage}`
        : `${bedrooms} bed, ${bathrooms} bath`;

    return (
        <div 
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 m-2 transition-shadow duration-300 hover:shadow-xl cursor-pointer"
            onClick={handleClick}
        >
            <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{title}</h2>
            <p className="text-gray-700">{location}</p>
            <p className="text-lg font-semibold text-blue-600">{price}</p>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );
}