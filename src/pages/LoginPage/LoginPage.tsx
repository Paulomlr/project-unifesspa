import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockUsers } from '../../services/mockData';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        // Mock login - find user by email
        const user = mockUsers.find(u => u.email === data.email);

        if (user && data.password === 'senha123') { // Mock password
            login(user);
            // Redirect based on role
            if (user.role === 'aluno') {
                navigate('/aluno/projetos');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError('email', { type: 'manual', message: 'Email ou senha incorretos' });
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.imageSection}>
                <img
                    src="/src/assets/images/foto_unifesspa.png"
                    alt="UNIFESSPA Campus"
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay}>
                    <img
                        src="/src/assets/logos/logo.png"
                        alt="UNIFESSPA+"
                        className={styles.logo}
                    />
                    <h1 className={styles.brandTitle}>UNIFESSPA+</h1>
                    <p className={styles.brandSubtitle}>Conectando Projetos e Pessoas</p>
                </div>
            </div>

            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Bem-vindo de volta!</h2>
                    <p className={styles.formSubtitle}>Entre com suas credenciais para acessar sua conta</p>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="seu.email@unifesspa.edu.br"
                            register={register}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Senha"
                            name="password"
                            type="password"
                            placeholder="Digite sua senha"
                            register={register}
                            error={errors.password}
                            required
                        />

                        <div className={styles.formOptions}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" className={styles.checkbox} />
                                Lembrar-me
                            </label>
                            <a href="#" className={styles.forgotLink}>Esqueceu a senha?</a>
                        </div>

                        <Button type="submit" variant="primary" fullWidth>
                            Entrar
                        </Button>
                    </form>

                    <div className={styles.formFooter}>
                        <p>Não tem uma conta? <a href="/cadastro" className={styles.signupLink}>Cadastre-se</a></p>
                    </div>

                    <div className={styles.demoInfo}>
                        <p><strong>Demo:</strong> Use qualquer email do sistema com senha: <code>senha123</code></p>
                        <p>Exemplo: joao.silva@unifesspa.edu.br (Professor) ou pedro.almeida@aluno.unifesspa.edu.br (Aluno)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
