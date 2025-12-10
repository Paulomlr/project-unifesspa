import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

interface SubmitProjectForm {
    title: string;
    category: string;
    coordinator: string;
    startDate: string;
    endDate: string;
    description: string;
}

const SubmitProjectPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<SubmitProjectForm>();

    const onSubmit: SubmitHandler<SubmitProjectForm> = (data) => {
        console.log('New project data:', data);
        alert('Projeto submetido com sucesso! Aguarde a aprovação.');
        navigate('/dashboard/projetos');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Novo Projeto</h1>
                    <p className="text-gray-600 text-lg">Cadastre um novo projeto de extensão</p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        {/* Título */}
                        <Input
                            label="Título do Projeto"
                            name="title"
                            placeholder="Ex: Inclusão Digital na Comunidade"
                            register={register}
                            error={errors.title}
                            required
                        />

                        {/* Categoria + Coordenador */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="mb-1 font-semibold text-gray-700">Categoria *</label>
                                <select
                                    {...register('category', { required: true })}
                                    className="w-full border border-gray-300 rounded-md p-3 font-sans bg-white cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Educação">Educação</option>
                                    <option value="Tecnologia">Tecnologia</option>
                                    <option value="Meio Ambiente">Meio Ambiente</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Urbanismo">Urbanismo</option>
                                </select>
                            </div>

                            <Input
                                label="Coordenador"
                                name="coordinator"
                                placeholder="Nome do coordenador"
                                register={register}
                                error={errors.coordinator}
                                required
                            />
                        </div>

                        {/* Datas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Data de Início Prevista"
                                name="startDate"
                                type="date"
                                register={register}
                                error={errors.startDate}
                                required
                            />
                            <Input
                                label="Data de Término Prevista"
                                name="endDate"
                                type="date"
                                register={register}
                                error={errors.endDate}
                                required
                            />
                        </div>

                        {/* Descrição */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-700">Descrição Detalhada *</label>
                            <textarea
                                {...register('description', { required: true })}
                                placeholder="Descreva os objetivos, metodologia e público-alvo do projeto..."
                                rows={6}
                                className="w-full border border-gray-300 rounded-md p-3 resize-vertical font-sans transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Imagem de Capa */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-700">Imagem de Capa</label>
                            <div className="border-2 border-dashed border-gray-300 p-8 rounded-md text-center transition hover:border-green-500 hover:bg-green-50">
                                <input type="file" className="mb-2" />
                                <span className="text-xs text-gray-500">Formatos aceitos: JPG, PNG. Máx: 5MB</span>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/projetos')}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary">
                                Submeter Projeto
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SubmitProjectPage;
