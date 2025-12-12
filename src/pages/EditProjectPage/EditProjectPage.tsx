import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Link as LinkIcon, Image as ImageIcon, FileText, Type, Activity, X, Plus, Tag, TrendingUp } from 'lucide-react';
import { mockProjects } from '../../services/mockData';
import { Project } from '../../types';
import Sidebar from '../../components/Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';

interface ImpactIndicator {
    title: string;
    value: string;
}

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

    // Keywords state
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState('');

    // Impact Indicators state
    const [impactIndicators, setImpactIndicators] = useState<ImpactIndicator[]>([]);
    const [newIndicator, setNewIndicator] = useState<ImpactIndicator>({ title: '', value: '' });

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

            // Set keywords
            setKeywords(foundProject.keywords || []);

            // Set impact indicators (convert from object to array)
            if (foundProject.impactMetrics) {
                const indicators: ImpactIndicator[] = [];
                if (foundProject.impactMetrics.membersServed) {
                    indicators.push({ title: 'Membros da comunidade atendidos', value: String(foundProject.impactMetrics.membersServed) });
                }
                if (foundProject.impactMetrics.workshopsHeld) {
                    indicators.push({ title: 'Oficinas realizadas', value: String(foundProject.impactMetrics.workshopsHeld) });
                }
                if (foundProject.impactMetrics.volunteerHours) {
                    indicators.push({ title: 'Horas de voluntariado contribuídas', value: String(foundProject.impactMetrics.volunteerHours) });
                }
                setImpactIndicators(indicators);
            }

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

    const handleAddKeyword = () => {
        const trimmedKeyword = keywordInput.trim();
        if (trimmedKeyword && !keywords.includes(trimmedKeyword)) {
            setKeywords([...keywords, trimmedKeyword]);
            setKeywordInput('');
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddKeyword();
        }
    };

    const handleAddIndicator = () => {
        if (newIndicator.title.trim() && newIndicator.value.trim()) {
            setImpactIndicators([...impactIndicators, newIndicator]);
            setNewIndicator({ title: '', value: '' });
        }
    };

    const handleRemoveIndicator = (index: number) => {
        setImpactIndicators(impactIndicators.filter((_, i) => i !== index));
    };

    const onSubmit: SubmitHandler<EditProjectForm> = (data) => {
        if (!project) return;

        const updatedProject = {
            ...project,
            ...data,
            keywords,
            impactMetrics: impactIndicators.length > 0 ? {
                membersServed: impactIndicators.find(i => i.title.toLowerCase().includes('membros'))?.value ? Number(impactIndicators.find(i => i.title.toLowerCase().includes('membros'))?.value) : undefined,
                workshopsHeld: impactIndicators.find(i => i.title.toLowerCase().includes('oficinas'))?.value ? Number(impactIndicators.find(i => i.title.toLowerCase().includes('oficinas'))?.value) : undefined,
                volunteerHours: impactIndicators.find(i => i.title.toLowerCase().includes('voluntariado'))?.value ? Number(impactIndicators.find(i => i.title.toLowerCase().includes('voluntariado'))?.value) : undefined,
            } : undefined
        };

        console.log('Updated Project Data:', updatedProject);
        // Here would be the API call to update the project
        alert('Projeto atualizado com sucesso!');
        navigate('/dashboard/perfil');
    };

    if (!project) return null;

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
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

                                    {/* Keywords */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Palavras-chave
                                        </label>
                                        <div className="space-y-3">
                                            <div className="relative group">
                                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
                                                <input
                                                    type="text"
                                                    value={keywordInput}
                                                    onChange={(e) => setKeywordInput(e.target.value)}
                                                    onKeyPress={handleKeywordKeyPress}
                                                    className="w-full pl-12 pr-24 py-3.5 rounded-xl border border-[var(--color-border)] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-[var(--color-text)] placeholder:text-gray-400"
                                                    placeholder="Digite uma palavra-chave e pressione Enter"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddKeyword}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors text-sm font-medium"
                                                >
                                                    Adicionar
                                                </button>
                                            </div>
                                            {keywords.length > 0 && (
                                                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-[var(--color-border)]">
                                                    {keywords.map((keyword, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--color-primary)]/20"
                                                        >
                                                            #{keyword}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveKeyword(keyword)}
                                                                className="hover:bg-[var(--color-primary)]/20 rounded-full p-0.5 transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Impact Indicators */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 ml-1">
                                            Indicadores de Impacto
                                        </label>
                                        <div className="space-y-3">
                                            {/* Existing Indicators */}
                                            {impactIndicators.length > 0 && (
                                                <div className="space-y-2">
                                                    {impactIndicators.map((indicator, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-[var(--color-border)] group hover:border-[var(--color-primary)]/30 transition-colors"
                                                        >
                                                            <TrendingUp size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                                                            <div className="flex-1 grid grid-cols-[1fr_auto] gap-3">
                                                                <div>
                                                                    <p className="text-sm font-medium text-[var(--color-text)]">{indicator.title}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-lg font-bold text-[var(--color-primary)]">{indicator.value}</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveIndicator(index)}
                                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Add New Indicator */}
                                            <div className="p-4 bg-[var(--color-primary)]/5 border-2 border-dashed border-[var(--color-primary)]/30 rounded-xl">
                                                <p className="text-sm font-semibold text-[var(--color-text)] mb-3">Adicionar Novo Indicador</p>
                                                <div className="grid grid-cols-[1fr_auto_auto] gap-3">
                                                    <input
                                                        type="text"
                                                        value={newIndicator.title}
                                                        onChange={(e) => setNewIndicator({ ...newIndicator, title: e.target.value })}
                                                        placeholder="Título do impacto"
                                                        className="px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={newIndicator.value}
                                                        onChange={(e) => setNewIndicator({ ...newIndicator, value: e.target.value })}
                                                        placeholder="Valor"
                                                        className="w-32 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all outline-none text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddIndicator}
                                                        className="bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                                                    >
                                                        <Plus size={16} />
                                                        Adicionar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
                            <Card className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 p-6">
                                <h3 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                                        <FileText size={16} className="text-white" />
                                    </div>
                                    Dicas de Preenchimento
                                </h3>
                                <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                                    <li className="flex gap-3 items-start">
                                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></span>
                                        <span>O <strong className="text-[var(--color-text)]">Subtítulo</strong> deve ser curto e impactante, resumindo a essência do projeto.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></span>
                                        <span>Na <strong className="text-[var(--color-text)]">Visão Geral</strong>, detalhe como o projeto funciona, quem pode participar e quais são os benefícios.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></span>
                                        <span>Use <strong className="text-[var(--color-text)]">Palavras-chave</strong> relevantes para facilitar a busca do projeto.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></span>
                                        <span>Os <strong className="text-[var(--color-text)]">Indicadores de Impacto</strong> mostram os resultados concretos do projeto.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></span>
                                        <span>Use uma <strong className="text-[var(--color-text)]">Imagem</strong> de alta qualidade que represente bem o projeto.</span>
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
