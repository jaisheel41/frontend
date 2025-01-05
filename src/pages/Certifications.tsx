import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Certification } from "../types/types";
import { fetchCertifications } from "../services/portfolioService";

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Index to track the current position in the slider
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CARDS_PER_VIEW_DESKTOP = 3; // Cards visible on larger screens
  const CARDS_PER_VIEW_MOBILE = 1; // Cards visible on mobile
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW_DESKTOP);

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

  // Adjust cards per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(CARDS_PER_VIEW_MOBILE);
      } else {
        setCardsPerView(CARDS_PER_VIEW_DESKTOP);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll logic: Move the row every 5 seconds
  useEffect(() => {
    if (certifications.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % Math.ceil(certifications.length / cardsPerView)
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [certifications, cardsPerView]);

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

      <div className="relative overflow-hidden w-full">
        {/* Slider container */}
        <motion.div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${100 * Math.ceil(certifications.length / cardsPerView)}%`,
          }}
        >
          {/* Cards */}
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="flex-shrink-0 px-4 min-w-0"
              style={{ width: `calc(100% / ${cardsPerView})` }}
            >
              <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg h-full flex flex-col justify-between">
                {/* Logo */}
                {certification.logo && (
                  <img
                    src={certification.logo}
                    alt={certification.title}
                    className="w-16 h-16 object-contain mb-4 mx-auto"
                  />
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold text-white text-center mb-2">
                  {certification.title}
                </h2>

                {/* Organization */}
                <p className="text-md text-gray-400 text-center mb-2">
                  {certification.organization}
                </p>

                {/* Issue Date */}
                <p className="text-sm text-gray-500 text-center mb-4">
                  Issued on: {certification.issue_date}
                </p>

                {/* Description */}
                {certification.description && (
                  <p className="text-sm text-gray-400 text-center line-clamp-2">
                    {certification.description}
                  </p>
                )}

                {/* Credential Link */}
                <div className="mt-4 text-center">
                  {certification.credential_url ? (
                    <a
                      href={certification.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 transition-colors"
                    >
                      View Credential
                    </a>
                  ) : (
                    <span className="text-gray-500 cursor-not-allowed">
                      Credential Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({
          length: Math.ceil(certifications.length / cardsPerView),
        }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)} // Allow clicking dots for navigation
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-500"
            } transition-colors duration-300`}
          ></div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
