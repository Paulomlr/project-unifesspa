import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '/src/assets/icons/home.svg' },
        { path: '/dashboard/projetos', label: 'Projetos', icon: '/src/assets/icons/projetos.svg' },
        { path: '/dashboard/aprovacoes', label: 'Aprovações', icon: '/src/assets/icons/aprovacoes.svg', roles: ['professor', 'admin'] },
        { path: '/dashboard/cursos', label: 'Cursos', icon: '/src/assets/icons/cursos.svg', roles: ['professor', 'admin'] },
        { path: '/dashboard/usuarios', label: 'Usuários', icon: '/src/assets/icons/usuarios.svg', roles: ['admin'] },
        { path: '/dashboard/perfil', label: 'Perfil', icon: '/src/assets/icons/perfil.svg' },
        { path: '/dashboard/config', label: 'Configurações', icon: '/src/assets/icons/config.svg' },
    ];

    const filteredMenuItems = menuItems.filter(item => {
        if (!item.roles) return true;
        return item.roles.includes(user?.role || 'aluno');
    });

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <img
                    src="/src/assets/logos/logo.png"
                    alt="UNIFESSPA+"
                    className={styles.logo}
                />
                <h2 className={styles.title}>UNIFESSPA+</h2>
            </div>

            <nav className={styles.nav}>
                {filteredMenuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                    >
                        <img src={item.icon} alt={item.label} className={styles.icon} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.userInfo}>
                <img
                    src={user?.photo || '/src/assets/images/profile_photo.png'}
                    alt={user?.name}
                    className={styles.userPhoto}
                />
                <div className={styles.userDetails}>
                    <p className={styles.userName}>{user?.name || 'Usuário'}</p>
                    <p className={styles.userRole}>{user?.role === 'professor' ? 'Professor' : user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
