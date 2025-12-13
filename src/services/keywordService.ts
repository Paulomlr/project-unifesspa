import { get, post, del } from './api';
import type { Keyword, Project } from '../types';

export const keywordService = {
    /**
     * Adicionar keywords a um projeto (requer autenticação)
     * Backend espera: { keywords: string[] }
     */
    async addToProject(projectId: string, keywords: string[]): Promise<{ message: string; keywords: Keyword[] }> {
        return post(`/keywords/projects/${projectId}`, { keywords });
    },

    /**
     * Adicionar uma única keyword a um projeto
     */
    async addSingleToProject(projectId: string, keywordName: string): Promise<{ message: string; keywords: Keyword[] }> {
        return post(`/keywords/projects/${projectId}`, { keywords: [keywordName] });
    },

    /**
     * Buscar keywords de um projeto (público)
     */
    async getByProject(projectId: string): Promise<Keyword[]> {
        return get(`/keywords/projects/${projectId}`);
    },

    /**
     * Remover keyword de um projeto (requer autenticação)
     */
    async removeFromProject(keywordId: string, projectId: string): Promise<{ message: string }> {
        return del(`/keywords/${keywordId}/projects/${projectId}`);
    },

    /**
     * Buscar projetos que contêm uma keyword (público)
     */
    async getProjects(keywordId: string): Promise<Project[]> {
        return get(`/keywords/${keywordId}/projects`);
    },

    /**
     * Buscar todas as keywords (requer autenticação)
     */
    async getAll(): Promise<Keyword[]> {
        return get('/keywords');
    },
};
