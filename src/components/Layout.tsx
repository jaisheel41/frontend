import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const files = ['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'];

const Layout: React.FC = () => {
    const [activeSection, setActiveSection] = useState(files[0]);
    const location = useLocation(); // Use location to track active route

    // Update active section based on the current route
    useEffect(() => {
        const section = files.find((file) => location.pathname.includes(file.toLowerCase())) || files[0];
        setActiveSection(section);
    }, [location]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
            {/* Navbar */}
            <div className="z-10 w-full fixed top-0 bg-[#1e1e2e] p-4 shadow-md">
                <div className="flex justify-center space-x-8">
                    {files.map((file) => (
                        <Link
                            key={file}
                            to={`/${file.toLowerCase().replace(' ', '-')}`}
                            className={`text-sm font-medium cursor-pointer transition-colors ${
                                activeSection === file ? 'text-purple-400' : 'text-gray-400'
                            } hover:text-purple-300`}
                        >
                            {file}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 pt-20 space-y-16">
                <Outlet /> {/* This renders the corresponding page for the active route */}
            </div>
        </div>
    );
};

export default Layout;
