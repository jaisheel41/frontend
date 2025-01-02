import React, { useEffect, useState, useRef } from 'react';
import type { EducationData } from '../types/types';
import { fetchEducation } from '../services/portfolioService';
import { motion, useAnimation, useInView } from 'framer-motion';

const EducationCard: React.FC<{ edu: EducationData }> = ({ edu }) => {
    return (
        <div className="education-card flex gap-6 mb-10">
            {/* Placeholder for icon */}
            <div className="icon-container w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                {/* Icon will go here */}
            </div>

            <div className="details">
                <h3 className="text-white text-[24px] font-bold">{edu.degree}</h3>
                <p className="text-secondary text-[16px] font-semibold">{edu.institution}</p>
                <p className="text-gray-400 text-[14px]">
                    {edu.start_date} - {edu.end_date || 'Present'}
                </p>
                <ul className="mt-3 list-disc ml-6 space-y-2">
                    {edu.description.split('.').map((point, index) => (
                        point.trim() && (
                            <li key={`point-${index}`} className="text-white-100 text-[14px] tracking-wider">
                                {point.trim()}
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </div>
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
                setEducation(data);
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
                initial="hidden"
                animate={mainControls}
                variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
            >
                <p className="text-center text-gray-400 text-lg">What I have Studied so far</p>
                <h2 className="text-center text-white text-4xl font-bold">Education</h2>
            </motion.div>

            <div className="mt-10 border-l-2 border-gray-700 pl-6">
                {education.map((edu) => (
                    <EducationCard key={edu.id} edu={edu} />
                ))}
            </div>
        </div>
    );
};

export default Education;
