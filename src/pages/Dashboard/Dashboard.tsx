import { useState, useEffect } from 'react';
import { Bell, FolderOpen, Home, Users, CheckSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Project } from '../../types';
import { mockStatistics, mockProjects } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats] = useState(mockStatistics);
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);

    useEffect(() => {
        setRecentProjects(mockProjects.slice(0, 5));
    }, []);

    return (
        <div className="flex min-h-screen bg-secondary-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-secondary-800 mb-2">
                            Dashboard
                        </h1>
                        <p className="text-secondary-600 text-lg">
                            Bem-vindo de volta, {user?.name}!
                        </p>
                    </div>
                    <Bell className="w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-110" />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total de Projetos */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Total de Projetos</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.totalProjects}
                                </h3>
                                <p className="text-sm text-secondary-600">
                                    +{stats.projectsThisMonth} este mês
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                                <FolderOpen size={24} />
                            </div>
                        </div>
                    </Card>

                    {/* Projetos Ativos */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Projetos Ativos</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.activeProjects}
                                </h3>
                                <p className="text-sm text-secondary-600">Em andamento</p>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Home size={24} />
                            </div>
                        </div>
                    </Card>

                    {/* Total de Usuários */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Total de Usuários</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.totalUsers}
                                </h3>
                                <p className="text-sm text-secondary-600">Participantes</p>
                            </div>
                            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Users size={24} />
                            </div>
                        </div>
                    </Card>

                    {/* Aprovações Pendentes */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Aprovações Pendentes</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.pendingApprovals}
                                </h3>
                                <p className="text-sm text-secondary-600">Aguardando</p>
                            </div>
                            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                                <CheckSquare size={24} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Projects Table */}
                <Card className="bg-white rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-secondary-100">
                                <tr>
                                    <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                        Projeto
                                    </th>
                                    <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                        Categoria
                                    </th>
                                    <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                        Coordenador
                                    </th>
                                    <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                        Participantes
                                    </th>
                                    <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProjects.map((project) => (
                                    <tr key={project.id} className="border-t border-secondary-200">
                                        <td className="font-semibold text-secondary-800 p-4">
                                            {project.title}
                                        </td>
                                        <td className="p-4 text-secondary-600">{project.category}</td>
                                        <td className="p-4 text-secondary-600">{project.coordinator}</td>
                                        <td className="p-4 text-secondary-600">{project.participants}</td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${project.status === 'ativo'
                                                        ? 'bg-primary-100 text-primary-500'
                                                        : project.status === 'em_andamento'
                                                            ? 'bg-yellow-100 text-yellow-600'
                                                            : 'bg-blue-100 text-blue-600'
                                                    }`}
                                            >
                                                {project.status === 'ativo'
                                                    ? 'Ativo'
                                                    : project.status === 'em_andamento'
                                                        ? 'Em Andamento'
                                                        : 'Planejamento'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;