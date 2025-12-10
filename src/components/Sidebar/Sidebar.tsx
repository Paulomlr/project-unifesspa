import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FolderOpen,
  CheckSquare,
  BookOpen,
  Users,
  User,
  Settings,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/dashboard/projetos', label: 'Projetos', icon: FolderOpen },
    { path: '/dashboard/aprovacoes', label: 'Aprovações', icon: CheckSquare, roles: ['professor', 'admin'] },
    { path: '/dashboard/cursos', label: 'Cursos', icon: BookOpen, roles: ['professor', 'admin'] },
    { path: '/dashboard/professores', label: 'Professores', icon: GraduationCap, roles: ['professor', 'admin'] },
    { path: '/dashboard/usuarios', label: 'Usuários', icon: Users, roles: ['professor','admin'] },
    { path: '/dashboard/perfil', label: 'Perfil', icon: User },
    { path: '/dashboard/config', label: 'Configurações', icon: Settings },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || 'aluno');
  });

  return (
    <aside
      className="
        w-[280px] min-h-screen bg-white border-r border-[var(--color-border)]
        flex flex-col sticky top-0 left-0
        max-[1024px]:w-[80px]
        max-[768px]:hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          p-8 px-6 flex items-center gap-4 border-b border-[var(--color-border)]
          max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:p-6 max-[1024px]:px-2
        "
      >
        <img src="/src/assets/logos/logo.png" className="w-10 h-auto" />

        <h2
          className="
            text-1xl font-extrabold text-[var(--color-primary)]
            max-[1024px]:hidden
          "
        >
          Conecta Unifesspa
        </h2>
      </div>

      {/* NAV */}
      <nav className="flex-1 py-6 flex flex-col gap-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center gap-4 px-6 py-4 font-semibold
                transition-all duration-200
                text-[var(--color-text-secondary)]
                hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]
                ${isActive ? 'bg-[rgba(16,185,129,0.1)] text-[var(--color-primary)]' : ''}
                max-[1024px]:justify-center max-[1024px]:px-4
              `}
            >
              {/* Left bar indicator */}
              <span
                className={`
                  absolute left-0 inset-y-0 w-[4px] bg-[var(--color-primary)]
                  transition-transform duration-200 origin-top
                  ${isActive ? 'scale-y-100' : 'scale-y-0'}
                `}
              />

              {/* ICON */}
              <Icon
                size={22}
                className={`
                  transition-all
                  ${isActive ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale'}
                  group-hover:opacity-100 group-hover:grayscale-0
                `}
              />

              {/* LABEL */}
              <span className="max-[1024px]:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER INFO */}
      <div
        className="
          p-6 border-t border-[var(--color-border)]
          flex items-center gap-4
          max-[1024px]:justify-center
        "
      >
        <img
          src={user?.photo || '/src/assets/images/profile_photo.png'}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-primary)]"
        />

        <div className="flex-1 min-w-0 max-[1024px]:hidden">
          <p className="font-bold text-[var(--color-text)] truncate">
            {user?.name || 'Usuário'}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {user?.role === 'professor'
              ? 'Professor'
              : user?.role === 'admin'
              ? 'Administrador'
              : 'Aluno'}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
