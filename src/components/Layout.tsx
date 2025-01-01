// // src/components/Layout.tsx
// import React, { ReactNode, useState, useEffect } from 'react';
// import { motion, useInView } from 'framer-motion';

// const files = ['About Me', 'Education', 'Work Experience', 'Certifications', 'Skills', 'Projects', 'Contact'];

// // Define the props type with children
// interface LayoutProps {
//     children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//     const [activeSection, setActiveSection] = useState(files[0]);

//     // Set active section based on scroll position
//     const handleScroll = () => {
//         const sections = files.map((file) => document.getElementById(file));
//         sections.forEach((section, index) => {
//             if (section) {
//                 const rect = section.getBoundingClientRect();
//                 if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
//                     setActiveSection(files[index]);
//                 }
//             }
//         });
//     };

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
//             {/* Navbar at the top */}
//             <div className="z-10 w-full fixed top-0 bg-[#1e1e2e] p-4 shadow-md">
//                 <div className="flex justify-center space-x-8">
//                     {files.map((file) => (
//                         <a
//                             key={file}
//                             href={`#${file}`}
//                             className={`text-sm font-medium cursor-pointer transition-colors ${
//                                 activeSection === file ? 'text-purple-400' : 'text-gray-400'
//                             } hover:text-purple-300`}
//                         >
//                             {file}
//                         </a>
//                     ))}
//                 </div>
//             </div>

//             {/* Main Content Area with padding to account for the fixed navbar */}
//             <div className="flex-1 pt-20 space-y-16">
//                 {/* Full-Screen First Section */}
//                 <Section id="About Me" title="" firstSection>
//                     <div className="flex flex-col items-center justify-center w-full h-full text-center">
//                         {/* Introductory Text */}
//                         <motion.div
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 1 }}
//                             className="text-white text-4xl md:text-6xl font-semibold mb-4"
//                         >
//                             Hi, I'm Jaisheel Polimera!
//                         </motion.div>
//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 1, delay: 0.5 }}
//                             className="text-gray-300 text-lg md:text-xl max-w-2xl"
//                         >
//                             I'm a passionate front-end developer, creating interactive and visually engaging web experiences.
//                         </motion.p>

//                         {/* Scroll Down Indicator */}
//                         <div className="absolute bottom-10 animate-bounce">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 className="w-6 h-6 text-gray-400"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                             <p className="text-gray-400 text-sm mt-2">Scroll Down</p>
//                         </div>
//                     </div>
//                 </Section>

//                 {files.slice(1).map((file) => (
//                     <Section key={file} id={file} title={file}>
//                         <div className="text-center">{`${file} Content`}</div>
//                     </Section>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // Section Component for each section with smooth fade-in effect
// const Section: React.FC<{ id: string; title: string; children: ReactNode; firstSection?: boolean }> = ({
//     id,
//     title,
//     children,
//     firstSection,
// }) => {
//     const ref = React.useRef(null);
//     const isInView = useInView(ref, { once: true });

//     return (
//         <motion.div
//             ref={ref}
//             id={id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//             className={`w-full min-h-screen flex flex-col items-center justify-center px-4 ${
//                 firstSection ? 'h-screen' : 'py-16'
//             }`}
//         >
//             <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
//             {children}
//         </motion.div>
//     );
// };

// export default Layout;

// src/components/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Skills from '../pages/Skills'; // Import the Skills component

const files = ['About Me', 'Education', 'Work Experience', 'Certifications', 'Skills', 'Projects', 'Contact'];

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [activeSection, setActiveSection] = useState(files[0]);

    const handleScroll = () => {
        const sections = files.map((file) => document.getElementById(file));
        sections.forEach((section, index) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    setActiveSection(files[index]);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
            {/* Navbar at the top */}
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

            {/* Main Content Area with padding to account for the fixed navbar */}
            <div className="flex-1 pt-20 space-y-16">
                {/* Full-Screen First Section */}
                <Section id="About Me" title="" firstSection>
                    <div className="flex flex-col items-center justify-center w-full h-full text-center">
                        {/* Introductory Text */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-white text-4xl md:text-6xl font-semibold mb-4"
                        >
                            Hi, I'm Jaisheel Polimera!
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-gray-300 text-lg md:text-xl max-w-2xl"
                        >
                            I'm a passionate front-end developer, creating interactive and visually engaging web experiences.
                        </motion.p>

                        {/* Scroll Down Indicator */}
                        <div className="absolute bottom-10 animate-bounce">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-400"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <p className="text-gray-400 text-sm mt-2">Scroll Down</p>
                        </div>
                    </div>
                </Section>

                {/* Other Sections with Conditional Rendering */}
                {files.slice(1).map((file) => (
                    <Section key={file} id={file} title={file}>
                        {file === 'Skills' ? (
                            <Skills />  // Render the actual Skills component
                        ) : (
                            <div className="text-center">{`${file} Content`}</div> // Placeholder for other sections
                        )}
                    </Section>
                ))}
            </div>
        </div>
    );
};

// Section Component for each section with smooth fade-in effect
const Section: React.FC<{ id: string; title: string; children: ReactNode; firstSection?: boolean }> = ({
    id,
    title,
    children,
    firstSection,
}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            id={id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`w-full min-h-screen flex flex-col items-center justify-center px-4 ${
                firstSection ? 'h-screen' : 'py-16'
            }`}
        >
            <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
            {children}
        </motion.div>
    );
};

export default Layout;
