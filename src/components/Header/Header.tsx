import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';
import Button from '../Button/Button';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logoLink}>
                    <img
                        src="/src/assets/logos/logo.png"
                        alt="UNIFESSPA+"
                        className={styles.logo}
                    />
                    <span className={styles.logoText}>UNIFESSPA+</span>
                </Link>

                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}>Início</Link>
                    <Link to="/projetos" className={styles.navLink}>Projetos</Link>
                    <Link to="/contato" className={styles.navLink}>Contato</Link>
                </nav>

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <>
                            <span className={styles.userName}>Olá, {user?.name}</span>
                            <Button variant="outline" size="small" onClick={() => navigate('/dashboard')}>
                                Dashboard
                            </Button>
                            <Button variant="secondary" size="small" onClick={handleLogout}>
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" size="small" onClick={() => navigate('/login')}>
                                Entrar
                            </Button>
                            <Button variant="primary" size="small" onClick={() => navigate('/cadastro')}>
                                Cadastrar
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
