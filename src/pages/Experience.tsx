// src/pages/Experience.tsx
import React, { useEffect, useState } from 'react';
import type { ExperienceData } from '../types/types';
import { fetchExperiences } from '../services/portfolioService';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);

    useEffect(() => {
        const getExperiences = async () => {
            try {
                const data = await fetchExperiences();
                setExperiences(data);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };
        getExperiences();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Experience</h1>
            <ul className="space-y-6">
                {experiences.map((experience) => (
                    <motion.li
                        key={experience.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">{experience.role} at {experience.company}</h2>
                        <p className="text-gray-600">{experience.description}</p>
                        <small className="block mt-2 text-gray-500">
                            {experience.start_date} - {experience.end_date || 'Present'}
                        </small>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default Experience;