import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button';
import styles from './HomePage.module.css';

const HomePage = () => {
    const navigate = useNavigate();
    const featuredProjects = mockProjects.slice(0, 3);

    return (
        <div className={styles.homePage}>
            <Header />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Conectando <span className={styles.highlight}>Projetos</span> e <span className={styles.highlight}>Pessoas</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        A plataforma que integra alunos, professores e projetos universitários da UNIFESSPA.
                        Participe de iniciativas transformadoras e contribua para o desenvolvimento acadêmico.
                    </p>
                    <div className={styles.heroActions}>
                        <Button variant="primary" size="large" onClick={() => navigate('/projetos')}>
                            Explorar Projetos
                        </Button>
                        <Button variant="outline" size="large" onClick={() => navigate('/cadastro')}>
                            Cadastre-se Agora
                        </Button>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <img
                        src="/src/assets/images/foto_unifesspa.png"
                        alt="UNIFESSPA Campus"
                        className={styles.campusImage}
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.stats}>
                <div className={styles.statCard}>
                    <h3 className={styles.statNumber}>45+</h3>
                    <p className={styles.statLabel}>Projetos Ativos</p>
                </div>
                <div className={styles.statCard}>
                    <h3 className={styles.statNumber}>1250+</h3>
                    <p className={styles.statLabel}>Estudantes</p>
                </div>
                <div className={styles.statCard}>
                    <h3 className={styles.statNumber}>150+</h3>
                    <p className={styles.statLabel}>Professores</p>
                </div>
                <div className={styles.statCard}>
                    <h3 className={styles.statNumber}>25+</h3>
                    <p className={styles.statLabel}>Cursos</p>
                </div>
            </section>

            {/* Featured Projects */}
            <section className={styles.featuredSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Projetos em Destaque</h2>
                    <p className={styles.sectionDescription}>
                        Conheça alguns dos projetos que estão transformando a universidade
                    </p>
                </div>
                <div className={styles.projectsGrid}>
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onView={(project) => navigate(`/projetos/${project.id}`)}
                        />
                    ))}
                </div>
                <div className={styles.sectionFooter}>
                    <Button variant="outline" size="large" onClick={() => navigate('/projetos')}>
                        Ver Todos os Projetos
                    </Button>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <h2 className={styles.ctaTitle}>Pronto para fazer a diferença?</h2>
                <p className={styles.ctaDescription}>
                    Junte-se à comunidade UNIFESSPA+ e participe de projetos que transformam vidas
                </p>
                <div className={styles.ctaActions}>
                    <Button variant="primary" size="large" onClick={() => navigate('/cadastro')}>
                        Começar Agora
                    </Button>
                    <Button variant="outline" size="large" onClick={() => navigate('/contato')}>
                        Fale Conosco
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
