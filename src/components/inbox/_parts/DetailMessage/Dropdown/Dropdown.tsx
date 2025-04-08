import React, { useState } from 'react';

const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleDropdown} className="focus:outline-none cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.00008 6.66667C3.26675 6.66667 2.66675 7.26667 2.66675 8.00001C2.66675 8.73334 3.26675 9.33334 4.00008 9.33334C4.73341 9.33334 5.33341 8.73334 5.33341 8.00001C5.33341 7.26667 4.73341 6.66667 4.00008 6.66667ZM12.0001 6.66667C11.2667 6.66667 10.6667 7.26667 10.6667 8.00001C10.6667 8.73334 11.2667 9.33334 12.0001 9.33334C12.7334 9.33334 13.3334 8.73334 13.3334 8.00001C13.3334 7.26667 12.7334 6.66667 12.0001 6.66667ZM6.66675 8.00001C6.66675 7.26667 7.26675 6.66667 8.00008 6.66667C8.73341 6.66667 9.33341 7.26667 9.33341 8.00001C9.33341 8.73334 8.73341 9.33334 8.00008 9.33334C7.26675 9.33334 6.66675 8.73334 6.66675 8.00001Z" fill="#4F4F4F" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        <button className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left cursor-pointer">
                            Edit
                        </button>
                        <hr className="border-gray-300" />
                        <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left cursor-pointer">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;