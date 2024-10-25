// src/pages/Projects.tsx
import React, { useEffect, useState } from 'react';
import type { Project } from '../types/types';
import { fetchProjects } from '../services/portfolioService';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        getProjects();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-6xl mx-auto"
        >
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        <p className="text-sm text-blue-600 mb-4">Technologies: {project.technologies}</p>
                        {project.link && (  
                            <a
                                href={project.link}
                                className="text-blue-500 hover:text-blue-700 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Project
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;
