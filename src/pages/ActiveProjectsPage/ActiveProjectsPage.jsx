import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button';
import styles from './ActiveProjectsPage.module.css';

const ActiveProjectsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Filter projects where user is a participant
    const activeProjects = mockProjects.filter(project =>
        user?.projects && user.projects.includes(project.id)
    );

    return (
        <div className={styles.pageLayout}>
            <Header />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Meus Projetos Ativos</h1>
                    <p className={styles.subtitle}>Acompanhe os projetos em que você está participando</p>
                </div>

                {activeProjects.length > 0 ? (
                    <div className={styles.projectsGrid}>
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
                    <div className={styles.emptyState}>
                        <img src="/src/assets/icons/projetos.svg" alt="" className={styles.emptyIcon} />
                        <h3>Você não tem projetos ativos</h3>
                        <p>Explore os projetos disponíveis e inscreva-se para participar.</p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/aluno/projetos')}
                            className={styles.exploreButton}
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
