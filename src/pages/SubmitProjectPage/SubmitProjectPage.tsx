import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, Info, AlertCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import { mockCourses } from '../../services/mockData';
import { useAuth } from '../../hooks/useAuth';

interface SubmitProjectForm {
    title: string;
    course: string;
    startDate: string;
    duration: number;
    description: string;
    results: string;
    file: FileList;
}

const SubmitProjectPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<SubmitProjectForm>();

    const onSubmit = (data: SubmitProjectForm) => {
        console.log('Project Data:', { ...data, coordinator: user?.name });
        // Here would be the API call to save the project
        alert('Projeto submetido com sucesso!');
        navigate('/dashboard/projetos');
    };

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Novo Projeto de Extensão
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Preencha as informações abaixo para submeter uma nova proposta.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] p-8 space-y-8">

                                {/* Basic Info Section */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <FileText className="text-primary-500" size={24} />
                                        Informações Básicas
                                    </h2>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Título do Projeto
                                            </label>
                                            <input
                                                {...register('title', { required: 'O título é obrigatório' })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                                placeholder="Ex: Inclusão Digital para Idosos"
                                            />
                                            {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Curso Vinculado
                                                </label>
                                                <select
                                                    {...register('course', { required: 'Selecione um curso' })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none bg-white"
                                                >
                                                    <option value="">Selecione...</option>
                                                    {mockCourses.map(course => (
                                                        <option key={course.id} value={course.name}>{course.name}</option>
                                                    ))}
                                                </select>
                                                {errors.course && <span className="text-red-500 text-sm mt-1">{errors.course.message}</span>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Coordenador Responsável
                                                </label>
                                                <input
                                                    value={user?.name || 'Usuário não identificado'}
                                                    disabled
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">O coordenador é definido automaticamente.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <CheckCircle className="text-primary-500" size={24} />
                                        Detalhes da Execução
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Data de Início Prevista
                                            </label>
                                            <input
                                                type="date"
                                                {...register('startDate', { required: 'Data de início é obrigatória' })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                            />
                                            {errors.startDate && <span className="text-red-500 text-sm mt-1">{errors.startDate.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Duração (meses)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                {...register('duration', { required: 'Duração é obrigatória', min: 1 })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                                placeholder="Ex: 12"
                                            />
                                            {errors.duration && <span className="text-red-500 text-sm mt-1">{errors.duration.message}</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Descrição Completa
                                        </label>
                                        <textarea
                                            {...register('description', { required: 'Descrição é obrigatória' })}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none resize-none"
                                            placeholder="Descreva os objetivos, metodologia e público-alvo do projeto..."
                                        />
                                        {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Resultados Esperados
                                        </label>
                                        <textarea
                                            {...register('results', { required: 'Resultados esperados são obrigatórios' })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none resize-none"
                                            placeholder="Quais impactos e resultados são esperados com este projeto?"
                                        />
                                        {errors.results && <span className="text-red-500 text-sm mt-1">{errors.results.message}</span>}
                                    </div>
                                </div>

                                {/* File Upload Section */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <Upload className="text-primary-500" size={24} />
                                        Documentação
                                    </h2>

                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50 transition cursor-pointer group">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept=".pdf,.doc,.docx"
                                            {...register('file', { required: 'O arquivo do projeto é obrigatório' })}
                                            className="hidden"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                            <div className="w-16 h-16 bg-blue-50 text-primary-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                                <Upload size={32} />
                                            </div>
                                            <span className="text-lg font-semibold text-gray-700 mb-1">Clique para fazer upload</span>
                                            <span className="text-sm text-gray-500">ou arraste e solte o arquivo aqui</span>
                                            <span className="text-xs text-gray-400 mt-2">PDF, DOC ou DOCX (Máx. 10MB)</span>
                                        </label>
                                        {errors.file && <span className="text-red-500 text-sm mt-2 block">{errors.file.message}</span>}
                                    </div>
                                </div>

                                <div className="pt-6 flex items-center justify-end gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate('/dashboard/perfil')}
                                        className="flex-1"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="px-8"
                                    >
                                        Submeter Projeto
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar Info Section */}
                        <div className="space-y-6">
                            {/* Guidelines Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Info size={20} className="text-blue-500" />
                                    Diretrizes de Submissão
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>Certifique-se de que o projeto está alinhado com as diretrizes de extensão da universidade.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>O arquivo anexo deve conter o detalhamento completo, incluindo cronograma e orçamento.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>Projetos com duração superior a 12 meses requerem aprovação especial.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <AlertCircle size={20} />
                                    Precisa de Ajuda?
                                </h3>
                                <p className="text-sm text-blue-700 mb-4">
                                    Se tiver dúvidas sobre o preenchimento ou documentação necessária, consulte o manual ou entre em contato.
                                </p>
                                <button className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline">
                                    Baixar Manual de Extensão &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubmitProjectPage;
