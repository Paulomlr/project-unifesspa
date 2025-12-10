import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockUsers } from '../../services/mockData';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const user = mockUsers.find(u => u.email === data.email);

    if (user && data.password === 'senha123') {
      login(user);
      // All authenticated users go to dashboard
      navigate('/dashboard');
    } else {
      setError('email', { type: 'manual', message: 'Email ou senha incorretos' });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Image Section */}
      <div className="relative overflow-hidden hidden lg:block">
        <img
          src="/src/assets/images/foto_unifesspa.png"
          alt="Conecta Unifesspa Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-green-700/95 flex flex-col items-center justify-center p-8 text-white">
          <img
            src="/src/assets/logos/logo.png"
            alt="Conecta Unifesspa"
            className="w-24 mb-6"
          />
          <h1 className="text-5xl font-extrabold mb-2">Conecta Unifesspa</h1>
          <p className="text-xl opacity-95">Conectando Projetos e Pessoas</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-600 mb-8">Entre com suas credenciais para acessar sua conta</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

            <div className="flex justify-between items-center -my-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                Lembrar-me
              </label>
              <a href="#" className="text-sm font-semibold text-green-600 hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Entrar
            </Button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-gray-200 text-gray-600">
            <p>
              Não tem uma conta?{' '}
              <a href="/cadastro" className="text-green-600 font-semibold hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>

          <div className="mt-8 p-4 bg-green-100 rounded-md text-gray-600 text-sm">
            <p>
              <strong>Demo:</strong> Use qualquer email do sistema com senha: <code className="bg-gray-200 px-1 py-0.5 rounded">senha123</code>
            </p>
            <p>Exemplo: joao.silva@unifesspa.edu.br (Professor)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;