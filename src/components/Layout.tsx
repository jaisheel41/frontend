import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import { FaBars, FaArrowUp } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

import HeroPage from "../pages/HeroSection";

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
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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

      const lastSection = document.getElementById("Contact");
      if (lastSection) {
        const rect = lastSection.getBoundingClientRect();
        setShowScrollToTop(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="z-50 w-full fixed top-0 bg-[#1e1e2e] shadow-md flex items-center justify-between px-4 md:px-12 py-3">
        {/* Name */}
        <h1
          className={`text-xl font-bold text-purple-400 md:text-left ${
            menuOpen ? "text-center w-full" : ""
          }`}
        >
          Jaisheel Polimera
        </h1>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          {sections.map(({ name }) => (
            <a
              key={name}
              href={`#${name}`}
              className={`text-sm font-medium cursor-pointer ${
                activeSection === name ? "text-purple-400" : "text-gray-400"
              } hover:text-purple-300`}
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-[#1e1e2e] shadow-lg py-4 flex flex-col items-center space-y-4 z-50">
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
      <section
        id="Hero"
        className="relative w-screen min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        <HeroPage />
        {/* Scroll Down Button */}
        <motion.div
          className="absolute bottom-10 flex items-center justify-center p-2 bg-purple-600 rounded-full shadow-lg cursor-pointer animate-bounce"
          onClick={() => scrollToSection("About")}
          whileHover={{ scale: 1.1 }}
        >
          <BsChevronDown className="text-2xl text-white" />
        </motion.div>
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

      {/* Scroll-to-Top Button */}
      {showScrollToTop && (
        <motion.div
          className="fixed bottom-10 right-10 p-2 bg-purple-600 rounded-full shadow-lg cursor-pointer"
          onClick={() => scrollToSection("Hero")}
          whileHover={{ scale: 1.1 }}
        >
          <FaArrowUp className="text-xl text-white" />
        </motion.div>
      )}
    </div>
  );
};

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
      className="w-screen min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {children}
    </motion.section>
  );
};

export default Layout;
