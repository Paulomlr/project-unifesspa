import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = (data) => {
    // Mock user registration
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department || '',
      course: data.course || '',
      photo: '/src/assets/images/profile_photo.png',
      projects: [],
    };

    // Auto login after registration
    login(newUser);

    // Redirect based on role
    if (newUser.role === 'aluno') {
      navigate('/aluno/projetos');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.registerPage}>
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
          <p className={styles.brandSubtitle}>Junte-se à nossa comunidade</p>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Crie sua conta</h2>
          <p className={styles.formSubtitle}>Preencha os dados abaixo para começar</p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              label="Nome Completo"
              name="name"
              type="text"
              placeholder="Seu nome completo"
              register={register}
              error={errors.name}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="seu.email@unifesspa.edu.br"
              register={register}
              error={errors.email}
              required
            />

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tipo de Usuário *</label>
                <select
                  {...register('role', { required: true })}
                  className={styles.select}
                >
                  <option value="">Selecione...</option>
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>
                </select>
                {errors.role && <span className={styles.error}>Campo obrigatório</span>}
              </div>

              <Input
                label="Curso/Departamento"
                name="department"
                type="text"
                placeholder="Ex: Ciência da Computação"
                register={register}
              />
            </div>

            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              register={register}
              error={errors.password}
              required
            />

            <Input
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              placeholder="Digite novamente a senha"
              register={register}
              error={errors.confirmPassword}
              required
            />

            <div className={styles.terms}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  {...register('terms', { required: true })}
                  className={styles.checkbox}
                />
                Eu aceito os termos de uso e política de privacidade
              </label>
              {errors.terms && <span className={styles.error}>Você deve aceitar os termos</span>}
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Criar Conta
            </Button>
          </form>

          <div className={styles.formFooter}>
            <p>Já tem uma conta? <a href="/login" className={styles.loginLink}>Faça login</a></p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default RegisterPage;
