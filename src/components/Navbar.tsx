// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}  // Slide down animation on load
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 text-white shadow-lg fixed w-full z-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.2 }}  // Logo hover animation
                            transition={{ duration: 0.3 }}
                        >
                            <Link to="/" className="text-2xl font-bold text-white">
                                MyPortfolio
                            </Link>
                        </motion.div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex space-x-4">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">About</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Projects</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/skills" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Skills</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/experience" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Experience</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/education" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Education</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Contact</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/unique" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Unique Section</Link>
                            </motion.div>
                        </div>
                    </div>
                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-300 hover:text-white focus:outline-none">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
