import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Certifications from './pages/Certifications';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Define individual routes for each section */}
                    <Route path="about" element={<About />} />
                    <Route path="education" element={<Education />} />
                    <Route path="experience" element={<Experience />} />
                    <Route path="certifications" element={<Certifications />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
