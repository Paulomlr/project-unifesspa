import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './StudentProjectsPage.module.css';

const StudentProjectsPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = mockProjects.filter(project => {
        const matchesFilter = filter === 'all' || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const categories = [...new Set(mockProjects.map(p => p.category))];

    return (
        <div className={styles.studentProjectsPage}>
            <Header />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Projetos Disponíveis</h1>
                    <p className={styles.subtitle}>Explore e participe dos projetos da UNIFESSPA</p>
                </div>

                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Buscar projetos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />

                    <div className={styles.categoryFilters}>
                        <button
                            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
                                onClick={() => setFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.projectsGrid}>
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            showActions={true}
                            onView={(project) => navigate(`/projetos/${project.id}`)}
                        />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>Nenhum projeto encontrado com os critérios selecionados.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default StudentProjectsPage;
