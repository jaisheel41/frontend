// src/pages/Skills.tsx
import React, { useEffect, useState } from 'react';
import type { Skill } from '../types/types';
import { fetchSkills } from '../services/portfolioService';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSkills = async () => {
            try {
                const data = await fetchSkills();
                setSkills(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching skills:', error);
                setError('Failed to load skills');
                setLoading(false);
            }
        };
        getSkills();
    }, []);

    if (loading) return <div className="text-center text-gray-700">Loading skills...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-6xl mx-auto"
        >
            {/* <h1 className="text-4xl font-bold mb-10 text-center text-white">Skills</h1> */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                    <motion.li
                        key={skill.id}
                        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h2 className="text-xl font-semibold mb-2">{skill.name}</h2> {/* Ensure font style is applied here */}
                        <p className="text-gray-300">Level: {skill.level}</p>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Skills;
