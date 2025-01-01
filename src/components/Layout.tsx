// import React, { useState, useEffect } from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { motion, useInView } from 'framer-motion';

// const files = ['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'];

// const Layout: React.FC = () => {
//     const [activeSection, setActiveSection] = useState(files[0]);
//     const location = useLocation(); // Use location to track active route

//     // Update active section based on the current route
//     useEffect(() => {
//         const section = files.find((file) => location.pathname.includes(file.toLowerCase())) || files[0];
//         setActiveSection(section);
//     }, [location]);

//     return (
//         <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
//             {/* Navbar */}
//             <div className="z-10 w-full fixed top-0 bg-[#1e1e2e] p-4 shadow-md">
//                 <div className="flex justify-center space-x-8">
//                     {files.map((file) => (
//                         <Link
//                             key={file}
//                             to={`/${file.toLowerCase().replace(' ', '-')}`}
//                             className={`text-sm font-medium cursor-pointer transition-colors ${
//                                 activeSection === file ? 'text-purple-400' : 'text-gray-400'
//                             } hover:text-purple-300`}
//                         >
//                             {file}
//                         </Link>
//                     ))}
//                 </div>
//             </div>

//             {/* Content Area */}
//             <div className="flex-1 pt-20 space-y-16">
//                 <Outlet /> {/* This renders the corresponding page for the active route */}
//             </div>
//         </div>
//     );
// };

// export default Layout;

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import About from '../pages/About';
import Education from '../pages/Education';
import Experience from '../pages/Experience';
import Skills from '../pages/Skills';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

const files = ['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'];

const Layout: React.FC = () => {
    const [activeSection, setActiveSection] = useState(files[0]);

    // Update active section based on scroll position
    const handleScroll = () => {
        files.forEach((file) => {
            const section = document.getElementById(file);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    setActiveSection(file);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
            {/* Navbar */}
            <div className="z-10 w-full fixed top-0 bg-[#1e1e2e] p-4 shadow-md">
                <div className="flex justify-center space-x-8">
                    {files.map((file) => (
                        <a
                            key={file}
                            href={`#${file}`}
                            className={`text-sm font-medium cursor-pointer transition-colors ${
                                activeSection === file ? 'text-purple-400' : 'text-gray-400'
                            } hover:text-purple-300`}
                        >
                            {file}
                        </a>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 pt-20 space-y-16">
                <Section id="About">
                    <About />
                </Section>
                <Section id="Education">
                    <Education />
                </Section>
                <Section id="Experience">
                    <Experience />
                </Section>
                <Section id="Skills">
                    <Skills />
                </Section>
                <Section id="Projects">
                    <Projects />
                </Section>
                <Section id="Contact">
                    <Contact />
                </Section>
            </div>
        </div>
    );
};

// Section Component with fade-in animation
const Section: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            id={id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen flex flex-col items-center justify-center px-4"
        >
            {children}
        </motion.div>
    );
};

export default Layout;
