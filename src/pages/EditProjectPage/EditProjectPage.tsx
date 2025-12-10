import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

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
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto max-md:p-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[2rem] font-extrabold text-[var(--color-text)] mb-2">
                        Editar Projeto
                    </h1>
                    <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                        Atualize as informações do projeto
                    </p>
                </div>

                <Card className="bg-white p-8 max-w-[800px]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        {/* Título (linha fullWidth) */}
                        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                            <Input
                                label="Título do Projeto"
                                name="title"
                                register={register}
                                error={errors.title}
                                required
                                className="col-span-2 max-md:col-span-1"
                            />
                        </div>

                        {/* Categoria e Status */}
                        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-[var(--color-text)] text-xs">
                                    Categoria *
                                </label>
                                <select
                                    {...register('category', { required: true })}
                                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg text-base bg-white cursor-pointer transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Educação">Educação</option>
                                    <option value="Tecnologia">Tecnologia</option>
                                    <option value="Meio Ambiente">Meio Ambiente</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Urbanismo">Urbanismo</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-[var(--color-text)] text-xs">
                                    Status *
                                </label>
                                <select
                                    {...register('status', { required: true })}
                                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg text-base bg-white cursor-pointer transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="em_andamento">Em Andamento</option>
                                    <option value="planejamento">Planejamento</option>
                                    <option value="finalizado">Finalizado</option>
                                </select>
                            </div>
                        </div>

                        {/* Datas */}
                        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
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

                        {/* Descrição */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-[var(--color-text)] text-xs">
                                Descrição *
                            </label>
                            <textarea
                                {...register('description', { required: true })}
                                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg text-base resize-y transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                rows={5}
                            />
                        </div>

                        {/* Ações */}
                        <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-[var(--color-border)]">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/dashboard/projetos')}
                            >
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
