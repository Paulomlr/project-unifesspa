import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button/Button';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-[100]">
            <div
                className="
                    max-w-[1400px] mx-auto 
                    px-4 md:px-8 py-4 
                    flex items-center justify-between gap-8 
                    flex-wrap md:flex-nowrap
                "
            >
                {/* LOGO */}
                <Link
                    to="/"
                    className="
                        flex items-center gap-3 
                        no-underline 
                        transition-transform duration-200 
                        hover:scale-105
                    "
                >
                    <img
                        src="/src/assets/logos/logo.png"
                        alt="Conecta Unifesspa"
                        className="h-10 w-auto"
                    />
                    <span className="text-2xl md:text-[1.5rem] font-extrabold text-green-500">
                        Conecta Unifesspa
                    </span>
                </Link>

                {/* NAVIGATION */}
                <nav
                    className="
                        flex items-center gap-8 justify-center flex-1 
                        order-3 w-full pt-4 border-t md:border-none 
                        md:order-none md:w-auto md:pt-0 
                        md:justify-center 
                        border-gray-300/40 md:border-0
                    "
                >
                    {["Home", "Sobre", "Projetos", "Contato"].map((label, i) => (
                        <Link
                            key={i}
                            to={`/${label === "Home" ? "" : label.toLowerCase()}`}
                            className="
                                relative text-gray-800 font-semibold text-base no-underline
                                transition-colors duration-200
                                hover:text-green-500
                                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                                after:h-[2px] after:w-0 after:bg-green-500 
                                after:transition-all after:duration-300
                                hover:after:w-full
                            "
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* ACTIONS */}
                <div className="flex items-center gap-4 ml-auto">
                    {isAuthenticated ? (
                        <>
                            <span className="font-semibold text-gray-800 hidden md:inline">
                                Olá, {user?.name}
                            </span>

                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </Button>

                            <Button
                                variant="secondary"
                                size="small"
                                onClick={handleLogout}
                            >
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => navigate('/login')}
                            >
                                Entrar
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
