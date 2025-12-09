import styles from './ProjectCard.module.css';
import Button from '../Button/Button';

const ProjectCard = ({ project, showActions = false, onEdit, onDelete, onView }) => {
    const getStatusBadge = (status) => {
        const statusMap = {
            ativo: { text: 'Ativo', class: styles.statusActive },
            em_andamento: { text: 'Em Andamento', class: styles.statusProgress },
            planejamento: { text: 'Planejamento', class: styles.statusPlanning },
            finalizado: { text: 'Finalizado', class: styles.statusFinished },
        };
        return statusMap[status] || statusMap.ativo;
    };

    const statusBadge = getStatusBadge(project.status);

    return (
        <div className={styles.projectCard}>
            {project.image && (
                <div className={styles.imageContainer}>
                    <img src={project.image} alt={project.title} className={styles.image} />
                    <span className={`${styles.statusBadge} ${statusBadge.class}`}>
                        {statusBadge.text}
                    </span>
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{project.title}</h3>
                    {project.category && (
                        <span className={styles.category}>{project.category}</span>
                    )}
                </div>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.info}>
                    {project.coordinator && (
                        <div className={styles.infoItem}>
                            <strong>Coordenador:</strong> {project.coordinator}
                        </div>
                    )}
                    {project.participants !== undefined && (
                        <div className={styles.infoItem}>
                            <strong>Participantes:</strong> {project.participants}
                        </div>
                    )}
                </div>

                {showActions && (
                    <div className={styles.actions}>
                        {onView && (
                            <Button variant="outline" size="small" onClick={() => onView(project)}>
                                Ver Detalhes
                            </Button>
                        )}
                        {onEdit && (
                            <Button variant="secondary" size="small" onClick={() => onEdit(project)}>
                                Editar
                            </Button>
                        )}
                        {onDelete && (
                            <Button variant="danger" size="small" onClick={() => onDelete(project)}>
                                Excluir
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
