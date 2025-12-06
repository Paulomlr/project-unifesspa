import type { ErrorResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Get authentication token from localStorage
 */
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

/**
 * Create fetch headers with authentication token
 */
export const createAuthHeaders = (additionalHeaders: Record<string, string> = {}): Record<string, string> => {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...additionalHeaders,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

/**
 * Wrapper for fetch with automatic authentication
 */
export const authenticatedFetch = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
        headers: createAuthHeaders(options.headers as Record<string, string> || {}),
    };

    const fetchOptions: RequestInit = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    const response = await fetch(url, fetchOptions);

    // If unauthorized, redirect to login
    if (response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return response;
};

/**
 * Helper for GET requests
 */
export const get = async <T = any>(endpoint: string): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'GET',
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
};

/**
 * Helper for POST requests
 */
export const post = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
};

/**
 * Helper for PUT requests
 */
export const put = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
};

/**
 * Helper for DELETE requests
 */
export const del = async <T = any>(endpoint: string): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
};

/**
 * Helper for PATCH requests
 */
export const patch = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
};
