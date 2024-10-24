
import { Typewriter } from 'react-simple-typewriter';


export const Introduction = () => {
    return (
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">Bienvenido a Matematicas Discretas</h1>

                        <p className="text-lg">
                            Esta plataforma te guiará paso a paso a través de los conceptos clave de la lógica proposicional, con ejemplos prácticos que te ayudarán a transformar expresiones en proposiciones lógicas formales. Además, podrás generar automáticamente la tabla de verdad para cada expresión ingresada, visualizando el comportamiento de cada operación lógica. ¡Empieza tu recorrido y desentraña el mundo de la lógica!


                            <Typewriter
                                words={[' fácil', ' Sencillo', ' rápido', ' amigable']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </p>

                        <div className="flex gap-2">
                            <a
                                href="#intro"
                                className=" animate-bounce inline-flex items-center justify-center rounded-md bg-primary-foreground px-4 py-2 
                                text-black hover:bg-blue- hover:text-white bg-blue-500 "
                            >
                                Comenzar
                            </a>

                        </div>

                    </div>
                    <div className="hidden md:block">
                        <img
                            src="/logica.gif"
                            width={500}
                            height={500}
                            alt="Animación"
                            className="mx-auto"
                            style={{ aspectRatio: "500/500", objectFit: "cover" }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};