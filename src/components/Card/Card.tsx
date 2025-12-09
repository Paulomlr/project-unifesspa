import { ReactNode, MouseEventHandler } from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    hoverable?: boolean;
}

const Card = ({
    children,
    title,
    className = '',
    onClick,
    hoverable = false
}: CardProps) => {
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
