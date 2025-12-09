import styles from './Card.module.css';

const Card = ({
    children,
    title,
    className = '',
    onClick,
    hoverable = false
}) => {
    const cardClass = `
    ${styles.card} 
    ${hoverable ? styles.hoverable : ''}
    ${className}
  `.trim();

    return (
        <div className={cardClass} onClick={onClick}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    );
};

export default Card;
