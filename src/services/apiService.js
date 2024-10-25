// frontend/src/services/apiService.js

import api from './api';  // Axios instance with baseURL set

// Fetch all projects
export const fetchProjects = async () => {
    try {
        const response = await api.get('/projects/');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

// Fetch all skills
export const fetchSkills = async () => {
    try {
        const response = await api.get('/skills/');
        return response.data;
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};

// Fetch all experience entries
export const fetchExperience = async () => {
    try {
        const response = await api.get('/experience/');
        return response.data;
    } catch (error) {
        console.error('Error fetching experience:', error);
        throw error;
    }
};

// Fetch all education entries
export const fetchEducation = async () => {
    try {
        const response = await api.get('/education/');
        return response.data;
    } catch (error) {
        console.error('Error fetching education:', error);
        throw error;
    }
};

// Send contact form data
export const submitContactForm = async (contactData) => {
    try {
        const response = await api.post('/contact/', contactData);
        return response.data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

// Fetch unique section data (if you have a unique section endpoint)
export const fetchUniqueSectionData = async () => {
    try {
        const response = await api.get('/unique-section/');
        return response.data;
    } catch (error) {
        console.error('Error fetching unique section data:', error);
        throw error;
    }
};
