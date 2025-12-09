import { Pencil } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const { user } = useAuth();

    // Mock getting user's projects
    const userProjects = mockProjects.filter(p =>
        p.coordinator === user?.name || (user?.projects && user.projects.includes(p.id))
    );

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Meu Perfil</h1>
                    <p className={styles.subtitle}>Gerencie suas informações e visualize suas atividades</p>
                </div>

                <div className={styles.profileGrid}>
                    {/* User Info Card */}
                    <Card className={styles.profileCard}>
                        <div className={styles.profileHeader}>
                            <div className={styles.avatarContainer}>
                                <img
                                    src={user?.photo || '/src/assets/images/profile_photo.png'}
                                    alt={user?.name}
                                    className={styles.avatar}
                                />
                                <button className={styles.editAvatarButton}>
                                    <Pencil size={16} />
                                </button>
                            </div>
                            <div className={styles.profileInfo}>
                                <h2 className={styles.profileName}>{user?.name}</h2>
                                <p className={styles.profileRole}>
                                    {user?.role === 'professor' ? 'Professor' :
                                        user?.role === 'admin' ? 'Administrador' : 'Aluno'}
                                </p>
                                <p className={styles.profileDepartment}>{user?.department || user?.course}</p>
                            </div>
                        </div>

                        <div className={styles.profileDetails}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Email</span>
                                <span className={styles.detailValue}>{user?.email}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Telefone</span>
                                <span className={styles.detailValue}>(94) 99999-9999</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Matrícula/SIAPE</span>
                                <span className={styles.detailValue}>2024001234</span>
                            </div>
                        </div>

                        <div className={styles.profileActions}>
                            <Button variant="primary" fullWidth>Editar Perfil</Button>
                            <Button variant="outline" fullWidth>Alterar Senha</Button>
                        </div>
                    </Card>

                    {/* Activity/Projects Section */}
                    <div className={styles.activitySection}>
                        <h3 className={styles.sectionTitle}>Meus Projetos</h3>
                        <div className={styles.projectsList}>
                            {userProjects.length > 0 ? (
                                userProjects.map(project => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        showActions={true}
                                        onView={() => { }}
                                    />
                                ))
                            ) : (
                                <Card className={styles.emptyState}>
                                    <p>Você ainda não participa de nenhum projeto.</p>
                                    <Button variant="outline" size="small">Explorar Projetos</Button>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
