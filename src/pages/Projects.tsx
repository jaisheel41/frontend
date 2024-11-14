// src/pages/Projects.tsx
import React, { useEffect, useState } from 'react';
import type { Project } from '../types/types';
import { fetchProjects } from '../services/portfolioService';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
        <div>
            <h1>Projects</h1>
            {projects.length > 0 ? (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <p>{project.technologies}</p>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    View Project
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default Projects;
