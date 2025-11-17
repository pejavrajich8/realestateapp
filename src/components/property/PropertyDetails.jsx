import React from 'react';

export default function PropertyDetails({ property }) {
    // TODO: Implement property details functionality
    
    if (!property) {
        return <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-600">No property data available</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title || 'Property Title'}</h1>
            <img 
                src={property.image || '/placeholder-image.jpg'} 
                alt={property.title || 'Property'} 
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-gray-700 mb-6 leading-relaxed">{property.description || 'Property description goes here'}</p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Rental Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-700"><span className="font-medium">Price:</span> ${property.price || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-medium">Location:</span> {property.location || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-medium">Bedrooms:</span> {property.bedrooms || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-medium">Bathrooms:</span> {property.bathrooms || 'N/A'}</p>
                <p className="text-gray-700 md:col-span-2"><span className="font-medium">Available from:</span> {property.availableFrom || 'N/A'}</p>
            </div>
        </div>
    );
}