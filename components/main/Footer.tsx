import React from 'react';

const Footer = () => {
    return (
        <footer className="p-4 bg-white shadow-inner mt-8 dark:bg-gray-800">
            <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Toolverse. All Rights Reserved.</p>
                <p>Made with ❤️ by [Your Name] and Gemini</p>
            </div>
        </footer>
    );
};

export default Footer;