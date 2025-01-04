import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import type { Certification } from "../types/types";
import { fetchCertifications } from "../services/portfolioService";

const Certifications: React.FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch certifications from the backend
    useEffect(() => {
        const loadCertifications = async () => {
            try {
                const data = await fetchCertifications();
                setCertifications(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load certifications");
                setLoading(false);
            }
        };

        loadCertifications();
    }, []);

    // Carousel logic: Auto-rotate certifications every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [certifications]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <motion.div
            className="p-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl font-bold mb-10 text-center text-white">
                Certifications & <span className="text-blue-500">Achievements</span>
            </h1>

            <div className="relative w-full h-96 overflow-hidden">
                <AnimatePresence>
                    {certifications.length > 0 && (
                        <motion.div
                            key={certifications[currentIndex].id}
                            className="absolute w-full h-full flex flex-col items-center justify-center bg-[#1E1E1E] p-6 rounded-xl shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            {/* Certification Logo */}
                            {certifications[currentIndex].logo && (
                                <img
                                    src={certifications[currentIndex].logo}
                                    alt={certifications[currentIndex].title}
                                    className="w-20 h-20 object-contain mb-4"
                                />
                            )}

                            {/* Certification Title */}
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {certifications[currentIndex].title}
                            </h2>

                            {/* Organization */}
                            <p className="text-md text-gray-400 mb-2">
                                {certifications[currentIndex].organization}
                            </p>

                            {/* Issue Date */}
                            <p className="text-sm text-gray-500 mb-4">
                                Issued on: {certifications[currentIndex].issue_date}
                            </p>

                            {/* Description */}
                            {certifications[currentIndex].description && (
                                <p className="text-sm text-gray-400 text-center line-clamp-3">
                                    {certifications[currentIndex].description}
                                </p>
                            )}

                            {/* Credential Link */}
                            <div className="mt-4">
                                {certifications[currentIndex].credential_url ? (
                                    <a
                                        href={certifications[currentIndex].credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-500 flex items-center gap-2 transition-colors"
                                    >
                                        <IconExternalLink stroke={1.75} />
                                        View Credential
                                    </a>
                                ) : (
                                    <span className="text-gray-500 cursor-not-allowed">
                                        Credential Unavailable
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {certifications.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentIndex ? "bg-blue-500" : "bg-gray-500"
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Certifications;
