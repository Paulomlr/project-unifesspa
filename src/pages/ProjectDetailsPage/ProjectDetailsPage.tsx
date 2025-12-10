import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';
import { mockProjects, mockUsers } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

const ProjectDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Find project
    const project = mockProjects.find(p => p.id === parseInt(id || '0'));

    // Find coordinator
    const coordinator = mockUsers.find(u => u.name === project?.coordinator);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Projeto não encontrado</h1>
                        <Button onClick={() => navigate('/projetos')}>Voltar para Projetos</Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Status labels
    const statusLabels: Record<string, string> = {
        ativo: 'Ativo',
        em_andamento: 'Em Andamento',
        planejamento: 'Planejamento',
        concluido: 'Concluído',
    };

    const handleSubscribe = () => {
        if (project.subscriptionFormUrl) {
            window.open(project.subscriptionFormUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header />

            <main className="flex-1">
                {/* Content Container */}
                <div className="max-w-[900px] mx-auto px-8 py-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-secondary-600 mb-8">
                        <Link to="/projetos" className="hover:text-primary-500 transition">
                            Projetos
                        </Link>
                        <ChevronRight size={16} />
                        <span className="text-secondary-900">{project.title}</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-4xl font-extrabold text-secondary-900 mb-3">
                        {project.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Project Image */}
                    <div className="mb-8">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full max-w-md rounded-lg shadow-md"
                        />
                    </div>

                    {/* Visão Geral */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                            Visão geral do projeto
                        </h2>
                        <p className="text-secondary-700 leading-relaxed">
                            {project.fullDescription || `${project.description} Este projeto visa promover o desenvolvimento e bem-estar da comunidade universitária através de ações práticas e colaborativas. Com foco em resultados mensuráveis e impacto social, buscamos criar um ambiente mais inclusivo e sustentável para todos os envolvidos.`}
                        </p>
                    </section>

                    {/* Indicadores de Impacto */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                            Indicadores de Impacto
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-secondary-200">
                                <p className="text-sm text-secondary-600 mb-2">
                                    Membros da comunidade atendidos
                                </p>
                                <p className="text-3xl font-bold text-secondary-900">
                                    {project.impactMetrics?.membersServed || project.participants}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-secondary-200">
                                <p className="text-sm text-secondary-600 mb-2">
                                    Oficinas realizadas
                                </p>
                                <p className="text-3xl font-bold text-secondary-900">
                                    {project.impactMetrics?.workshopsHeld || 5}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-secondary-200">
                                <p className="text-sm text-secondary-600 mb-2">
                                    Horas de voluntariado contribuídas
                                </p>
                                <p className="text-3xl font-bold text-secondary-900">
                                    {project.impactMetrics?.volunteerHours || '1000+'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Project Info */}
                    <section className="mb-10">
                        <div className="space-y-3">
                            <div>
                                <span className="font-bold text-secondary-900">Curso: </span>
                                <span className="text-secondary-700">{project.category}</span>
                            </div>

                            <div>
                                <span className="font-bold text-secondary-900">Status: </span>
                                <span className="text-secondary-700">{statusLabels[project.status]}</span>
                            </div>

                            {project.keywords && project.keywords.length > 0 && (
                                <div>
                                    <span className="font-bold text-secondary-900">Palavras-chave: </span>
                                    <span className="text-secondary-700">
                                        {project.keywords.map(k => `#${k}`).join(' ')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Coordinator */}
                    {coordinator && (
                        <div>
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                                    Coordenador do Projeto
                                </h2>

                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={coordinator.photo}
                                        alt={coordinator.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-secondary-900">
                                            {coordinator.name}
                                        </h3>
                                        <p className="text-sm text-secondary-600">
                                            {coordinator.department || coordinator.course}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-secondary-700 mb-2">
                                        Dúvidas? Entre em contato pelo e-mail:
                                    </p>
                                    <a
                                        href={`mailto:${coordinator.email}`}
                                        className="text-primary-500 hover:text-primary-600 font-medium transition"
                                    >
                                        {coordinator.email}
                                    </a>
                                </div>
                            </section>
                        </div>)}

                    {/* CTA Button - Only show if project is public and has subscription URL */}
                    {project.isPublic && project.subscriptionFormUrl && (
                        <div className="flex justify-end">
                            <Button
                                variant="primary"
                                onClick={handleSubscribe}
                                className="px-8 py-3"
                            >
                                Candidate-se ao Projeto
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetailsPage;
