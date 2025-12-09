import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, CheckSquare, BookOpen, Users, User, Settings, GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/dashboard/projetos', label: 'Projetos', icon: FolderOpen },
        { path: '/dashboard/aprovacoes', label: 'Aprovações', icon: CheckSquare, roles: ['professor', 'admin'] },
        { path: '/dashboard/cursos', label: 'Cursos', icon: BookOpen, roles: ['professor', 'admin'] },
        { path: '/dashboard/professores', label: 'Professores', icon: GraduationCap, roles: ['professor', 'admin'] },
        { path: '/dashboard/usuarios', label: 'Usuários', icon: Users, roles: ['admin'] },
        { path: '/dashboard/perfil', label: 'Perfil', icon: User },
        { path: '/dashboard/config', label: 'Configurações', icon: Settings },
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
                {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                        >
                            <Icon className={styles.icon} size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
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
