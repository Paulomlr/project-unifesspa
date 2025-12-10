export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    status: 'ativo' | 'em_andamento' | 'planejamento' | 'concluido';
    category: string;
    coordinator: string;
    participants: number;
    startDate: string;
    endDate: string;
    keywords?: string[];
    isPublic?: boolean;
    fullDescription?: string;
    impactMetrics?: {
        membersServed?: number;
        workshopsHeld?: number;
        volunteerHours?: number;
    };
    subscriptionFormUrl?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'professor' | 'admin';
    department?: string;
    course?: string;
    photo: string;
    projects: number[];
}

export interface Course {
    id: number;
    name: string;
    code: string;
    department: string;
    participants: number;
}

export interface Statistics {
    totalProjects: number;
    activeProjects: number;
    totalUsers: number;
    pendingApprovals: number;
    totalCourses: number;
    projectsThisMonth: number;
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
