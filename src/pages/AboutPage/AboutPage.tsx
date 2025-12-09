import { GraduationCap, Users, Building2 } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './AboutPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles.aboutPage}>
            <Header />

            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Sobre a Conecta Unifesspa</h1>
                <p className={styles.heroDescription}>
                    Uma plataforma inovadora que visa conectar pessoas, ideias e ações por meio de
                    projetos de extensão da Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA).
                </p>
            </section>

            {/* Mission Section */}
            <section className={styles.missionSection}>
                <div className={styles.missionContainer}>
                    <div className={styles.missionContent}>
                        <h2>Nossa Missão e Impacto</h2>
                        <p>
                            Nossa missão é democratizar o acesso a iniciativas sociais e
                            acadêmicas, promovendo um impacto positivo tanto na
                            comunidade acadêmica quanto na sociedade em geral.
                        </p>
                        <p>
                            Acreditamos que a extensão universitária é uma ferramenta
                            poderosa para transformar realidades. O CampusConnect busca
                            facilitar a conexão entre projetos e pessoas interessadas em
                            participar, ampliando o alcance e o impacto das ações de
                            extensão da UNIFESSPA.
                        </p>
                    </div>
                    <div className={styles.missionImage}>
                        <img
                            src="/src/assets/images/people.png"
                            alt="Pessoas colaborando"
                        />
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className={styles.audienceSection}>
                <div className={styles.audienceContainer}>
                    <h2 className={styles.audienceTitle}>Pra quem é a Conecta Unifesspa?</h2>
                    <div className={styles.audienceGrid}>
                        <div className={styles.audienceCard}>
                            <div className={styles.audienceIcon}>
                                <GraduationCap size={32} />
                            </div>
                            <h3>Comunidade Acadêmica</h3>
                            <p>
                                Estudantes, professores e técnicos encontram projetos alinhados aos
                                seus interesses para contribuir com iniciativas inovadoras.
                            </p>
                        </div>

                        <div className={styles.audienceCard}>
                            <div className={styles.audienceIcon}>
                                <Users size={32} />
                            </div>
                            <h3>Comunidade Externa</h3>
                            <p>
                                Pessoas, ONGs e empresas podem conectar com projetos, colaborar
                                em ações para beneficiar a comunidade.
                            </p>
                        </div>

                        <div className={styles.audienceCard}>
                            <div className={styles.audienceIcon}>
                                <Building2 size={32} />
                            </div>
                            <h3>Gestores</h3>
                            <p>
                                Coordenadores podem divulgar projetos, gerenciar inscrições,
                                acompanhar as ações e coletar dados sobre o impacto da extensão.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <h3 className={styles.statNumber}>10+</h3>
                        <p className={styles.statLabel}>Projetos Ativos</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3 className={styles.statNumber}>50+</h3>
                        <p className={styles.statLabel}>Participantes</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3 className={styles.statNumber}>200+</h3>
                        <p className={styles.statLabel}>Pessoas Impactadas</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
