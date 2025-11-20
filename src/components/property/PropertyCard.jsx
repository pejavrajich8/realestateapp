import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
   const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/properties/${property.id}`);
    };

    const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    let image = defaultImage;
    if (property.thumbnail_url) {
        image = property.thumbnail_url;
    } else if (property.image) {
        image = property.image;
    }
    
    let title = 'Property';
    if (property.addressLine1) {
        title = property.addressLine1;
    } else if (property.address) {
        title = property.address;
    }
    
 
    let location = 'Location not specified';
    if (property.city && property.state) {
        location = property.city + ', ' + property.state;
    } else if (property.address) {
        location = property.address;
    }
    
    let price = 'Price not available';
    if (property.price) {
        price = '$' + property.price.toLocaleString();
    }
    
    let bedrooms = 'N/A';
    if (property.bedrooms) {
        bedrooms = property.bedrooms;
    }
    
    let bathrooms = 'N/A';
    if (property.bathrooms) {
        bathrooms = property.bathrooms;
    }
    

    let squareFootage = '';
    if (property.squareFootage) {
        squareFootage = property.squareFootage.toLocaleString() + ' sq ft';
    }
    
    let description = bedrooms + ' bed, ' + bathrooms + ' bath';
    if (squareFootage) {
        description = description + ' • ' + squareFootage;
    }

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