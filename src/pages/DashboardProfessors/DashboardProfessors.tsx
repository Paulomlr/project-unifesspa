import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Pencil, Trash2 } from 'lucide-react';
import { mockUsers } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import styles from './DashboardProfessors.module.css';
import { User } from '../../types';

interface AddProfessorForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const DashboardProfessors = () => {
    // Filter only professors from mock data
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
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Professores</h1>
                        <p className={styles.subtitle}>Cadastre os professores no sistema, Repasse o login para a pessoa responsável.</p>
                    </div>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        Adicionar
                    </Button>
                </div>

                <Card className={styles.contentCard}>
                    <div className={styles.toolbar}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Lista de professores</h2>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Edição</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map((professor) => (
                                    <tr key={professor.id}>
                                        <td>
                                            <div className={styles.userInfo}>
                                                <span className={styles.userName}>{professor.name}</span>
                                            </div>
                                        </td>
                                        <td>{professor.email}</td>
                                        <td>
                                            <button
                                                className={styles.actionButton}
                                                title="Editar"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`${styles.actionButton} ${styles.delete}`}
                                                onClick={() => handleDelete(professor.id)}
                                                title="Excluir"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Adicione um novo professor"
            >
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

                    <div className={styles.modalActions}>
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
