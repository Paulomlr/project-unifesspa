import { Pencil } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const ProfilePage = () => {
  const { user } = useAuth();

  const userProjects = mockProjects.filter(
    p => p.coordinator === user?.name || (user?.projects && user.projects.includes(p.id))
  );

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar />

      <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-secondary-900 mb-1">Meu Perfil</h1>
          <p className="text-secondary-600 text-lg">
            Gerencie suas informações e visualize suas atividades
          </p>
        </div>

        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* User Info Card */}
          <Card className="h-fit">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4">
                <img
                  src={user?.photo || '/src/assets/images/profile_photo.png'}
                  alt={user?.name}
                  className="w-30 h-30 rounded-full object-cover border-4 border-white shadow-md"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 border-2 border-white rounded-full flex items-center justify-center hover:scale-110 transition">
                  <Pencil size={16} className="text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-bold text-secondary-900 mb-1">{user?.name}</h2>
                <p className="text-primary-500 font-semibold text-sm uppercase mb-1">
                  {user?.role === 'professor'
                    ? 'Professor'
                    : user?.role === 'admin'
                      ? 'Administrador'
                      : 'Aluno'}
                </p>
                <p className="text-secondary-600 text-sm">{user?.department || user?.course}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-secondary-200 pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">Email</span>
                <span className="text-secondary-900 font-semibold text-sm">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">Telefone</span>
                <span className="text-secondary-900 font-semibold text-sm">(94) 99999-9999</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">Matrícula/SIAPE</span>
                <span className="text-secondary-900 font-semibold text-sm">2024001234</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="primary" fullWidth>
                Editar Perfil
              </Button>
              <Button variant="outline" fullWidth>
                Alterar Senha
              </Button>
            </div>
          </Card>

          {/* Activity / Projects Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-secondary-900">Meus Projetos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.length > 0 ? (
                userProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    showActions={true}
                    onView={() => { }}
                  />
                ))
              ) : (
                <Card className="flex flex-col items-center justify-center gap-4 p-12 text-secondary-600 text-center">
                  <p>Você ainda não participa de nenhum projeto.</p>
                  <Button variant="outline" size="small">
                    Explorar Projetos
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
