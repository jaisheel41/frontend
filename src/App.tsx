// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from './pages/Projects';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import UniqueSection from './pages/UniqueSection';
import Layout from './components/Layout';  // Use Layout here only

const App: React.FC = () => {
    return (
        <Router>
            <Layout> {/* Apply Layout once here */}
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/unique" element={<UniqueSection />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
