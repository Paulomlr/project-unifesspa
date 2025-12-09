import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { mockCourses } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styles from './DashboardCourses.module.css';

const DashboardCourses = () => {
    const [courses, setCourses] = useState(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este curso?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Gerenciar Cursos</h1>
                        <p className={styles.subtitle}>Visualize e gerencie os cursos da instituição</p>
                    </div>
                    <Button variant="primary">
                        + Novo Curso
                    </Button>
                </div>

                <Card className={styles.contentCard}>
                    <div className={styles.toolbar}>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome do Curso</th>
                                    <th>Departamento</th>
                                    <th>Estudantes</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((course) => (
                                    <tr key={course.id}>
                                        <td>
                                            <span className={styles.courseCode}>{course.code}</span>
                                        </td>
                                        <td className={styles.courseName}>{course.name}</td>
                                        <td>{course.department}</td>
                                        <td>{course.students}</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionButton}
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.delete}`}
                                                    onClick={() => handleDelete(course.id)}
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

export default DashboardCourses;
