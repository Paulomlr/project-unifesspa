import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit: SubmitHandler<ContactForm> = (data) => {
        console.log('Contact form data:', data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="max-w-5xl mx-auto py-14 px-6 sm:px-8 flex-1 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-4" style={{ fontSize: '2.5rem' }}>
                        Entre em Contato
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--color-text-secondary)]">
                        Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
                    </p>
                </div>

                <div className="grid grid-cols-[1.5fr_1fr] gap-16 lg:grid-cols-[1fr_1fr] md:grid-cols-1">
                    <div className="bg-white p-10 rounded-xl shadow-md">
                        {submitted && (
                            <div className="bg-green-100 text-[var(--color-success)] p-4 rounded-md mb-6 font-semibold border-l-4 border-l-[var(--color-success)]">
                                ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
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

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="font-semibold text-[var(--color-text)] text-xs">
                                    Mensagem *
                                </label>
                                <textarea
                                    id="message"
                                    {...register('message', { required: true })}
                                    placeholder="Digite sua mensagem aqui..."
                                    className="w-full py-3 px-4 border border-[var(--color-border)] rounded-md text-base focus:outline-none focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[rgba(16,185,129,0.1)] transition-all duration-200"
                                    rows={6}
                                />
                                {errors.message && (
                                    <span className="text-[var(--color-error)] text-xs">Este campo é obrigatório</span>
                                )}
                            </div>

                            <Button type="submit" variant="primary" size="large" fullWidth>
                                Enviar Mensagem
                            </Button>
                        </form>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-white p-8 rounded-xl shadow-md transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
                            <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">📧 Email</h3>
                            <p className="text-[var(--color-text-secondary)]">contato@unifesspa.edu.br</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
                            <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">📞 Telefone</h3>
                            <p className="text-[var(--color-text-secondary)]">(94) 2101-5900</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
                            <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">📍 Endereço</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                Folha 31, Quadra 07, Lote Especial<br />
                                Nova Marabá - Marabá/PA<br />
                                CEP: 68507-590
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
                            <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">🕒 Horário de Atendimento</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
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
