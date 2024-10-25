// src/types/types.ts

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string;
    link?: string;
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

export interface Milestone {
    id: number;
    title: string;
    description: string;
    date: string;
}
