import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, Search, BookOpen, Plus, AlertCircle, Save } from 'lucide-react';
import { mockCourses } from '../../services/mockData';
import { Course } from '../../types';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

interface CreateCourseForm {
    name: string;
}

interface EditCourseForm {
    name: string;
    confirmName: string;
}

const DashboardCourses = () => {
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Forms
    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: { errors: errorsCreate }
    } = useForm<CreateCourseForm>();

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        setValue: setValueEdit,
        watch: watchEdit,
        formState: { errors: errorsEdit }
    } = useForm<EditCourseForm>();

    // Handlers
    const handleOpenCreate = () => {
        resetCreate();
        setIsCreateModalOpen(true);
    };

    const handleOpenEdit = (course: Course) => {
        setSelectedCourse(course);
        setValueEdit('name', course.name);
        setValueEdit('confirmName', ''); // Reset confirmation
        setIsEditModalOpen(true);
    };

    const onSubmitCreate = (data: CreateCourseForm) => {
        const newCourse: Course = {
            id: courses.length + 1, // Simple ID generation
            name: data.name,
        };
        setCourses([...courses, newCourse]);
        setIsCreateModalOpen(false);
        alert('Curso criado com sucesso!');
    };

    const onSubmitEdit = (data: EditCourseForm) => {
        if (!selectedCourse) return;

        const updatedCourses = courses.map(c =>
            c.id === selectedCourse.id ? { ...c, name: data.name } : c
        );
        setCourses(updatedCourses);
        setIsEditModalOpen(false);
        alert('Curso atualizado com sucesso!');
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Gerenciar Cursos
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Visualize e gerencie os cursos cadastrados
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleOpenCreate}
                        className="flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Novo Curso
                    </Button>
                </div>

                {/* Content Card */}
                <Card className="bg-white p-0 overflow-hidden border border-[var(--color-border)] shadow-sm">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-[var(--color-border)]">
                        <div className="relative max-w-[400px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar curso..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-[var(--color-border)] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em] w-20">
                                        ID
                                    </th>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Nome do Curso
                                    </th>
                                    <th className="text-center px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em] w-32">
                                        Editar
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text-secondary)] font-mono text-sm">
                                            #{course.id}
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <BookOpen size={16} />
                                                </div>
                                                <span className="font-medium">{course.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-center">
                                            <button
                                                className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-gray-500 hover:text-[var(--color-primary)]"
                                                onClick={() => handleOpenEdit(course)}
                                                title="Editar"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCourses.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                            Nenhum curso encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>

            {/* Create Course Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Novo Curso"
                className="!max-w-md !rounded-3xl overflow-hidden"
            >
                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-primary-500" size={32} />
                    </div>
                    <p className="text-gray-500 text-sm">
                        Preencha as informações abaixo para adicionar um novo curso à plataforma.
                    </p>
                </div>

                <form onSubmit={handleSubmitCreate(onSubmitCreate)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Nome do Curso
                        </label>
                        <div className="relative group">
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <input
                                {...registerCreate('name', { required: 'O nome do curso é obrigatório' })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Ex: Engenharia de Software"
                            />
                        </div>
                        {errorsCreate.name && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsCreate.name.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="!rounded-xl flex-1 py-3"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="!rounded-xl flex-1 py-3 shadow-lg shadow-primary-500/20"
                        >
                            Criar Curso
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Course Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Curso"
                className="!max-w-md !rounded-3xl overflow-hidden"
            >
                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Pencil className="text-blue-500" size={28} />
                    </div>
                    <p className="text-gray-500 text-sm">
                        Atualize o nome do curso. É necessário confirmar o novo nome para salvar.
                    </p>
                </div>

                <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Nome do Curso
                        </label>
                        <div className="relative group">
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                {...registerEdit('name', { required: 'O nome do curso é obrigatório' })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Ex: Engenharia de Software"
                            />
                        </div>
                        {errorsEdit.name && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsEdit.name.message}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Confirme o Nome
                        </label>
                        <div className="relative group">
                            <Save className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                {...registerEdit('confirmName', {
                                    required: 'A confirmação do nome é obrigatória',
                                    validate: (val) => {
                                        if (watchEdit('name') != val) {
                                            return "Os nomes não coincidem";
                                        }
                                    }
                                })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Digite o nome novamente"
                            />
                        </div>
                        {errorsEdit.confirmName && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsEdit.confirmName.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="!rounded-xl flex-1 py-3"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="!rounded-xl flex-1 py-3 shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            Salvar
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DashboardCourses;