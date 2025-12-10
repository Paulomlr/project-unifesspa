import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button';

const HomePage = () => {
    const navigate = useNavigate();
    const featuredProjects = mockProjects.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section
                className="w-full bg-[linear-gradient(135deg,rgba(16,185,129,0.05)_0%,rgba(16,185,129,0.15)_100%)]"
            >
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-8 py-16 lg:px-8 lg:py-16 md:px-6 md:py-12">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-[3.5rem] leading-tight font-extrabold text-[var(--color-text)] md:text-[2.5rem] sm:text-[2rem]">
                            Conectando{' '}
                            <span className="text-[var(--color-primary)]">Projetos</span> e{' '}
                            <span className="text-[var(--color-primary)]">Pessoas</span>
                        </h1>
                        <p className="text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                            A plataforma que integra alunos, professores e projetos universitários da UNIFESSPA.
                            Participe de iniciativas transformadoras e contribua para o desenvolvimento acadêmico.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="primary"
                                size="large"
                                onClick={() => navigate('/projetos')}
                            >
                                Explorar Projetos
                            </Button>
                            <Button
                                variant="outline"
                                size="large"
                                onClick={() => navigate('/cadastro')}
                            >
                                Cadastre-se Agora
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                        <img
                            src="/src/assets/images/foto_unifesspa.png"
                            alt="UNIFESSPA Campus"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-[1400px] mx-auto my-16 px-8 md:px-8 sm:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 sm:gap-4">
                    <div className="bg-white p-8 rounded-xl text-center shadow-md transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-[3rem] font-extrabold text-[var(--color-primary)] mb-2">
                            45+
                        </h3>
                        <p className="text-base font-semibold text-[var(--color-text-secondary)]">
                            Projetos Ativos
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl text-center shadow-md transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-[3rem] font-extrabold text-[var(--color-primary)] mb-2">
                            1250+
                        </h3>
                        <p className="text-base font-semibold text-[var(--color-text-secondary)]">
                            Estudantes
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl text-center shadow-md transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-[3rem] font-extrabold text-[var(--color-primary)] mb-2">
                            150+
                        </h3>
                        <p className="text-base font-semibold text-[var(--color-text-secondary)]">
                            Professores
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl text-center shadow-md transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-[3rem] font-extrabold text-[var(--color-primary)] mb-2">
                            25+
                        </h3>
                        <p className="text-base font-semibold text-[var(--color-text-secondary)]">
                            Cursos
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="max-w-[1400px] mx-auto my-16 px-8 md:px-8 sm:px-4">
                <div className="text-center mb-12">
                    <h2 className="text-[2.5rem] font-extrabold text-[var(--color-text)] mb-4 sm:text-[2rem]">
                        Projetos em Destaque
                    </h2>
                    <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                        Conheça alguns dos projetos que estão transformando a universidade
                    </p>
                </div>

                {/* Única fileira horizontal com 3 cards lado a lado */}
                <div className="flex gap-8 overflow-x-auto pb-2">
                    {featuredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="min-w-[350px] max-w-[350px] flex-shrink-0"
                        >
                            <ProjectCard
                                project={project}
                                onView={(p) => navigate(`/projetos/${p.id}`)}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Button
                        variant="outline"
                        size="large"
                        onClick={() => navigate('/projetos')}
                    >
                        Ver Todos os Projetos
                    </Button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-dark)_100%)] text-white text-center py-20 px-8 mt-16 sm:px-4">
                <h2 className="text-[2.5rem] font-extrabold mb-4 sm:text-[2rem]">
                    Pronto para fazer a diferença?
                </h2>
                <p className="text-xl mb-8 opacity-95 sm:text-base">
                    Junte-se à comunidade e participe de projetos que transformam vidas
                </p>
                <div className="flex justify-center gap-4 flex-col sm:flex-row sm:flex-nowrap">
                    <Button
                        variant="primary"
                        size="large"
                        onClick={() => navigate('/cadastro')}
                    >
                        Começar Agora
                    </Button>
                    <Button
                        variant="outline"
                        size="large"
                        onClick={() => navigate('/contato')}
                    >
                        Fale Conosco
                    </Button>
                </div>

            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
