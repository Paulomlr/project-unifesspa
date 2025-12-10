import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProjects, mockCourses, projectKeywords } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

const PublicProjectsPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter projects
    const filteredProjects = mockProjects.filter(project => {
        // Only show public projects
        if (!project.isPublic) return false;

        // Search term filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const matchesTitle = project.title.toLowerCase().includes(searchLower);
            const matchesDescription = project.description.toLowerCase().includes(searchLower);
            if (!matchesTitle && !matchesDescription) return false;
        }

        // Course filter
        if (selectedCourse && project.category !== selectedCourse) {
            return false;
        }

        // Status filter
        if (selectedStatus && project.status !== selectedStatus) {
            return false;
        }

        // Keyword filter
        if (selectedKeyword && !project.keywords?.includes(selectedKeyword)) {
            return false;
        }

        return true;
    });

    // Pagination
    const projectsPerPage = 9;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    // Reset to page 1 when filters change
    const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (value: string) => {
            setter(value);
            setCurrentPage(1);
        };
    };

    // Status labels and colors
    const statusLabels: Record<string, string> = {
        ativo: 'Ativo',
        em_andamento: 'Em Andamento',
        planejamento: 'Planejamento',
        concluido: 'Concluído',
    };

    const statusColors: Record<string, string> = {
        ativo: 'bg-green-100 text-green-700',
        em_andamento: 'bg-blue-100 text-blue-700',
        planejamento: 'bg-yellow-100 text-yellow-700',
        concluido: 'bg-gray-100 text-gray-700',
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16 px-8">
                    <div className="max-w-[1400px] mx-auto">
                        <h1 className="text-4xl font-extrabold mb-3">Projetos</h1>
                        <p className="text-xl text-white/90">
                            Explore projetos e iniciativas de extensão universitária em andamento
                        </p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="max-w-[1400px] mx-auto px-8 py-8">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={20} />
                        <input
                            type="text"
                            placeholder="Pesquisar projetos..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition bg-white text-secondary-900"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-3 mb-8 flex-wrap">
                        {/* Course Filter */}
                        <select
                            value={selectedCourse}
                            onChange={(e) => handleFilterChange(setSelectedCourse)(e.target.value)}
                            className="py-2 px-4 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition bg-white text-secondary-900 text-sm font-medium cursor-pointer"
                        >
                            <option value="">Curso</option>
                            {mockCourses.map(course => (
                                <option key={course.id} value={course.name}>
                                    {course.name}
                                </option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => handleFilterChange(setSelectedStatus)(e.target.value)}
                            className="py-2 px-4 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition bg-white text-secondary-900 text-sm font-medium cursor-pointer"
                        >
                            <option value="">Status</option>
                            <option value="ativo">Ativo</option>
                            <option value="em_andamento">Em Andamento</option>
                            <option value="planejamento">Planejamento</option>
                            <option value="concluido">Concluído</option>
                        </select>

                        {/* Keywords Filter */}
                        <select
                            value={selectedKeyword}
                            onChange={(e) => handleFilterChange(setSelectedKeyword)(e.target.value)}
                            className="py-2 px-4 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition bg-white text-secondary-900 text-sm font-medium cursor-pointer"
                        >
                            <option value="">Palavras-chave</option>
                            {projectKeywords.map(keyword => (
                                <option key={keyword} value={keyword}>
                                    {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-secondary-600">
                            {filteredProjects.length === 0 ? (
                                'Nenhum projeto encontrado'
                            ) : (
                                `${filteredProjects.length} ${filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}`
                            )}
                        </p>
                    </div>

                    {/* Projects Grid */}
                    {paginatedProjects.length > 0 ? (
                        <div className="grid grid-cols-4 gap-6 mb-12 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
                            {paginatedProjects.map(project => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Project Image */}
                                    <div className="relative h-48 overflow-hidden bg-secondary-100">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
                                                {statusLabels[project.status]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-secondary-900 mb-2 line-clamp-2">
                                            {project.title}
                                        </h3>

                                        <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Keywords */}
                                        {project.keywords && project.keywords.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.keywords.slice(0, 3).map(keyword => (
                                                    <span
                                                        key={keyword}
                                                        className="px-2 py-1 bg-primary-50 text-primary-600 rounded text-xs font-medium"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                                {project.keywords.length > 3 && (
                                                    <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs font-medium">
                                                        +{project.keywords.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                                            <div className="flex items-center gap-2 text-sm text-secondary-600">
                                                <Users size={16} />
                                                <span>{project.participants} participantes</span>
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="small"
                                                onClick={() => navigate(`/projetos/${project.id}`)}
                                            >
                                                Ver Detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-secondary-600 text-lg mb-4">
                                Nenhum projeto encontrado com os filtros selecionados.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCourse('');
                                    setSelectedStatus('');
                                    setSelectedKeyword('');
                                    setCurrentPage(1);
                                }}
                            >
                                Limpar Filtros
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronLeft size={20} className="text-secondary-700" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`
                    px-4 py-2 rounded-lg font-semibold transition
                    ${currentPage === page
                                            ? 'bg-primary-500 text-white'
                                            : 'hover:bg-secondary-100 text-secondary-900'
                                        }
                  `}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronRight size={20} className="text-secondary-700" />
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PublicProjectsPage;
