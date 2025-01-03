import React, { useEffect, useState } from "react";
import type { Skill } from "../types/types";
import { fetchSkills } from "../services/portfolioService";

const ICON_BASE_URL = "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons";

const skillIconMap: { [key: string]: string } = {
    "C#": `${ICON_BASE_URL}/csharp/csharp-original.svg`,
    "MySQL": `${ICON_BASE_URL}/mysql/mysql-original.svg`,
    "Azure": `${ICON_BASE_URL}/azure/azure-original.svg`,
    "SQL Server": `${ICON_BASE_URL}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
    "Django": `${ICON_BASE_URL}/django/django-plain.svg`,
    "AWS": `${ICON_BASE_URL}/amazonwebservices/amazonwebservices-original-wordmark.svg`
};

// Function to determine the correct skill icon URL
const getSkillIcon = (skillName: string) => {
    if (skillIconMap[skillName]) {
        return skillIconMap[skillName];
    }
    return `${ICON_BASE_URL}/${skillName.toLowerCase()}/${skillName.toLowerCase()}-original.svg`;
};

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        const getSkills = async () => {
            try {
                const data = await fetchSkills();
                setSkills(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching skills:", error);
                setError("Failed to load skills");
                setLoading(false);
            }
        };
        getSkills();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="py-12 flex flex-col items-center bg-transparent">
            <h1 className="text-4xl font-bold mb-10">
                My <span className="text-blue-400">Skills</span>
            </h1>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
                {skills.map((skill) => {
                    const iconUrl = getSkillIcon(skill.name);

                    return (
                        <div
                            key={skill.id}
                            className={`flex flex-col items-center transition-all duration-300 ${
                                hoveredSkill === skill.name ? "scale-110 opacity-100" : "opacity-70 hover:opacity-100"
                            }`}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            <div
                                className={`p-4 rounded-lg transition-all duration-300 ${
                                    hoveredSkill === skill.name ? "border-2 border-blue-400 shadow-lg" : ""
                                }`}
                            >
                                <img
                                    src={iconUrl}
                                    alt={skill.name}
                                    className="w-16 h-16 object-contain"
                                    onError={(e) => (e.currentTarget.src = "/default-skill-icon.png")}
                                />
                            </div>
                            <p className="mt-2 text-lg font-semibold">{skill.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Skills;
