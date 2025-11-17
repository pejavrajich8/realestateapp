import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../components/property/PropertyDetails';
import Loading from '../components/common/Loading';

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const loading = false;
    const property = null; // TODO: Fetch property data using the id parameter

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Property Details</h1>
                {property ? (
                    <PropertyDetails property={property} />
                ) : (
                    <div className="text-center py-8 text-gray-600">Property not found (ID: {id})</div>
                )}
            </div>
        </div>
    );
}