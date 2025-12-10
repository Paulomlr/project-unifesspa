import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Pencil, Trash2 } from 'lucide-react';
import { mockUsers } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import { User } from '../../types';

interface AddProfessorForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const DashboardProfessors = () => {
    const [professors, setProfessors] = useState(mockUsers.filter(u => u.role === 'professor'));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddProfessorForm>();

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este professor?')) {
            setProfessors(professors.filter(p => p.id !== id));
        }
    };

    const onSubmit: SubmitHandler<AddProfessorForm> = (data) => {
        if (data.password !== data.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const newProfessor: User = {
            id: Date.now(),
            name: data.name,
            email: data.email,
            role: 'professor',
            department: '',
            course: '',
            photo: '/src/assets/images/profile_photo.png',
            projects: [],
        };

        setProfessors([...professors, newProfessor]);
        setIsModalOpen(false);
        reset();
        alert('Professor cadastrado com sucesso!');
    };

    return (
        <div className="flex min-h-screen bg-secondary-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-secondary-800 mb-2">
                            Professores
                        </h1>
                        <p className="text-lg text-secondary-600">
                            Cadastre os professores no sistema. Repasse o login para a pessoa responsável.
                        </p>
                    </div>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        Adicionar
                    </Button>
                </div>

                {/* Professors Table */}
                <Card className="bg-white overflow-hidden rounded-xl">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-secondary-200">
                        <h2 className="text-xl font-semibold text-secondary-800 m-0">
                            Lista de professores
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-secondary-50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Nome
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Email
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Edição
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Deletar
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map((professor) => (
                                    <tr key={professor.id} className="border-b border-secondary-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <span className="font-semibold text-secondary-800">
                                                    {professor.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-secondary-800">{professor.email}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="w-8 h-8 rounded-md border border-secondary-300 bg-white flex items-center justify-center text-secondary-600 hover:border-primary-500 hover:bg-primary-50 transition"
                                                title="Editar"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="w-8 h-8 rounded-md border border-secondary-300 bg-white flex items-center justify-center text-error hover:border-error hover:bg-error/10 transition"
                                                onClick={() => handleDelete(professor.id)}
                                                title="Excluir"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Adicione um novo professor"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input
                        label="Nome"
                        name="name"
                        register={register}
                        error={errors.name}
                        required
                        placeholder="Insira o nome completo."
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email}
                        required
                        placeholder="professor@unifesspa.edu.br"
                    />
                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password}
                        required
                    />
                    <Input
                        label="Confirme a senha"
                        name="confirmPassword"
                        type="password"
                        register={register}
                        error={errors.confirmPassword}
                        required
                    />

                    <div className="mt-4 flex justify-end">
                        <Button type="submit" variant="primary">
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DashboardProfessors;
