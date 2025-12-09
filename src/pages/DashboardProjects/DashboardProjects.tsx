import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { mockProjects } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styles from './DashboardProjects.module.css';

const DashboardProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(mockProjects);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Gerenciar Projetos</h1>
                        <p className={styles.subtitle}>Visualize e gerencie todos os projetos cadastrados</p>
                    </div>
                    <Button variant="primary" onClick={() => navigate('/dashboard/projetos/novo')}>
                        + Novo Projeto
                    </Button>
                </div>

                <Card className={styles.contentCard}>
                    <div className={styles.toolbar}>
                        <input
                            type="text"
                            placeholder="Buscar por título ou coordenador..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Projeto</th>
                                    <th>Categoria</th>
                                    <th>Coordenador</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project) => (
                                    <tr key={project.id}>
                                        <td>
                                            <div className={styles.projectInfo}>
                                                <img src={project.image} alt="" className={styles.projectThumb} />
                                                <span className={styles.projectName}>{project.title}</span>
                                            </div>
                                        </td>
                                        <td>{project.category}</td>
                                        <td>{project.coordinator}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[project.status]}`}>
                                                {project.status === 'ativo' ? 'Ativo' :
                                                    project.status === 'em_andamento' ? 'Em Andamento' :
                                                        'Planejamento'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => navigate(`/dashboard/projetos/editar/${project.id}`)}
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.delete}`}
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
