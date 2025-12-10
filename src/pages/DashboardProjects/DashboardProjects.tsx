import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { mockProjects } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const DashboardProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(mockProjects);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Gerenciar Projetos
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Visualize e gerencie todos os projetos cadastrados
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/dashboard/projetos/novo')}
                    >
                        + Novo Projeto
                    </Button>
                </div>

                {/* Card de conteúdo */}
                <Card className="bg-white p-0 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-[var(--color-border)]">
                        <input
                            type="text"
                            placeholder="Buscar por título ou coordenador..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-[400px] px-4 py-3 border border-[var(--color-border)] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                        />
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Projeto
                                    </th>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Categoria
                                    </th>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Coordenador
                                    </th>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={project.image}
                                                    alt=""
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <span className="font-semibold">{project.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            {project.category}
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            {project.coordinator}
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            <span
                                                className={[
                                                    'inline-block px-3 py-1 rounded-full text-[0.75rem] font-semibold uppercase',
                                                    project.status === 'ativo'
                                                        ? 'bg-[rgba(16,185,129,0.1)] text-[var(--color-success)]'
                                                        : project.status === 'em_andamento'
                                                            ? 'bg-[rgba(245,158,11,0.1)] text-[var(--color-warning)]'
                                                            : 'bg-[rgba(59,130,246,0.1)] text-[#3b82f6]',
                                                ].join(' ')}
                                            >
                                                {project.status === 'ativo'
                                                    ? 'Ativo'
                                                    : project.status === 'em_andamento'
                                                        ? 'Em Andamento'
                                                        : 'Planejamento'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            <div className="flex gap-2">
                                                <button
                                                    className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)]"
                                                    onClick={() =>
                                                        navigate(`/dashboard/projetos/editar/${project.id}`)
                                                    }
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.1)] hover:border-[var(--color-error)]"
                                                    onClick={() => handleDelete(project.id)}
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
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

export default DashboardProjects;