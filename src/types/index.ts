export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    status: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'FINISHED';
    category?: string;
    course?: string;
    coordinator: string;
    participants: number;
    startDate: string;
    endDate?: string;
    duration?: number; // in months
    results?: string;
    fileUrl?: string;
    keywords?: string[];
    isPublic?: boolean;
    fullDescription?: string;
    impactMetrics?: {
        membersServed?: number;
        workshopsHeld?: number;
        volunteerHours?: number;
    };
    subtitle?: string;
    overview?: string;
    subscriptionFormUrl?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'teacher' | 'admin';
    department?: string;
    course?: string;
    photo: string;
    projects: number[];
}

export interface Course {
    id: number;
    name: string;
}

export interface Statistics {
    total: number;
    active: number;
    finished: number;
    inactive: number;
}

export interface PendingApproval {
    id: number;
    projectTitle: string;
    submittedBy: string;
    submissionDate: string;
    status: 'pendente' | 'aprovado' | 'rejeitado';
    category: string;
}

export interface ProjectSubscription {
    id: number;
    projectId: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    submittedAt: string;
    status: 'pending' | 'approved' | 'rejected';
}
