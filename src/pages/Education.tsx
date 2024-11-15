// src/pages/Education.tsx
import React, { useEffect, useState } from 'react';
import type { EducationData } from '../types/types';
import { fetchEducation } from '../services/portfolioService';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
    const [education, setEducation] = useState<EducationData[]>([]);

    useEffect(() => {
        const getEducation = async () => {
            try {
                const data = await fetchEducation();
                setEducation(data);
            } catch (error) {
                console.error('Error fetching education:', error);
            }
        };
        getEducation();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Education</h1>
            <ul className="space-y-6">
                {education.map((edu) => (
                    <motion.li
                        key={edu.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">{edu.degree} from {edu.institution}</h2>
                        <p className="text-gray-600">{edu.description}</p>
                        <small className="block mt-2 text-gray-500">
                            {edu.start_date} - {edu.end_date || 'Present'}
                        </small>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default Education;