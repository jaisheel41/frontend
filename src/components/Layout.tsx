import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import { FaBars } from "react-icons/fa";

// Importing HeroPage
import HeroPage from "../pages/HeroSection";

// Lazy loading other sections
const About = lazy(() => import("../pages/About"));
const Education = lazy(() => import("../pages/Education"));
const Experience = lazy(() => import("../pages/Experience"));
const Skills = lazy(() => import("../pages/Skills"));
const Certifications = lazy(() => import("../pages/Certifications"));
const Projects = lazy(() => import("../pages/Projects"));
const Contact = lazy(() => import("../pages/Contact"));

const sections = [
  { name: "About", component: <About /> },
  { name: "Education", component: <Education /> },
  { name: "Experience", component: <Experience /> },
  { name: "Skills", component: <Skills /> },
  { name: "Certifications", component: <Certifications /> },
  { name: "Projects", component: <Projects /> },
  { name: "Contact", component: <Contact /> },
];

const Layout: React.FC = () => {
  const [activeSection, setActiveSection] = useState(sections[0].name);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section.name);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Navbar */}
      <header className="z-10 w-full fixed top-0 bg-[#1e1e2e] p-4 shadow-md flex justify-between items-center px-6">
        <h1 className="text-xl font-bold text-purple-400 tracking-wide">Jaisheel Polimera</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {sections.map(({ name }) => (
            <a
              key={name}
              href={`#${name}`}
              className={`text-sm font-medium cursor-pointer transition-colors ${
                activeSection === name ? "text-purple-400" : "text-gray-400"
              } hover:text-purple-300`}
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-xl" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-[#1e1e2e] py-4 flex flex-col items-center space-y-4 shadow-lg">
          {sections.map(({ name }) => (
            <a
              key={name}
              href={`#${name}`}
              className="text-white text-lg hover:text-purple-300"
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="Hero" className="w-full min-h-screen flex flex-col items-center justify-center px-4">
        <HeroPage />
      </section>

      {/* Other Sections */}
      <main className="flex-1 pt-20 space-y-16">
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          {sections.map(({ name, component }) => (
            <Section key={name} id={name}>
              {component}
            </Section>
          ))}
        </Suspense>
      </main>
    </div>
  );
};

// Section Component with fade-in animation
const Section: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col items-center justify-center px-4"
    >
      {children}
    </motion.section>
  );
};

export default Layout;
