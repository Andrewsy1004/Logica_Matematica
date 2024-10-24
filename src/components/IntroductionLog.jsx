export const IntroductionLog = () => {
    return (
        <section id='intro' className="bg-gradient-to-r from-blue-500 to-teal-500 p-10 rounded-lg shadow-2xl max-w-7xl mx-auto my-10">
            <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-[0px_0px_15px_rgba(0,255,255,0.8)] border-2 border-transparent hover:border-cyan-400">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                    Introducción a la Lógica Matemática
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    La lógica matemática es el estudio de los principios y métodos de razonamiento. Se basa en un conjunto de reglas que permiten determinar si una proposición es verdadera o falsa. Las proposiciones son declaraciones que pueden tener un valor de verdad (verdadero o falso), y las operaciones lógicas permiten combinar y modificar estas proposiciones.
                </p>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Operaciones Lógicas Básicas
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Negación (¬):</strong> Cambia el valor de verdad de una proposición. Si una proposición es verdadera, su negación es falsa, y viceversa.</li>
                    <li><strong>Conjunción (∧):</strong> El resultado es verdadero solo si ambas proposiciones son verdaderas. De lo contrario, es falso.</li>
                    <li><strong>Disyunción (∨):</strong> El resultado es verdadero si al menos una de las proposiciones es verdadera. Es falso solo si ambas proposiciones son falsas.</li>
                    <li><strong>Implicación (→):</strong> Una proposición implica a otra si, cuando la primera es verdadera, la segunda también lo es. Si la primera es falsa, la implicación es siempre verdadera.</li>
                    <li><strong>Bicondicional (↔):</strong> Es verdadero si ambas proposiciones tienen el mismo valor de verdad (ambas verdaderas o ambas falsas).</li>
                </ul>
            </div>
        </section>
    );
};
