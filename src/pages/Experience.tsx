import React, { useEffect, useState } from 'react';
import type { ExperienceData } from '../types/types';
import { fetchExperiences } from '../services/portfolioService';
import { motion, AnimatePresence } from 'framer-motion';

const Experience: React.FC = () => {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
    const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

    useEffect(() => {
        const getExperiences = async () => {
            try {
                const data = await fetchExperiences();
                const sortedData = data.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
                setExperiences(sortedData);
                setSelectedExperience(sortedData[0]); // Default to the latest experience
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };
        getExperiences();
    }, []);

    // Helper function to calculate the duration
    const calculateDuration = (start: string, end?: string): string => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();
        const diffInMonths =
            (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
        const years = Math.floor(diffInMonths / 12);
        const months = diffInMonths % 12;
        return years > 0
            ? `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `and ${months} month${months > 1 ? 's' : ''}` : ''}`
            : `${months} month${months !== 1 ? 's' : ''}`;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-10 text-center text-white">
                My <span className="text-blue-500">Professional </span> Journey
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Sidebar (Clickable Experience List) */}
                <div className="space-y-4">
                    {experiences.map((experience) => (
                        <motion.div
                            key={experience.id}
                            className={`p-4 rounded-lg cursor-pointer ${
                                selectedExperience?.id === experience.id ? 'bg-purple-600' : 'bg-[#1e1e2e]'
                            } shadow-lg hover:shadow-xl transition-all duration-300`}
                            onClick={() => setSelectedExperience(experience)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-semibold">{experience.role}</h3>
                            <p className="text-sm text-gray-300">{experience.company}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Right Content (Details of Selected Experience) */}
                <div className="col-span-2">
                    <AnimatePresence>
                        {selectedExperience && (
                            <motion.div
                                key={selectedExperience.id}
                                className="p-6 bg-[#1e1e2e] rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-semibold text-purple-400">
                                    {selectedExperience.role}
                                </h2>
                                <p className="text-lg font-medium text-white mt-1">
                                    {selectedExperience.company}
                                </p>
                                <small className="block mt-2 text-gray-400">
                                    {selectedExperience.start_date} -{' '}
                                    {selectedExperience.end_date || 'Present'} |{' '}
                                    {calculateDuration(selectedExperience.start_date, selectedExperience.end_date)}
                                </small>
                                <ul className="list-disc list-inside mt-4 text-gray-300">
                                    {selectedExperience.description.split('.').map((item, idx) => (
                                        item.trim() && <li key={idx}>{item.trim()}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Experience;
