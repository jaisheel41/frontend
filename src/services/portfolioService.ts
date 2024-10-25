// src/services/portfolioService.ts
import api from './api';
import { Project, ExperienceData, EducationData, Skill, Milestone } from '../types/types';

export const fetchProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('projects/');
    return response.data;
};

export const fetchExperiences = async (): Promise<ExperienceData[]> => {
    const response = await api.get<ExperienceData[]>('experiences/');
    return response.data;
};

export const fetchEducation = async (): Promise<EducationData[]> => {
    const response = await api.get<EducationData[]>('educations/');
    return response.data;
};

export const fetchSkills = async (): Promise<Skill[]> => {
    const response = await api.get<Skill[]>('skills/');
    return response.data;
};

export const fetchMilestones = async (): Promise<Milestone[]> => {
    const response = await api.get<Milestone[]>('milestones/');
    return response.data;
};
