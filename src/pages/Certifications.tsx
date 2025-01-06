import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Certification } from "../types/types";
import { fetchCertifications } from "../services/portfolioService";

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CARDS_PER_VIEW_DESKTOP = 3;
  const CARDS_PER_VIEW_TABLET = 2;
  const CARDS_PER_VIEW_MOBILE = 1;
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(CARDS_PER_VIEW_MOBILE);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(CARDS_PER_VIEW_TABLET);
      } else {
        setCardsPerView(CARDS_PER_VIEW_DESKTOP);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-10 text-center text-white w-full">
  Certifications & <span className="text-blue-500">Achievements</span>
</h1>

      <div className="relative overflow-hidden w-full">
      <motion.div
  className="flex transition-transform duration-1000 ease-in-out"
  style={{
    transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`, // Adjust based on cardsPerView
    width: `${100 * Math.ceil(certifications.length / cardsPerView)}%`,
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>

          {certifications.map((certification) => (
            <motion.div
              key={certification.id}
              className="flex-shrink-0 p-4 min-w-0"
              style={{ width: `calc(100% / ${cardsPerView})` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg h-full flex flex-col items-center justify-between transition-transform transform hover:scale-105">
                {certification.logo && (
                  <img
                    src={certification.logo}
                    alt={certification.title}
                    className="w-16 h-16 object-contain mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-white text-center mb-2">
                  {certification.title}
                </h2>
                <p className="text-md text-gray-400 text-center mb-2">
                  {certification.organization}
                </p>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Issued on: {certification.issue_date}
                </p>
                {certification.description && (
                  <p className="text-sm text-gray-400 text-center">
                    {certification.description}
                  </p>
                )}
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
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({
          length: Math.ceil(certifications.length / cardsPerView),
        }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
