import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-white space-y-8">
            {/* Logo & Title */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                <img
                  src="/src/assets/logos/logo.png"
                  alt="Conecta Unifesspa"
                  className="h-12 w-auto"
                />
                <div>
                  <h1 className="text-2xl font-extrabold">Conecta Unifesspa</h1>
                  <p className="text-sm text-gray-300">Plataforma de Extensão</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  Acesso para <span className="text-primary-400">Professores</span> e <span className="text-primary-400">Administradores</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Gerencie projetos de extensão e conecte-se com a comunidade acadêmica da UNIFESSPA.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            {/* Form Header */}
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
                Bem-vindo!
              </h3>
              <p className="text-gray-600">
                Entre com suas credenciais institucionais
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Institucional
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="seu.email@unifesspa.edu.br"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.email.message || 'Email é obrigatório'}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register('password', { required: true })}
                    placeholder="Digite sua senha"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    Senha é obrigatória
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" fullWidth size="large">
                <span className="flex items-center justify-center gap-2">
                  Entrar
                  <ArrowRight size={20} />
                </span>
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-xl">
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-bold text-primary-700">💡 Demo:</span> Use qualquer email do sistema
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-600">Senha:</span>
                <code className="px-3 py-1 bg-white rounded-lg text-primary-700 font-mono text-sm border border-primary-300 font-bold">
                  senha123
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;