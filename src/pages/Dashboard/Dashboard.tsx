import { useState, useEffect } from 'react';
import { Bell, FolderOpen, Home, Users, CheckSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockStatistics, mockProjects, mockUsers } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(mockStatistics);
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        // Get recent projects
        setRecentProjects(mockProjects.slice(0, 5));
    }, []);

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Dashboard</h1>
                        <p className={styles.subtitle}>Bem-vindo de volta, {user?.name}!</p>
                    </div>
                    <Bell className={styles.notificationIcon} size={24} />
                </div>

                {/* Statistics Cards */}
                <div className={styles.statsGrid}>
                    <Card className={styles.statCard}>
                        <div className={styles.statContent}>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Total de Projetos</p>
                                <h3 className={styles.statValue}>{stats.totalProjects}</h3>
                                <p className={styles.statChange}>+{stats.projectsThisMonth} este mês</p>
                            </div>
                            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                                <FolderOpen size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card className={styles.statCard}>
                        <div className={styles.statContent}>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Projetos Ativos</p>
                                <h3 className={styles.statValue}>{stats.activeProjects}</h3>
                                <p className={styles.statChange}>Em andamento</p>
                            </div>
                            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                                <Home size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card className={styles.statCard}>
                        <div className={styles.statContent}>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Total de Usuários</p>
                                <h3 className={styles.statValue}>{stats.totalUsers}</h3>
                                <p className={styles.statChange}>Participantes</p>
                            </div>
                            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                                <Users size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card className={styles.statCard}>
                        <div className={styles.statContent}>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Aprovações Pendentes</p>
                                <h3 className={styles.statValue}>{stats.pendingApprovals}</h3>
                                <p className={styles.statChange}>Aguardando</p>
                            </div>
                            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                                <CheckSquare size={24} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Projects Table */}
                <Card title="Projetos Recentes" className={styles.tableCard}>
                    <div className={styles.table}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Projeto</th>
                                    <th>Categoria</th>
                                    <th>Coordenador</th>
                                    <th>Participantes</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProjects.map((project) => (
                                    <tr key={project.id}>
                                        <td className={styles.projectName}>{project.title}</td>
                                        <td>{project.category}</td>
                                        <td>{project.coordinator}</td>
                                        <td>{project.participants}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[project.status]}`}>
                                                {project.status === 'ativo' ? 'Ativo' :
                                                    project.status === 'em_andamento' ? 'Em Andamento' :
                                                        'Planejamento'}
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
