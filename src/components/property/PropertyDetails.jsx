import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyDetails({ property }) {
 
    const navigate = useNavigate();
    

    if (!property) {
        return <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-600">No property data available</div>;
    }

    function formatPrice(price) {
        if (price) {
            return '$' + price.toLocaleString();
        } else {
            return 'Price not available';
        }
    }


    const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%239ca3af"%3ENo Image Available%3C/text%3E%3C/svg%3E';

    // Get the property image
    let propertyImage = defaultImage;
    if (property.thumbnail_url) {
        propertyImage = property.thumbnail_url;
    } else if (property.image) {
        propertyImage = property.image;
    }

    // Get the property title
    let propertyTitle = 'Property Details';
    if (property.addressLine1) {
        propertyTitle = property.addressLine1;
    } else if (property.address) {
        propertyTitle = property.address;
    }

    // Get the property location
    let propertyLocation = 'Location not specified';
    if (property.city && property.state) {
        propertyLocation = property.city + ', ' + property.state;
        if (property.zipCode) {
            propertyLocation = propertyLocation + ' ' + property.zipCode;
        }
    } else if (property.address) {
        propertyLocation = property.address;
    }

    // Format square footage
    let formattedSquareFootage = 'N/A';
    if (property.squareFootage) {
        formattedSquareFootage = property.squareFootage.toLocaleString() + ' sq ft';
    }

    // Format lot size
    let formattedLotSize = 'N/A';
    if (property.lotSize) {
        formattedLotSize = property.lotSize.toLocaleString() + ' sq ft';
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          
            <button 
                onClick={function() {
                    navigate('/properties');
                }}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
                ← Back to Properties
            </button>
            
          
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {propertyTitle}
            </h1>
            
        
            <img 
                src={propertyImage} 
                alt={property.addressLine1 || 'Property'} 
                className="w-full h-96 object-cover rounded-lg mb-6"
            />
            
       
            <div className="mb-6">
                <p className="text-2xl text-blue-600 font-bold mb-2">{formatPrice(property.price)}</p>
                <p className="text-lg text-gray-700">{propertyLocation}</p>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <p className="text-gray-700">
                    <span className="font-medium">Bedrooms:</span> {property.bedrooms || 'N/A'}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Bathrooms:</span> {property.bathrooms || 'N/A'}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Square Footage:</span> {formattedSquareFootage}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Lot Size:</span> {formattedLotSize}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Property Type:</span> {property.propertyType || 'N/A'}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Year Built:</span> {property.yearBuilt || 'N/A'}
                </p>
                {property.county && (
                    <p className="text-gray-700">
                        <span className="font-medium">County:</span> {property.county}
                    </p>
                )}
                {property.hoa && property.hoa.fee && (
                    <p className="text-gray-700">
                        <span className="font-medium">HOA Fee:</span> ${property.hoa.fee}/month
                    </p>
                )}
            </div>

            {/* Sale History Section - only show if we have sale data */}
            {(property.lastSaleDate || property.lastSalePrice) && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-6">Sale History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {property.lastSaleDate && (
                            <p className="text-gray-700">
                                <span className="font-medium">Last Sale Date:</span> {new Date(property.lastSaleDate).toLocaleDateString()}
                            </p>
                        )}
                        {property.lastSalePrice && (
                            <p className="text-gray-700">
                                <span className="font-medium">Last Sale Price:</span> ${property.lastSalePrice.toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Property Features Section - only show if we have features */}
            {property.features && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-6">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {property.features.architectureType && (
                            <p className="text-gray-700">
                                <span className="font-medium">Architecture:</span> {property.features.architectureType}
                            </p>
                        )}
                        {property.features.roomCount && (
                            <p className="text-gray-700">
                                <span className="font-medium">Total Rooms:</span> {property.features.roomCount}
                            </p>
                        )}
                        {property.features.floorCount && (
                            <p className="text-gray-700">
                                <span className="font-medium">Floors:</span> {property.features.floorCount}
                            </p>
                        )}
                        {property.features.garageSpaces && (
                            <p className="text-gray-700">
                                <span className="font-medium">Garage Spaces:</span> {property.features.garageSpaces}
                            </p>
                        )}
                        {property.features.pool && (
                            <p className="text-gray-700">
                                <span className="font-medium">Pool:</span> {property.features.poolType || 'Yes'}
                            </p>
                        )}
                        {property.features.cooling && (
                            <p className="text-gray-700">
                                <span className="font-medium">Cooling:</span> {property.features.coolingType || 'Yes'}
                            </p>
                        )}
                        {property.features.heating && (
                            <p className="text-gray-700">
                                <span className="font-medium">Heating:</span> {property.features.heatingType || 'Yes'}
                            </p>
                        )}
                        {property.features.fireplace && (
                            <p className="text-gray-700">
                                <span className="font-medium">Fireplace:</span> {property.features.fireplaceType || 'Yes'}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}