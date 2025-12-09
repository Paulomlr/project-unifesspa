import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './SubmitProjectPage.module.css';

const SubmitProjectPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('New project data:', data);
        alert('Projeto submetido com sucesso! Aguarde a aprovação.');
        navigate('/dashboard/projetos');
    };

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Novo Projeto</h1>
                    <p className={styles.subtitle}>Cadastre um novo projeto de extensão</p>
                </div>

                <Card className={styles.formCard}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.formRow}>
                            <Input
                                label="Título do Projeto"
                                name="title"
                                placeholder="Ex: Inclusão Digital na Comunidade"
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

                            <Input
                                label="Coordenador"
                                name="coordinator"
                                placeholder="Nome do coordenador"
                                register={register}
                                required
                            />
                        </div>

                        <div className={styles.formRow}>
                            <Input
                                label="Data de Início Prevista"
                                name="startDate"
                                type="date"
                                register={register}
                                required
                            />
                            <Input
                                label="Data de Término Prevista"
                                name="endDate"
                                type="date"
                                register={register}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Descrição Detalhada *</label>
                            <textarea
                                {...register('description', { required: true })}
                                className={styles.textarea}
                                placeholder="Descreva os objetivos, metodologia e público-alvo do projeto..."
                                rows={6}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Imagem de Capa</label>
                            <div className={styles.fileInputContainer}>
                                <input type="file" className={styles.fileInput} />
                                <span className={styles.fileHelp}>Formatos aceitos: JPG, PNG. Máx: 5MB</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/projetos')}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary">
                                Submeter Projeto
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
};

export default SubmitProjectPage;
