import { Project, User, Course, Statistics, PendingApproval } from '../types';

// Mock data for projects
export const mockProjects: Project[] = [
    {
        id: 1,
        title: 'Capacite os Jovens por Mentoria',
        description: 'Programa de mentoria para capacitação de jovens em tecnologia e empreendedorismo',
        image: '/src/assets/images/capacite_os_jovens_por_mentoria.png',
        status: 'ACTIVE',
        category: 'Educação',
        coordinator: 'Prof. João Silva',
        participants: 25,
        startDate: '2024-01-15',
        endDate: '2024-12-15',
        keywords: ['educação', 'mentoria', 'tecnologia', 'empreendedorismo'],
        isPublic: true,
    },
    {
        id: 2,
        title: 'Iniciativa Espaços Verdes',
        description: 'Projeto de revitalização e criação de espaços verdes no campus universitário',
        image: '/src/assets/images/iniciativa_espacos_verdes.png',
        status: 'ACTIVE',
        category: 'Meio Ambiente',
        coordinator: 'Profa. Maria Santos',
        participants: 18,
        startDate: '2024-02-01',
        endDate: '2024-11-30',
        keywords: ['meio ambiente', 'sustentabilidade', 'extensão'],
        isPublic: true,
    },
    {
        id: 3,
        title: 'Iniciativa Saúde Comunitária',
        description: 'Programa de atenção à saúde e bem-estar da comunidade universitária',
        image: '/src/assets/images/iniciativa_saude_comunitaria.png',
        status: 'ACTIVE',
        category: 'Saúde',
        coordinator: 'Prof. Carlos Oliveira',
        participants: 30,
        startDate: '2024-03-01',
        endDate: '2024-12-31',
        keywords: ['saúde', 'comunidade', 'extensão', 'bem-estar'],
        isPublic: true,
    },
    {
        id: 4,
        title: 'Montagem e Manutenção',
        description: 'Projeto de manutenção e montagem de equipamentos de informática',
        image: '/src/assets/images/montagem_manutencao.png',
        status: 'ACTIVE',
        category: 'Tecnologia',
        coordinator: 'Prof. Pedro Costa',
        participants: 12,
        startDate: '2024-04-01',
        endDate: '2024-10-31',
        keywords: ['tecnologia', 'informática', 'manutenção'],
        isPublic: true,
    },
    {
        id: 5,
        title: 'Revitalize Nossa Cidade',
        description: 'Iniciativa de revitalização urbana e melhoria da qualidade de vida',
        image: '/src/assets/images/revitalize_nossa_cidade.png',
        status: 'SUBMITTED',
        category: 'Urbanismo',
        coordinator: 'Profa. Ana Rodrigues',
        participants: 8,
        startDate: '2024-05-01',
        endDate: '2025-05-01',
        keywords: ['urbanismo', 'revitalização', 'comunidade'],
        isPublic: true,
    },
];

// Mock data for users
export const mockUsers: User[] = [
    {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@unifesspa.edu.br',
        role: 'professor',
        department: 'Ciência da Computação',
        photo: '/src/assets/images/profile_photo.png',
        projects: [1, 4],
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@unifesspa.edu.br',
        role: 'professor',
        department: 'Engenharia Ambiental',
        photo: '/src/assets/images/profile_photo.png',
        projects: [2],
    },
    {
        id: 3,
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@unifesspa.edu.br',
        role: 'professor',
        department: 'Enfermagem',
        photo: '/src/assets/images/profile_photo.png',
        projects: [3],
    },
    {
        id: 4,
        name: 'Ana Rodrigues',
        email: 'ana.rodrigues@unifesspa.edu.br',
        role: 'professor',
        department: 'Arquitetura e Urbanismo',
        photo: '/src/assets/images/profile_photo.png',
        projects: [5],
    },

];

// Mock data for courses
export const mockCourses: Course[] = [
    {
        id: 1,
        name: 'Ciência da Computação',
        code: 'CC',
        department: 'Instituto de Ciências Exatas',
        participants: 150,
    },
    {
        id: 2,
        name: 'Engenharia Ambiental',
        code: 'EA',
        department: 'Instituto de Engenharia',
        participants: 120,
    },
    {
        id: 3,
        name: 'Enfermagem',
        code: 'ENF',
        department: 'Instituto de Ciências da Saúde',
        participants: 200,
    },
    {
        id: 4,
        name: 'Arquitetura e Urbanismo',
        code: 'AU',
        department: 'Instituto de Artes',
        participants: 80,
    },
];

// Mock data for dashboard statistics
export const mockStatistics: Statistics = {
    total: 45,
    active: 32,
    finished: 10,
    inactive: 3,
};

// Mock data for pending approvals
export const mockPendingApprovals: PendingApproval[] = [
    {
        id: 1,
        projectTitle: 'Novo Projeto de Extensão Digital',
        submittedBy: 'Prof. Fernando Lima',
        submissionDate: '2024-11-20',
        status: 'pendente',
        category: 'Tecnologia',
    },
    {
        id: 2,
        projectTitle: 'Programa de Alfabetização Infantil',
        submittedBy: 'Profa. Juliana Mendes',
        submissionDate: '2024-03-10',
        status: 'pendente',
        category: 'Urbanismo',
    },
    {
        id: 3,
        projectTitle: 'Horta Comunitária Sustentável',
        submittedBy: 'Prof. Roberto Nunes',
        submissionDate: '2024-11-15',
        status: 'pendente',
        category: 'Meio Ambiente',
    },
];

// Helper functions
export const getProjectById = (id: number | string) => {
    return mockProjects.find(project => project.id === parseInt(id.toString()));
};

export const getUserById = (id: number | string) => {
    return mockUsers.find(user => user.id === parseInt(id.toString()));
};

export const getCourseById = (id: number | string) => {
    return mockCourses.find(course => course.id === parseInt(id.toString()));
};

// Keywords for project filtering
export const projectKeywords = [
    'educação',
    'mentoria',
    'tecnologia',
    'empreendedorismo',
    'meio ambiente',
    'sustentabilidade',
    'extensão',
    'saúde',
    'comunidade',
    'bem-estar',
    'informática',
    'manutenção',
    'urbanismo',
    'revitalização',
];

export const getProjectsByStatus = (status: Project['status']) => {
    return mockProjects.filter(project => project.status === status);
};

export const getUsersByRole = (role: User['role']) => {
    return mockUsers.filter(user => user.role === role);
};
