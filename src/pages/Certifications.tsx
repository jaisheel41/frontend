import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Certification } from "../types/types";
import { fetchCertifications } from "../services/portfolioService";
import { IconExternalLink } from "@tabler/icons-react";

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div className="text-center text-gray-400">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-10 text-white">
        Certifications & <span className="text-blue-500">Achievements</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((certification) => (
          <motion.div
            key={certification.id}
            className="bg-[#1E1E1E] p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {certification.logo && (
              <img
                src={certification.logo}
                alt={certification.title}
                className="w-16 h-16 object-contain mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-white mb-2">
              {certification.title}
            </h2>
            <p className="text-md text-gray-400 mb-2">{certification.organization}</p>
            <p className="text-sm text-gray-500 mb-4">
              Issued on: {certification.issue_date}
            </p>
            {certification.description && (
              <p className="text-sm text-gray-400 mb-4">
                {certification.description}
              </p>
            )}
            {certification.credential_url ? (
              <a
                href={certification.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition-colors"
              >
                <IconExternalLink stroke={1.75} />
                                    View Credential
                                </a>
            ) : (
                <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                    <IconExternalLink stroke={1.75} className="opacity-50" />
                    Credential Unavailable
                </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
