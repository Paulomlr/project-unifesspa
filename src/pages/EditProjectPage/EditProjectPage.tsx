import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './EditProjectPage.module.css';

interface EditProjectForm {
    title: string;
    category: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
}

const EditProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditProjectForm>();

    useEffect(() => {
        if (id) {
            const project = getProjectById(id);
            if (project) {
                reset({
                    title: project.title,
                    category: project.category,
                    status: project.status,
                    startDate: project.startDate,
                    endDate: project.endDate,
                    description: project.description,
                });
            }
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<EditProjectForm> = (data) => {
        console.log('Updated project data:', data);
        alert('Projeto atualizado com sucesso!');
        navigate('/dashboard/projetos');
    };

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Editar Projeto</h1>
                    <p className={styles.subtitle}>Atualize as informações do projeto</p>
                </div>

                <Card className={styles.formCard}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.formRow}>
                            <Input
                                label="Título do Projeto"
                                name="title"
                                register={register}
                                error={errors.title}
                                required
                                className={styles.fullWidth}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Categoria *</label>
                                <select
                                    {...register('category', { required: true })}
                                    className={styles.select}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Educação">Educação</option>
                                    <option value="Tecnologia">Tecnologia</option>
                                    <option value="Meio Ambiente">Meio Ambiente</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Urbanismo">Urbanismo</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Status *</label>
                                <select
                                    {...register('status', { required: true })}
                                    className={styles.select}
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="em_andamento">Em Andamento</option>
                                    <option value="planejamento">Planejamento</option>
                                    <option value="finalizado">Finalizado</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <Input
                                label="Data de Início"
                                name="startDate"
                                type="date"
                                register={register}
                                required
                            />
                            <Input
                                label="Data de Término"
                                name="endDate"
                                type="date"
                                register={register}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Descrição *</label>
                            <textarea
                                {...register('description', { required: true })}
                                className={styles.textarea}
                                rows={5}
                            />
                        </div>

                        <div className={styles.actions}>
                            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/projetos')}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary">
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
};

export default EditProjectPage;
