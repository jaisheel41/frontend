// src/services/portfolioService.ts
import api from './api';
import { Project, ExperienceData, EducationData, Skill, Certification } from '../types/types';

export const fetchProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('projects/');
    //console.log("Projects data received from API:", response.data);  // Debugging log
    return response.data;
};

export const fetchExperiences = async (): Promise<ExperienceData[]> => {
    const response = await api.get<ExperienceData[]>('experiences/');
    return response.data;
};

export const fetchEducation = async (): Promise<EducationData[]> => {
    const response = await api.get<EducationData[]>('educations/');
    //console.log("Education data received from API:", response.data);  // Debugging log
    return response.data;
};

export const fetchSkills = async (): Promise<Skill[]> => {
    try {
        const response = await api.get<Skill[]>('skills/');  // Endpoint matches Django router
        //console.log("Skills data received from API:", response.data);
        return response.data;
    } catch (error) {
        //console.error('Error fetching skills:', error);
        throw error;
    }
};

export const fetchCertifications = async (): Promise<Certification[]> => {
    const response = await api.get<Certification[]>('certifications/');
    return response.data;
};
