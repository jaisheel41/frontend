// src/pages/UniqueSection.tsx
import React, { useEffect, useState } from 'react';
import type { Milestone } from '../types/types';
import { fetchMilestones } from '../services/portfolioService';
import { motion } from 'framer-motion';

const UniqueSection: React.FC = () => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);

    useEffect(() => {
        const getMilestones = async () => {
            try {
                const data = await fetchMilestones();
                setMilestones(data);
            } catch (error) {
                console.error('Error fetching milestones:', error);
            }
        };
        getMilestones();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-6xl mx-auto"
        >
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Career Journey</h1>
            <div className="space-y-6">
                {milestones.map((milestone) => (
                    <motion.div
                        key={milestone.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h2 className="text-2xl font-semibold mb-2">{milestone.title}</h2>
                        <p className="text-gray-600 mb-4">{milestone.description}</p>
                        <small className="text-gray-500">Date: {milestone.date}</small>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default UniqueSection;
