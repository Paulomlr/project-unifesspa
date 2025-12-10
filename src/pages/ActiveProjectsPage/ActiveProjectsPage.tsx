import { useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button';

const ActiveProjectsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const activeProjects = mockProjects.filter(project =>
        user?.projects && user.projects.includes(project.id)
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="max-w-[1400px] mx-auto px-8 py-12 w-full flex-1 md:px-4 md:py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Meus Projetos Ativos
                    </h1>
                    <p className="text-lg text-gray-600">
                        Acompanhe os projetos em que você está participando
                    </p>
                </div>

                {/* Projects */}
                {activeProjects.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 md:grid-cols-1">
                        {activeProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                showActions={true}
                                onView={(project) => navigate(`/projetos/${project.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-16 bg-white rounded-xl flex flex-col items-center gap-6 shadow-sm">
                        <FolderOpen className="w-16 h-16 opacity-20 grayscale" size={48} />

                        <h3 className="text-2xl font-bold text-gray-900">
                            Você não tem projetos ativos
                        </h3>

                        <p className="text-gray-600 max-w-sm">
                            Explore os projetos disponíveis e inscreva-se para participar.
                        </p>

                        <Button
                            variant="primary"
                            onClick={() => navigate('/aluno/projetos')}
                            className="mt-4"
                        >
                            Explorar Projetos
                        </Button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ActiveProjectsPage;
