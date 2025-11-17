import React from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyList({ properties = [] }) {
    if (!properties || properties.length === 0) {
        return <div className="text-center py-8 text-gray-600">No properties found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}