import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Link as LinkIcon, Image as ImageIcon, FileText, Type, Activity } from 'lucide-react';
import { mockProjects } from '../../services/mockData';
import { Project } from '../../types';
import Sidebar from '../../components/Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';

interface EditProjectForm {
    subtitle: string;
    overview: string;
    subscriptionFormUrl: string;
    image: string;
    status: 'ACTIVE' | 'FINISHED';
}

const EditProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditProjectForm>();

    useEffect(() => {
        const foundProject = mockProjects.find(p => p.id === Number(id));
        if (foundProject) {
            setProject(foundProject);
            // Pre-fill form with existing data or empty strings
            setValue('subtitle', foundProject.subtitle || '');
            setValue('overview', foundProject.overview || '');
            setValue('subscriptionFormUrl', foundProject.subscriptionFormUrl || '');
            setValue('image', foundProject.image || '');
            // Only allow setting status if it's already ACTIVE or APPROVED (which becomes ACTIVE)
            if (foundProject.status === 'ACTIVE' || foundProject.status === 'FINISHED') {
                setValue('status', foundProject.status as 'ACTIVE' | 'FINISHED');
            } else {
                setValue('status', 'ACTIVE'); // Default to ACTIVE if currently APPROVED
            }
        } else {
            navigate('/dashboard/perfil');
        }
    }, [id, navigate, setValue]);

    const onSubmit: SubmitHandler<EditProjectForm> = (data) => {
        if (!project) return;

        console.log('Updated Project Data:', { ...project, ...data });
        // Here would be the API call to update the project
        alert('Projeto atualizado com sucesso!');
        navigate('/dashboard/perfil');
    };

    if (!project) return null;

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/dashboard/perfil')}
                            className="!p-2 rounded-full w-10 h-10 flex items-center justify-center"
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-1">
                                Editar Projeto
                            </h1>
                            <p className="text-[var(--color-text-secondary)]">
                                Complete as informações do seu projeto
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                        {/* Main Form */}
                        <div className="space-y-6">
                            <Card className="bg-white border border-[var(--color-border)] shadow-sm p-8">
                                <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
                                    <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
                                        {project.title}
                                    </h2>
                                    <p className="text-[var(--color-text-secondary)]">
                                        {project.description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Subtitle */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Subtítulo do Projeto
                                        </label>
                                        <div className="relative group">
                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
                                            <input
                                                {...register('subtitle', { required: 'O subtítulo é obrigatório' })}
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-[var(--color-text)] placeholder:text-gray-400"
                                                placeholder="Uma frase de impacto sobre o projeto"
                                            />
                                        </div>
                                        {errors.subtitle && (
                                            <span className="text-red-500 text-sm ml-1 mt-1 block">{errors.subtitle.message}</span>
                                        )}
                                    </div>

                                    {/* Overview */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Visão Geral (Overview)
                                        </label>
                                        <div className="relative group">
                                            <FileText className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
                                            <textarea
                                                {...register('overview', { required: 'A visão geral é obrigatória' })}
                                                rows={5}
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-[var(--color-text)] placeholder:text-gray-400 resize-none"
                                                placeholder="Descreva detalhadamente os objetivos e o impacto do projeto..."
                                            />
                                        </div>
                                        {errors.overview && (
                                            <span className="text-red-500 text-sm ml-1 mt-1 block">{errors.overview.message}</span>
                                        )}
                                    </div>

                                    {/* Subscription Form URL */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Link do Formulário de Inscrição
                                        </label>
                                        <div className="relative group">
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
                                            <input
                                                {...register('subscriptionFormUrl', {
                                                    required: 'O link é obrigatório',
                                                    pattern: {
                                                        value: /^(http|https):\/\/[^ "]+$/,
                                                        message: 'Insira uma URL válida (começando com http:// ou https://)'
                                                    }
                                                })}
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-[var(--color-text)] placeholder:text-gray-400"
                                                placeholder="https://forms.google.com/..."
                                            />
                                        </div>
                                        {errors.subscriptionFormUrl && (
                                            <span className="text-red-500 text-sm ml-1 mt-1 block">{errors.subscriptionFormUrl.message}</span>
                                        )}
                                    </div>

                                    {/* Project Image Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Imagem de Capa
                                        </label>
                                        <div className="relative group">
                                            <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group-focus-within:border-[var(--color-primary)] group-focus-within:bg-[var(--color-primary)]/5">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            // For now, we just mock the URL or handle it as needed
                                                            // In a real app, we would upload this file
                                                            console.log('File selected:', file);
                                                            setValue('image', URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                                                    <ImageIcon className="text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" size={24} />
                                                </div>
                                                <p className="text-sm font-medium text-[var(--color-text)] mb-1">
                                                    Clique para fazer upload ou arraste e solte
                                                </p>
                                                <p className="text-xs text-[var(--color-text-secondary)]">
                                                    SVG, PNG, JPG ou GIF (max. 800x400px)
                                                </p>
                                            </div>
                                            {/* Hidden input to store the value for react-hook-form validation if needed, 
                                                though for file uploads we usually handle it differently. 
                                                Keeping the original input hidden or using a different approach for validation. 
                                            */}
                                            <input
                                                type="hidden"
                                                {...register('image', { required: 'A imagem é obrigatória' })}
                                            />
                                        </div>
                                        {errors.image && (
                                            <span className="text-red-500 text-sm ml-1 mt-1 block">{errors.image.message}</span>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Status do Projeto
                                        </label>
                                        <div className="relative group">
                                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
                                            <select
                                                {...register('status')}
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-[var(--color-text)] appearance-none cursor-pointer"
                                            >
                                                <option value="ACTIVE">Ativo</option>
                                                <option value="FINISHED">Finalizado</option>
                                            </select>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-secondary)] mt-2 ml-1">
                                            Você pode alterar o status para "Finalizado" quando o projeto for concluído.
                                        </p>
                                    </div>

                                    <div className="pt-4 flex justify-end gap-4">
                                        <Button
                                            variant="outline"
                                            type="button"
                                            onClick={() => navigate('/dashboard/perfil')}
                                            className="!rounded-xl px-8"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="!rounded-xl px-8 shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2"
                                        >
                                            <Save size={20} />
                                            Salvar Alterações
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </div>

                        {/* Sidebar / Guidelines */}
                        <div className="space-y-6">
                            <Card className="bg-blue-50 border border-blue-100 p-6">
                                <h3 className="text-lg font-bold text-blue-800 mb-3">
                                    Dicas de Preenchimento
                                </h3>
                                <ul className="space-y-3 text-sm text-blue-700">
                                    <li className="flex gap-2">
                                        <span className="font-bold">•</span>
                                        <span>O <strong>Subtítulo</strong> deve ser curto e impactante, resumindo a essência do projeto.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold">•</span>
                                        <span>Na <strong>Visão Geral</strong>, detalhe como o projeto funciona, quem pode participar e quais são os benefícios.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold">•</span>
                                        <span>Use uma <strong>Imagem</strong> de alta qualidade que represente bem o projeto.</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditProjectPage;
