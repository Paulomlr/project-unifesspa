import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockUsers } from '../../services/mockData';
import Button from '../../components/Button/Button';

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
      navigate('/dashboard');
    } else {
      setError('email', { type: 'manual', message: 'Email ou senha incorretos' });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-md text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                <img
                        src="/src/assets/logos/logo.png"
                        alt="Conecta Unifesspa"
                        className="h-10 w-auto"
                    />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold leading-tight">
                Conecta <span className="text-primary-200">Unifesspa</span>
              </h1>
              <p className="text-xl text-primary-100 font-medium">
                Conectando Projetos e Pessoas
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              {[
                'Gerencie seus projetos de extensão',
                'Conecte-se com a comunidade acadêmica',
                'Acompanhe o impacto das suas iniciativas'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-primary-200" />
                  </div>
                  <p className="text-primary-50">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <img
                        src="/src/assets/logos/logo.png"
                        alt="Conecta Unifesspa"
                        className="h-10 w-auto"
                    />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600">
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="seu.email@unifesspa.edu.br"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message || 'Email é obrigatório'}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: true })}
                  placeholder="Digite sua senha"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">Senha é obrigatória</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Lembrar-me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" fullWidth size="large">
              <LogIn size={20} className="mr-2" />
              Entrar
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <a href="/cadastro" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Cadastre-se
              </a>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-primary-700">Demo:</span> Use qualquer email do sistema com senha:{' '}
              <code className="px-2 py-1 bg-white rounded text-primary-700 font-mono text-xs border border-primary-200">
                senha123
              </code>
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Exemplo: joao.silva@unifesspa.edu.br
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;