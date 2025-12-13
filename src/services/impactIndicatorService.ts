import { get, post, put, del } from './api';
import type { ImpactIndicator } from '../types';

export interface CreateImpactIndicatorInput {
    title: string;
    value: number;
}

export interface UpdateImpactIndicatorInput {
    title?: string;
    value?: number;
}

export const impactIndicatorService = {
    /**
     * Criar indicadores de impacto em um projeto (requer autenticação)
     * Backend espera: { indicators: [{ title, value }] }
     */
    async create(projectId: string, indicators: CreateImpactIndicatorInput[]): Promise<{ message: string; indicators: ImpactIndicator[] }> {
        return post(`/projects/${projectId}/impact-indicators`, { indicators });
    },

    /**
     * Criar um único indicador de impacto
     */
    async createSingle(projectId: string, indicator: CreateImpactIndicatorInput): Promise<{ message: string; indicators: ImpactIndicator[] }> {
        return post(`/projects/${projectId}/impact-indicators`, { indicators: [indicator] });
    },

    /**
     * Atualizar indicador de impacto (requer autenticação)
     */
    async update(projectId: string, indicatorId: string, data: UpdateImpactIndicatorInput): Promise<{ message: string; indicator: ImpactIndicator }> {
        return put(`/projects/${projectId}/impact-indicators/${indicatorId}`, data);
    },

    /**
     * Deletar indicador de impacto (requer autenticação)
     */
    async delete(projectId: string, indicatorId: string): Promise<{ message: string }> {
        return del(`/projects/${projectId}/impact-indicators/${indicatorId}`);
    },

    /**
     * Buscar indicadores de impacto de um projeto (público)
     */
    async getByProject(projectId: string): Promise<ImpactIndicator[]> {
        return get(`/projects/${projectId}/impact-indicators`);
    },
};
