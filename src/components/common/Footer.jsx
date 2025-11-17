import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full p-4 bg-gray-800 text-white text-center">
            <p>&copy; {new Date().getFullYear()} Real Estate App. All rights reserved.</p>
            <div>
                <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a> | 
                <a href="/terms" className="text-gray-400 hover:text-white"> Terms of Service</a>
            </div>
        </footer>
    );
}