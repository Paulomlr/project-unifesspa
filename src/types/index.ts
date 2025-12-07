/**
 * Shared TypeScript types and interfaces for the application
 */

// User related types
export type UserRole = 'aluno' | 'professor' | 'coordenador' | 'admin';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    department?: string;
    course?: string;
    photo?: string;
    projects?: number[];
}

// Project related types
export type ProjectStatus = 'ativo' | 'em_andamento' | 'planejamento' | 'concluido';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    category: string;
    coordinator: string;
    participants: number;
    startDate: string;
    endDate: string;
}

// Course related types
export interface Course {
    id: number;
    name: string;
    code: string;
    department: string;
    students: number;
}

// Statistics types
export interface Statistics {
    totalProjects: number;
    activeProjects: number;
    totalUsers: number;
    pendingApprovals: number;
    totalCourses: number;
    projectsThisMonth: number;
}

// Approval types
export type ApprovalStatus = 'pendente' | 'aprovado' | 'rejeitado';

export interface PendingApproval {
    id: number;
    projectTitle: string;
    submittedBy: string;
    submissionDate: string;
    status: ApprovalStatus;
    category: string;
}

// Auth related types
export interface AuthResponse {
    user: User;
    token: string;
}

export interface VerifyTokenResponse {
    user: User;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    department?: string;
    course?: string;
}

// API related types
export interface ErrorResponse {
    error: string | undefined;
    message?: string;
}
