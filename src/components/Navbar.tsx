// // src/components/Navbar.tsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const Navbar: React.FC = () => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     return (
//         <motion.nav
//             initial={{ y: -100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="bg-gray-800 text-white shadow-lg fixed w-full z-10"
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-16">
//                     <div className="flex-shrink-0">
//                         <motion.div
//                             whileHover={{ scale: 1.2 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <Link to="/" className="text-2xl font-bold text-white">
//                                 MyPortfolio
//                             </Link>
//                         </motion.div>
//                     </div>
//                     <div className="hidden md:flex space-x-4">
//                         {['About', 'Projects', 'Skills', 'Experience', 'Education', 'Contact', 'Unique Section'].map((section) => (
//                             <motion.div key={section} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                                 <Link to={`/${section.toLowerCase().replace(/ /g, '')}`} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
//                                     {section}
//                                 </Link>
//                             </motion.div>
//                         ))}
//                     </div>
//                     {/* Mobile Menu Toggle Button */}
//                     <div className="md:hidden flex items-center">
//                         <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
//                             <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {/* Mobile Menu */}
//             {isMobileMenuOpen && (
//                 <div className="md:hidden bg-gray-800 px-4 py-4 space-y-1">
//                     {['About', 'Projects', 'Skills', 'Experience', 'Education', 'Contact', 'Unique Section'].map((section) => (
//                         <Link
//                             key={section}
//                             to={`/${section.toLowerCase().replace(/ /g, '')}`}
//                             onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
//                             className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
//                         >
//                             {section}
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </motion.nav>
//     );
// };

// export default Navbar;

export {};