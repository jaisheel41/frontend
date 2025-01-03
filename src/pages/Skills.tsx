import React, { useEffect, useState } from "react";
import type { Skill } from "../types/types";
import { fetchSkills } from "../services/portfolioService";

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    // Base GitHub repository where icons are stored
    const ICON_BASE_URL = "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons";

    // Custom mapping for skills that don't follow the standard naming
    const skillIconMap: { [key: string]: string } = {
        "C#": `${ICON_BASE_URL}/csharp/csharp-original.svg`,
        "MySQL": `${ICON_BASE_URL}/mysql/mysql-original.svg`,
        "Azure": `${ICON_BASE_URL}/azure/azure-original.svg`,
        "SQL Server": `${ICON_BASE_URL}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
        "Django": `${ICON_BASE_URL}/django/django-plain.svg`,
        "AWS": `${ICON_BASE_URL}/amazonwebservices/amazonwebservices-original-wordmark.svg` // Updated AWS link
    };

    // Function to determine the correct skill icon URL
    const getSkillIcon = (skillName: string) => {
        if (skillIconMap[skillName]) {
            return skillIconMap[skillName];
        }
        return `${ICON_BASE_URL}/${skillName.toLowerCase()}/${skillName.toLowerCase()}-original.svg`;
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Skills</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skills.map((skill) => {
                    const iconUrl = getSkillIcon(skill.name);
                    return (
                        <div key={skill.id} className="flex flex-col items-center space-y-2">
                            <img
                                src={iconUrl}
                                alt={skill.name}
                                className="w-16 h-16 object-contain"
                                onError={(e) => (e.currentTarget.src = "/default-skill-icon.png")}
                            />
                            <p className="text-sm font-semibold">{skill.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Skills;
