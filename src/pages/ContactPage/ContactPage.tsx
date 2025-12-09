import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './ContactPage.module.css';

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data) => {
        console.log('Contact form data:', data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className={styles.contactPage}>
            <Header />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Entre em Contato</h1>
                    <p className={styles.subtitle}>
                        Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.formSection}>
                        {submitted && (
                            <div className={styles.successMessage}>
                                ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <Input
                                label="Nome Completo"
                                name="name"
                                type="text"
                                placeholder="Seu nome"
                                register={register}
                                error={errors.name}
                                required
                            />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                register={register}
                                error={errors.email}
                                required
                            />

                            <Input
                                label="Assunto"
                                name="subject"
                                type="text"
                                placeholder="Sobre o que você quer falar?"
                                register={register}
                                error={errors.subject}
                                required
                            />

                            <div className={styles.textareaGroup}>
                                <label htmlFor="message" className={styles.label}>
                                    Mensagem *
                                </label>
                                <textarea
                                    id="message"
                                    {...register('message', { required: true })}
                                    placeholder="Digite sua mensagem aqui..."
                                    className={styles.textarea}
                                    rows={6}
                                />
                                {errors.message && (
                                    <span className={styles.errorMessage}>Este campo é obrigatório</span>
                                )}
                            </div>

                            <Button type="submit" variant="primary" size="large" fullWidth>
                                Enviar Mensagem
                            </Button>
                        </form>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>📧 Email</h3>
                            <p className={styles.infoText}>contato@unifesspa.edu.br</p>
                        </div>

                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>📞 Telefone</h3>
                            <p className={styles.infoText}>(94) 2101-5900</p>
                        </div>

                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>📍 Endereço</h3>
                            <p className={styles.infoText}>
                                Folha 31, Quadra 07, Lote Especial<br />
                                Nova Marabá - Marabá/PA<br />
                                CEP: 68507-590
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>🕒 Horário de Atendimento</h3>
                            <p className={styles.infoText}>
                                Segunda a Sexta-feira<br />
                                08:00 às 18:00
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
