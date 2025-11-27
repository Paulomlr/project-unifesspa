import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userPreferences, setUserPreferences] = useState({
        theme: 'light',
        notifications: true,
        language: 'pt-BR',
    });

    const [userProjects, setUserProjects] = useState([]);
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        // Load user preferences from localStorage
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            try {
                setUserPreferences(JSON.parse(savedPreferences));
            } catch (error) {
                console.error('Error parsing preferences:', error);
            }
        }
    }, []);

    const updatePreferences = (newPreferences) => {
        const updated = { ...userPreferences, ...newPreferences };
        setUserPreferences(updated);
        localStorage.setItem('userPreferences', JSON.stringify(updated));
    };

    const addProject = (project) => {
        setUserProjects([...userProjects, project]);
    };

    const removeProject = (projectId) => {
        setUserProjects(userProjects.filter(p => p.id !== projectId));
    };

    const updateProject = (projectId, updatedData) => {
        setUserProjects(
            userProjects.map(p => p.id === projectId ? { ...p, ...updatedData } : p)
        );
    };

    const value = {
        userPreferences,
        updatePreferences,
        userProjects,
        setUserProjects,
        addProject,
        removeProject,
        updateProject,
        userCourses,
        setUserCourses,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
