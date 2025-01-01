import React, { useEffect, useState } from 'react';
import type { Project } from '../types/types';
import { fetchProjects } from '../services/portfolioService';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        //console.log("Fetching projects data...");

        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load projects');
                setLoading(false);
            }
        };
        
        loadProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {project.image && (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                        )}
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
