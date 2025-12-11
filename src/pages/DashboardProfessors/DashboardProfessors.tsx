import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Pencil, Trash2, User, Mail, Lock, Plus, AlertCircle, Save, Search } from 'lucide-react';
import { mockUsers } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { User as UserType } from '../../types';

interface AddProfessorForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface EditProfessorForm {
    name: string;
    email: string;
}

const DashboardProfessors = () => {
    const [professors, setProfessors] = useState(mockUsers.filter(u => u.role === 'teacher'));
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState<UserType | null>(null);

    // Forms
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        reset: resetAdd,
        formState: { errors: errorsAdd }
    } = useForm<AddProfessorForm>();

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        setValue: setValueEdit,
        formState: { errors: errorsEdit }
    } = useForm<EditProfessorForm>();

    // Handlers
    const handleOpenAdd = () => {
        resetAdd();
        setIsAddModalOpen(true);
    };

    const handleOpenEdit = (professor: UserType) => {
        setSelectedProfessor(professor);
        setValueEdit('name', professor.name);
        setValueEdit('email', professor.email);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este professor?')) {
            setProfessors(professors.filter(p => p.id !== id));
        }
    };

    const onSubmitAdd: SubmitHandler<AddProfessorForm> = (data) => {
        if (data.password !== data.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const newProfessor: UserType = {
            id: Date.now(),
            name: data.name,
            email: data.email,
            role: 'teacher',
            department: '',
            course: '',
            photo: '/src/assets/images/profile_photo.png',
            projects: [],
        };

        setProfessors([...professors, newProfessor]);
        setIsAddModalOpen(false);
        resetAdd();
        alert('Professor cadastrado com sucesso!');
    };

    const onSubmitEdit: SubmitHandler<EditProfessorForm> = (data) => {
        if (!selectedProfessor) return;

        const updatedProfessors = professors.map(p =>
            p.id === selectedProfessor.id ? { ...p, name: data.name, email: data.email } : p
        );
        setProfessors(updatedProfessors);
        setIsEditModalOpen(false);
        alert('Professor atualizado com sucesso!');
    };

    const filteredProfessors = professors.filter((professor) =>
        professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Professores
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Gerencie os professores cadastrados no sistema
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleOpenAdd}
                        className="flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Novo Professor
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
                                placeholder="Buscar professor..."
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
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Nome
                                    </th>
                                    <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                        Email
                                    </th>
                                    <th className="text-center px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em] w-32">
                                        Editar
                                    </th>
                                    <th className="text-center px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em] w-32">
                                        Excluir
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProfessors.map((professor) => (
                                    <tr key={professor.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-medium">{professor.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text-secondary)]">
                                            {professor.email}
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-center">
                                            <button
                                                className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-gray-500 hover:text-[var(--color-primary)]"
                                                onClick={() => handleOpenEdit(professor)}
                                                title="Editar"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-center">
                                            <button
                                                className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-500 text-gray-500 hover:text-red-500"
                                                onClick={() => handleDelete(professor.id)}
                                                title="Excluir"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProfessors.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            Nenhum professor encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>

            {/* Add Professor Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Novo Professor"
                className="!max-w-md !rounded-3xl overflow-hidden"
            >
                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="text-primary-500" size={32} />
                    </div>
                    <p className="text-gray-500 text-sm">
                        Preencha os dados para cadastrar um novo professor.
                    </p>
                </div>

                <form onSubmit={handleSubmitAdd(onSubmitAdd)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Nome Completo
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <input
                                {...registerAdd('name', { required: 'O nome é obrigatório' })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Ex: João Silva"
                            />
                        </div>
                        {errorsAdd.name && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsAdd.name.message}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Email Institucional
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <input
                                {...registerAdd('email', { required: 'O email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="professor@unifesspa.edu.br"
                            />
                        </div>
                        {errorsAdd.email && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsAdd.email.message}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Senha
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <input
                                type="password"
                                {...registerAdd('password', { required: 'A senha é obrigatória', minLength: { value: 6, message: 'Mínimo de 6 caracteres' } })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                        {errorsAdd.password && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsAdd.password.message}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Confirme a Senha
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <input
                                type="password"
                                {...registerAdd('confirmPassword', { required: 'A confirmação é obrigatória' })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                        {errorsAdd.confirmPassword && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsAdd.confirmPassword.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="!rounded-xl flex-1 py-3"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="!rounded-xl flex-1 py-3 shadow-lg shadow-primary-500/20"
                        >
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Professor Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Professor"
                className="!max-w-md !rounded-3xl overflow-hidden"
            >
                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Pencil className="text-blue-500" size={28} />
                    </div>
                    <p className="text-gray-500 text-sm">
                        Atualize as informações do professor.
                    </p>
                </div>

                <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Nome Completo
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                {...registerEdit('name', { required: 'O nome é obrigatório' })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Ex: João Silva"
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
                            Email Institucional
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                {...registerEdit('email', { required: 'O email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="professor@unifesspa.edu.br"
                            />
                        </div>
                        {errorsEdit.email && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsEdit.email.message}</span>
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

export default DashboardProfessors;
