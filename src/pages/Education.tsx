import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import type { EducationData } from '../types/types';
import { fetchEducation } from '../services/portfolioService';

const EducationCard: React.FC<{ edu: EducationData }> = ({ edu }) => {
    return (
        <VerticalTimelineElement
            contentStyle={{ background: "#1d1836", color: "#fff", borderRadius: "10px" }}
            contentArrowStyle={{ borderRight: "7px solid #232631" }}
            date={`${new Date(edu.start_date).getFullYear()} - ${edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}`}
            iconStyle={{ background: "#4A90E2", color: "#fff" }} // Customize icon background
            icon={<div className="flex items-center justify-center w-full h-full">🎓</div>} // Placeholder icon
        >
            <h3 className="text-white text-[24px] font-bold">{edu.degree}</h3>
            <p className="text-secondary text-[18px] font-semibold">{edu.institution}</p>
            
            <ul className="mt-3 list-disc ml-6 space-y-2">
                {edu.description.split('.').map((point, index) => (
                    point.trim() && (
                        <li key={`edu-${index}`} className="text-white-100 text-[14px] tracking-wider">
                            {point.trim()}
                        </li>
                    )
                ))}
            </ul>
        </VerticalTimelineElement>
    );
};

const Education: React.FC = () => {
    const [education, setEducation] = useState<EducationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const mainControls = useAnimation();

    useEffect(() => {
        const getEducation = async () => {
            try {
                const data = await fetchEducation();
                const sortedData = data.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
                setEducation(sortedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching education:', error);
                setError('Failed to load education data');
                setLoading(false);
            }
        };
        getEducation();
    }, []);

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView, mainControls]);

    if (loading) return <div className="text-center text-gray-600">Loading education data...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div ref={sectionRef} className="p-6 max-w-6xl mx-auto">
            <motion.div 
                        className="p-6 max-w-6xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-10 text-center text-white">
                        Academic <span className="text-blue-500">Footprints</span>
                        </h1>

            </motion.div>

            <div className="mt-10">
                <VerticalTimeline>
                    {education.map((edu) => (
                        <EducationCard key={edu.id} edu={edu} />
                    ))}
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default Education;
