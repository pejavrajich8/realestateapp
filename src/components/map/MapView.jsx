import React, { useState } from 'react';

const center = {
    lat: 37.7749, // Default latitude (San Francisco)
    lng: -122.4194 // Default longitude
};

export default function MapView({ properties = [] }) {
    const [mapCenter] = useState(center);

    // TODO: Implement Google Maps integration
    // You'll need to:
    // 1. Get a Google Maps API key
    // 2. Install @react-google-maps/api
    // 3. Implement the LoadScript and GoogleMap components
    // 4. Add markers for each property

    return (
        <div className="w-full h-96 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-lg">
            <div className="text-center">
                <p className="text-gray-600">Map View Placeholder</p>
                <p className="text-sm text-gray-500">
                    TODO: Implement Google Maps integration<br/>
                    Properties to show: {properties.length}
                </p>
            </div>
        </div>
    );
}