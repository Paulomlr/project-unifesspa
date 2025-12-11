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

    // Find coordinator - remove "Prof." or "Profa." prefix
    const coordinatorName = project?.coordinator.replace(/^(Prof\.|Profa\.)\s*/, '');
    const coordinator = mockUsers.find(u => u.name === coordinatorName);

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

    // Status labels and colors
    // Status labels and colors
    const statusLabels: Record<string, string> = {
        SUBMITTED: 'Submetido',
        APPROVED: 'Aprovado',
        REJECTED: 'Rejeitado',
        ACTIVE: 'Ativo',
        FINISHED: 'Finalizado',
    };

    const statusColors: Record<string, string> = {
        SUBMITTED: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        APPROVED: 'bg-blue-100 text-blue-700 border-blue-200',
        REJECTED: 'bg-red-100 text-red-700 border-red-200',
        ACTIVE: 'bg-green-100 text-green-700 border-green-200',
        FINISHED: 'bg-gray-100 text-gray-700 border-gray-200',
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
                {/* Hero Section with Gradient */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-12">
                    <div className="max-w-[1000px] mx-auto px-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
                            <Link to="/projetos" className="hover:text-white transition">
                                Projetos
                            </Link>
                            <ChevronRight size={16} />
                            <span className="text-white font-medium">{project.title}</span>
                        </nav>

                        {/* Title & Status */}
                        <div className="flex items-start justify-between gap-6 mb-4">
                            <h1 className="text-4xl font-extrabold leading-tight flex-1">
                                {project.title}
                            </h1>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 bg-white ${statusColors[project.status]}`}>
                                {statusLabels[project.status]}
                            </span>
                        </div>

                        {/* Subtitle */}
                        {project.subtitle && (
                            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mb-4">
                                {project.subtitle}
                            </p>
                        )}

                        {/* Description (Short) */}
                        <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                            {project.description}
                        </p>


                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-[1000px] mx-auto px-8 py-12">
                    {/* Main Grid - Image + Content */}
                    <div className="grid grid-cols-[400px_1fr] gap-12 mb-12 lg:grid-cols-1">
                        {/* Left Column - Image */}
                        <div>
                            <div className="sticky top-8">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full rounded-xl shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-10">
                            {/* Visão Geral */}
                            <section>
                                <h2 className="text-2xl font-bold text-secondary-900 mb-4 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                                    Visão geral do projeto
                                </h2>
                                <p className="text-secondary-700 leading-relaxed text-lg">
                                    {project.overview || project.fullDescription || `${project.description} Este projeto visa promover o desenvolvimento e bem-estar da comunidade universitária através de ações práticas e colaborativas. Com foco em resultados mensuráveis e impacto social, buscamos criar um ambiente mais inclusivo e sustentável para todos os envolvidos.`}
                                </p>
                            </section>

                            {/* Indicadores de Impacto */}
                            <section>
                                <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                                    Indicadores de Impacto
                                </h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition">
                                        <p className="text-sm text-primary-600 font-semibold mb-2 uppercase tracking-wide">
                                            Membros atendidos
                                        </p>
                                        <p className="text-4xl font-extrabold text-primary-600">
                                            {project.impactMetrics?.membersServed || project.participants}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition">
                                        <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                                            Oficinas realizadas
                                        </p>
                                        <p className="text-4xl font-extrabold text-blue-600">
                                            {project.impactMetrics?.workshopsHeld || 5}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition">
                                        <p className="text-sm text-green-600 font-semibold mb-2 uppercase tracking-wide">
                                            Horas voluntariado
                                        </p>
                                        <p className="text-4xl font-extrabold text-green-600">
                                            {project.impactMetrics?.volunteerHours || '1000+'}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Project Info */}
                            <section className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
                                <h2 className="text-xl font-bold text-secondary-900 mb-4">Informações do Projeto</h2>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Curso:</span>
                                        <span className="text-secondary-900 font-medium">{project.course || project.category}</span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Status:</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                                            {statusLabels[project.status]}
                                        </span>
                                    </div>

                                    {project.keywords && project.keywords.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Palavras-chave:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {project.keywords.map(keyword => (
                                                    <span
                                                        key={keyword}
                                                        className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold border border-primary-100"
                                                    >
                                                        #{keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Coordinator */}
                            {coordinator && (
                                <section className="bg-gradient-to-br from-secondary-50 to-white p-6 rounded-xl border border-secondary-200 shadow-sm">
                                    <h2 className="text-xl font-bold text-secondary-900 mb-4">Coordenador do Projeto</h2>

                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={coordinator.photo}
                                            alt={coordinator.name}
                                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                        />
                                        <div>
                                            <h3 className="font-bold text-secondary-900 text-lg">
                                                {coordinator.name}
                                            </h3>
                                            <p className="text-sm text-secondary-600">
                                                {coordinator.department || coordinator.course}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-secondary-200">
                                        <p className="text-sm text-secondary-600 mb-2">
                                            Dúvidas? Entre em contato:
                                        </p>
                                        <a
                                            href={`mailto:${coordinator.email}`}
                                            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition group"
                                        >
                                            <Mail size={18} className="group-hover:scale-110 transition" />
                                            {coordinator.email}
                                        </a>
                                    </div>
                                </section>
                            )}

                            {/* CTA Button */}
                            {project.isPublic && project.subscriptionFormUrl && project.status === 'ACTIVE' && (
                                <div className="pt-6">
                                    <Button
                                        variant="primary"
                                        onClick={handleSubscribe}
                                        className="w-full py-4 text-lg font-bold"
                                    >
                                        Candidate-se ao Projeto
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetailsPage;
