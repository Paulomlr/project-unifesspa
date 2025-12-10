import { GraduationCap, Users, Building2 } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-8 py-16 text-center text-white">
                <h1 className="text-4xl font-extrabold mb-4">Sobre a Conecta Unifesspa</h1>
                <p className="text-lg max-w-[700px] mx-auto leading-relaxed text-slate-300">
                    Uma plataforma inovadora que visa conectar pessoas, ideias e ações por meio de
                    projetos de extensão da Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA).
                </p>
            </section>

            {/* Mission Section */}
            <section className="bg-slate-50 px-8 py-16">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Nossa Missão e Impacto</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Nossa missão é democratizar o acesso a iniciativas sociais e acadêmicas,
                            promovendo um impacto positivo tanto na comunidade acadêmica quanto na sociedade em geral.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Acreditamos que a extensão universitária é uma ferramenta poderosa para transformar realidades.
                            O CampusConnect busca facilitar a conexão entre projetos e pessoas interessadas em participar,
                            ampliando o alcance e o impacto das ações de extensão da UNIFESSPA.
                        </p>
                    </div>

                    <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 flex items-center justify-center">
                        <img
                            src="/src/assets/images/people.png"
                            alt="Pessoas colaborando"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-8 py-16">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Pra quem é a Conecta Unifesspa?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="bg-white text-center rounded-xl p-8 transition-transform hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Comunidade Acadêmica</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Estudantes, professores e técnicos encontram projetos alinhados aos
                                seus interesses para contribuir com iniciativas inovadoras.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white text-center rounded-xl p-8 transition-transform hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Comunidade Externa</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Pessoas, ONGs e empresas podem conectar com projetos e colaborar
                                em ações que beneficiam a comunidade.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white text-center rounded-xl p-8 transition-transform hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white">
                                <Building2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Gestores</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Coordenadores podem divulgar projetos, gerenciar inscrições e acompanhar
                                as ações de extensão.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-slate-50 px-8 py-16">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl p-8 text-center shadow-md">
                        <h3 className="text-5xl font-extrabold text-emerald-500 mb-2">10+</h3>
                        <p className="text-slate-600 font-medium">Projetos Ativos</p>
                    </div>

                    <div className="bg-white rounded-xl p-8 text-center shadow-md">
                        <h3 className="text-5xl font-extrabold text-emerald-500 mb-2">50+</h3>
                        <p className="text-slate-600 font-medium">Participantes</p>
                    </div>

                    <div className="bg-white rounded-xl p-8 text-center shadow-md">
                        <h3 className="text-5xl font-extrabold text-emerald-500 mb-2">200+</h3>
                        <p className="text-slate-600 font-medium">Pessoas Impactadas</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
