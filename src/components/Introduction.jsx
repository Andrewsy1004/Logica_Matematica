import { Typewriter } from 'react-simple-typewriter';

export const Introduction = () => {
    return (
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Bienvenido a <span className="text-accent">Matemáticas Discretas</span>
                        </h1>
                        <p className="text-lg md:text-xl text-secondary-foreground leading-relaxed">
                            Esta plataforma te guiará paso a paso a través de los conceptos clave de la lógica proposicional, con ejemplos prácticos que te ayudarán a transformar expresiones en proposiciones lógicas formales. Además, podrás generar automáticamente tablas de verdad, visualizando el comportamiento de cada operación lógica.
                        </p>
                        <p className="text-lg md:text-xl font-medium">
                            ¡Hazlo
                            <Typewriter
                                words={[' fácil.', ' sencillo.', ' rápido.', ' amigable.']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </p>

                        {/* Call-to-Action */}
                        <div className="flex gap-4">
                            <a
                                href="#intro"
                                aria-label="Comenzar"
                                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-lg font-semibold text-primary shadow-md hover:bg-accent-hover hover:scale-105 transition-transform bg-blue-500 hover:bg-blue-600 hover:text-white"
                            >
                                Comenzar
                            </a>
                        </div>
                    </div>

                    {/* Animation/Image */}
                    <div className="hidden md:block">
                        <img
                            src="/logica.gif"
                            width={500}
                            height={500}
                            alt="Animación sobre lógica proposicional"
                            className="mx-auto rounded-lg shadow-lg"
                            style={{ aspectRatio: "1/1", objectFit: "contain" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
