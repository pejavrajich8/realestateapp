import React from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyList({ properties = [], filters = {} }) {
    if (!properties || properties.length === 0) {
        return <div className="text-center py-8 text-gray-600">No properties found.</div>;
    }


    const matchesFilters = (property) => {
  
        if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
            return false;
        }
        
      
        if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
            return false;
        }
        
 
        if (filters.propertyType && property.propertyType !== filters.propertyType) {
            return false;
        }
        
        return true;
    };


    const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.propertyType;
    
    if (!hasActiveFilters) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        );
    }


    const matchingProperties = properties.filter(matchesFilters);
    const nonMatchingProperties = properties.filter(property => !matchesFilters(property));

    return (
        <div className="p-4">

            {matchingProperties.length > 0 && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {matchingProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            )}

            {nonMatchingProperties.length > 0 && (
                <div className="my-8">
                    <div className="flex items-center">
                        <div className="grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 font-medium">
                            Properties Outside Your Filter Criteria
                        </span>
                        <div className="grow border-t border-gray-300"></div>
                    </div>
                </div>
            )}

            {nonMatchingProperties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-75">
                    {nonMatchingProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}

            {matchingProperties.length === 0 && nonMatchingProperties.length > 0 && (
                <div className="text-center py-4 text-gray-600 mb-4">
                    No properties match your filter criteria. Showing other properties below.
                </div>
            )}
        </div>
    );
}