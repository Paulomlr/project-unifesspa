import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import StudentProjectsPage from '../pages/StudentProjectsPage/StudentProjectsPage';
import ActiveProjectsPage from '../pages/ActiveProjectsPage/ActiveProjectsPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardProjects from '../pages/DashboardProjects/DashboardProjects';
import DashboardApprovals from '../pages/DashboardApprovals/DashboardApprovals';
import DashboardCourses from '../pages/DashboardCourses/DashboardCourses';
import DashboardUsers from '../pages/DashboardUsers/DashboardUsers';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import EditProjectPage from '../pages/EditProjectPage/EditProjectPage';
import SubmitProjectPage from '../pages/SubmitProjectPage/SubmitProjectPage';
import ProtectedRoute from './ProtectedRoute';

// Placeholder components for pages not yet implemented
// Placeholder components for pages not yet implemented
interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>{title}</h1>
        <p>Em desenvolvimento...</p>
    </div>
);

const router = createBrowserRouter([
    // Public Routes
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/cadastro',
        element: <RegisterPage />,
    },
    {
        path: '/contato',
        element: <ContactPage />,
    },
    {
        path: '/projetos',
        element: <StudentProjectsPage />, // Public view of projects
    },
    {
        path: '/projetos/:id',
        element: <PlaceholderPage title="Detalhes do Projeto" />,
    },

    // Student Routes
    {
        path: '/aluno',
        element: <ProtectedRoute allowedRoles={['aluno']} />,
        children: [
            {
                path: 'projetos',
                element: <StudentProjectsPage />,
            },
            {
                path: 'meus-projetos',
                element: <ActiveProjectsPage />,
            },
        ],
    },

    // Dashboard Routes (Admin/Professor)
    {
        path: '/dashboard',
        element: <ProtectedRoute allowedRoles={['admin', 'professor']} />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'projetos',
                element: <DashboardProjects />,
            },
            {
                path: 'projetos/novo',
                element: <SubmitProjectPage />,
            },
            {
                path: 'projetos/editar/:id',
                element: <EditProjectPage />,
            },
            {
                path: 'aprovacoes',
                element: <DashboardApprovals />,
            },
            {
                path: 'cursos',
                element: <DashboardCourses />,
            },
            {
                path: 'usuarios',
                element: <DashboardUsers />,
            },
            {
                path: 'perfil',
                element: <ProfilePage />,
            },
            {
                path: 'config',
                element: <PlaceholderPage title="Configurações" />,
            },
        ],
    },

    // Catch all
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
