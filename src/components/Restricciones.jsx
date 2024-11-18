export const Restricciones = () => {
    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Encabezado con diseño mejorado */}
            <div className="mb-6 border-b-4 border-blue-500 pb-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Reglas y Restricciones</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Aprende cómo estructurar correctamente tus proposiciones lógicas y evita errores comunes.
                </p>
            </div>

            {/* Sección: Lo que NO se acepta */}
            <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Lo que NO se acepta:</h3>
            <ul className="list-none ml-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li className="flex items-start">
                    <span className="text-red-500 mr-3">✘</span>
                    No se reconocen conectores no válidos como <strong>porque</strong> o <strong>pero</strong>.
                </li>
                <li className="flex items-start">
                    <span className="text-red-500 mr-3">✘</span>
                    Proposiciones incompletas o ambiguas. Ejemplo: <em>"si hace frío"</em>.
                </li>
                <li className="flex items-start">
                    <span className="text-red-500 mr-3">✘</span>
                    Orden incorrecto en conectores como <strong>si</strong> y <strong>entonces</strong>.
                </li>
                <li className="flex items-start">
                    <span className="text-red-500 mr-3">✘</span>
                    Uso redundante de conectores. Ejemplo: <em>"si y solo si y entonces"</em>.
                </li>
                <li className="flex items-start">
                    <span className="text-red-500 mr-3">✘</span>
                    Proposiciones sin sentido lógico. Ejemplo: <em>"hoy y entonces porque mañana"</em>.
                </li>
            </ul>

            {/* Sección: Forma correcta */}
            <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Forma Correcta de Escribir:</h3>
            <ul className="list-none ml-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li className="flex items-start">
                    <span className="text-green-500 mr-3">✔</span>
                    Escribe proposiciones claras y completas. Ejemplo: <em>"si hace frío entonces uso un abrigo"</em>.
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-3">✔</span>
                    Usa conectores válidos: <strong>y</strong>, <strong>o</strong>, <strong>entonces</strong>, <strong>si y solo si</strong>, <strong>no</strong>.
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-3">✔</span>
                    Sigue el orden lógico. Ejemplo: <em>"si estudio entonces apruebo"</em>.
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-3">✔</span>
                    Negaciones claras. Ejemplo: <em>"no está lloviendo"</em>.
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-3">✔</span>
                    Combina proposiciones simples para crear estructuras complejas. Ejemplo: <em>"si hace frío y está nublado entonces llevo abrigo"</em>.
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-3">✔</span>
                    Se aceptan algunas reglas de inferencias. Ejemplo: <em>"Modus ponens, Modus tollens, Silogismo Hipotetico y Silogismo Disyuntivo"</em>.
                </li>
            </ul>

            {/* Ejemplos */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Algunos ejemplos:</h3>

                {/* Caja de ejemplo */}
                {[
                    {
                        texto: "Si estudio y practico o si tengo un buen profesor entonces apruebo el examen",
                        logica: "((P ∧ Q) ∨ R) → S",
                    },
                    {
                        texto: "No está soleado y si llueve entonces llevo paraguas",
                        logica: "((( ¬P ) ∧ Q ) → R)",
                    },
                    {
                        texto: "Hoy es lunes si y solo si tengo clases y no estoy de vacaciones",
                        logica: "((P ↔ Q) ∧ (¬R))",
                    },
                    {
                        texto: "Si hago ejercicio y como saludable entonces me mantengo en forma o no me preocupo",
                        logica: "( ((P ∧ Q) → R) ∨ (¬S) )",
                    },
                    {
                        texto: "No es viernes y si trabajo entonces no salgo a cenar",
                        logica: "( ((¬P) ∧ Q ) → (¬R) )",
                    },
                ].map((ejemplo, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-4 shadow-sm">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{ejemplo.texto}</p>
                        <p className="text-lg text-gray-800 dark:text-gray-200 font-mono">
                            Notación lógica: <strong>{ejemplo.logica}</strong>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
