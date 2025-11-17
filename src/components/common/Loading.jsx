import React from 'react';

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>
    );
}