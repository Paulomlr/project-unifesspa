import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.brand}>
                        <img
                            src="/src/assets/logos/logo.png"
                            alt="UNIFESSPA+"
                            className={styles.logo}
                        />
                        <h3 className={styles.brandName}>UNIFESSPA+</h3>
                    </div>
                    <p className={styles.description}>
                        Plataforma de gestão e integração de projetos universitários da UNIFESSPA.
                    </p>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Links Rápidos</h4>
                    <nav className={styles.links}>
                        <Link to="/" className={styles.link}>Início</Link>
                        <Link to="/projetos" className={styles.link}>Projetos</Link>
                        <Link to="/contato" className={styles.link}>Contato</Link>
                        <Link to="/sobre" className={styles.link}>Sobre</Link>
                    </nav>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Contato</h4>
                    <div className={styles.contact}>
                        <p>Email: contato@unifesspa.edu.br</p>
                        <p>Telefone: (94) 2101-5900</p>
                        <p>Marabá - PA, Brasil</p>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} UNIFESSPA+. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
