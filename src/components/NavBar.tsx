import React from 'react';
import Link from 'next/link';

// Define a type for the props
type NavbarProps = {
    onCategoryClick: () => void;
    onServicesClick: () => void;
    onSettingsClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onCategoryClick, onServicesClick, onSettingsClick }) => {
    return (
        <nav className="bg-custom-blue text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <Link href="/" className="hover:text-gray-300">
                        Word Search Monkey
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <span onClick={onCategoryClick} className="hover:text-gray-300 cursor-pointer">
                        Category
                    </span>
                    <span onClick={onServicesClick} className="hover:text-gray-300 cursor-pointer">
                        Services
                    </span>
                    <span onClick={onSettingsClick} className="hover:text-gray-300 cursor-pointer">
                        Settings
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
