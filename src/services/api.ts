import type { ErrorResponse } from '../types/errorResponse';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const createAuthHeaders = (additionalHeaders: Record<string, string> = {}, includeContentType: boolean = true): Record<string, string> => {
    const token = getToken();
    const headers: Record<string, string> = {
        ...additionalHeaders,
    };

    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const authenticatedFetch = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    // Se o body for FormData, não incluir Content-Type
    const isFormData = options.body instanceof FormData;
    
    const defaultOptions: RequestInit = {
        headers: createAuthHeaders(options.headers as Record<string, string> || {}, !isFormData),
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

    if (response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return response;
};

const handleErrorResponse = async (response: Response, endpoint: string): Promise<never> => {
    let errorMessage = 'Erro na requisição';
    
    try {
        const error: ErrorResponse = await response.json();
        errorMessage = error.message || error.error || errorMessage;
    } catch {
        // Se não conseguir parsear o JSON, usa a mensagem padrão
    }
    
    if (response.status === 500) {
        console.error(`Erro 500 no servidor para ${endpoint}:`, errorMessage);
        throw new Error(`Erro interno do servidor. Verifique se o backend está funcionando corretamente.`);
    }
    
    if (response.status === 404) {
        throw new Error(`Recurso não encontrado: ${endpoint}`);
    }
    
    throw new Error(errorMessage);
};

export const get = async <T = any>(endpoint: string): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'GET',
    });

    if (!response.ok) {
        await handleErrorResponse(response, endpoint);
    }

    return response.json();
};

export const post = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        await handleErrorResponse(response, endpoint);
    }

    return response.json();
};

export const put = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        await handleErrorResponse(response, endpoint);
    }

    return response.json();
};

export const del = async <T = any>(endpoint: string): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'DELETE',
    });

    if (!response.ok) {
        await handleErrorResponse(response, endpoint);
    }

    return response.json();
};

export const patch = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        await handleErrorResponse(response, endpoint);
    }

    return response.json();
};
