// src/types/types.ts

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string;
    Live_link?: string;
    Github_link?: string;
    image?: string;
}

export interface ExperienceData {
    id: number;
    role: string;
    company: string;
    start_date: string;
    end_date?: string;
    description: string;
}

export interface EducationData {
    id: number;
    institution: string;
    degree: string;
    start_date: string;
    end_date?: string;
    description: string;
}

export interface Skill {
    id: number;
    name: string;
    level: string;
}

export interface Certification {
    id: number;
    title: string;
    organization: string;
    issue_date: string;
    description?: string;
    credential_url?: string;
    logo?: string;
}