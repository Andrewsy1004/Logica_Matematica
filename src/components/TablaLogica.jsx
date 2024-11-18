import { useState } from 'react';
import toast from "react-hot-toast";
import { determineFormulaType, evaluateExpression, generateTruthTable } from '../helpers';

export const TablaLogica = () => {
  const [inputSentence, setInputSentence] = useState('');
  const [propositions, setPropositions] = useState([]);
  const [logicalExpression, setLogicalExpression] = useState('');
  const [truthTable, setTruthTable] = useState([]);
  const [formulaType, setFormulaType] = useState('');
  const [selectedTab, setSelectedTab] = useState('proposiciones');
  const [selectedPropositionType, setSelectedPropositionType] = useState('simple');

  const [tautologia, setTautologia] = useState('');
  const [proposicionestautologia, setProposicionesTautologia] = useState([]);
  const [TipoTautologia, setTipoTautologia] = useState('No aplica');

  const [tabla, setTabla] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [preposiciones, setPreposiciones] = useState([]);

  const generarTablaTautologia = (tipo) => {
    // Encuentra las variables asociadas al tipo de tautología
    const tautologiaSeleccionada = tautologias.find((t) => t.tipo === tipo);

    if (!tautologiaSeleccionada) {
      console.error('Tipo de tautología no encontrado');
      return;
    }

    const variables = tautologiaSeleccionada.variable;
    const combinaciones = Math.pow(2, variables.length); // Total de combinaciones binarias
    const tablaGenerada = [];

    for (let i = 0; i < combinaciones; i++) {
      const fila = {};
      variables.forEach((variable, index) => {
        // Genera combinaciones de V/F usando operaciones binarias
        fila[variable] = (i >> (variables.length - index - 1)) & 1 ? 'V' : 'F';
      });
      fila.resultado = 'V'; // Resultado predefinido como Verdadero (Tautología)
      tablaGenerada.push(fila);
    }

    // Ordenar las filas para que los valores V sean los primeros
    const tablaOrdenada = tablaGenerada.sort((a, b) => {
      for (let variable of variables) {
        if (a[variable] !== b[variable]) {
          return a[variable] === 'V' ? -1 : 1; // 'V' primero
        }
      }
      return 0;
    });

    setTabla(tablaOrdenada);
  };



  // Ejemplos predefinidos de tautologías
  const ejemplosTautologias = {
    simple: [
      "si tengo dinero entonces compro comida. tengo dinero. por lo tanto compro comida ",
      "Si compras boletos entonces puedes ganar una rifa. No puedes ganar una rifa. Por lo tanto no compras boletos",
      "Si estudio entonces apruebo el examen. Si apruebo el examen entonces obtendré el diploma. Por lo tanto si estudio entonces obtendré el diploma.",
      "Si llueve entonces la calle se moja. Si la calle se moja entonces el tráfico será lento. Por lo tanto si llueve entonces el tráfico será lento.",
      "estudio o salgo a pasear. No salgo a pasear. Por lo tanto estudio."
    ],
  };

  const tautologias = [
    {
      condiciones: [
        ['( P → Q )', 'P', 'Q'],
        ['( P → Q )', 'Q', 'P']
      ],
      tipo: 'Modus Ponens',
      variable: ['P', 'Q']
    },
    {
      condiciones: [
        ['( P → Q )', '( ¬Q )', '( ¬P )'],
        ['( P → Q )', '( ¬P )', '( ¬Q )']
      ],
      tipo: 'Modus Tollens',
      variable: ['P', 'Q']
    },
    {
      condiciones: [
        ['( P → Q )', '( Q → S )', '( P → S )']
      ],
      tipo: 'Silogismo Hipotetico',
      variable: ['P', 'Q', 'S']
    },
    {
      condiciones: [
        ['( P ∨ Q )', '( ¬Q )', 'P'],
        ['( P ∨ Q )', '( ¬P )', 'Q']
      ],
      tipo: 'Silogismo Disyuntivo',
      variable: ['P', 'Q']
    }
  ];

  // Ejemplos de proposiciones
  const ejemplosProposiciones = {
    simple: [
      "Hoy es lunes",
      "Está lloviendo",
      "El cielo es azul"
    ],
    compuesta: [
      "Si está lloviendo entonces llevo paraguas",
      "Hoy es lunes y hace sol",
      "Iré al parque si y solo si no llueve"
    ]
  };

  const handleInputChange = (e) => {
    setInputSentence(e.target.value);
  };

  const handlePropositionChange = (e) => {
    setTautologia(e.target.value);
  };


  const handlePropositionTypeChange = (type) => {
    setSelectedPropositionType(type);
    setInputSentence('');
  };

  const handleExampleSelect = (ejemplo) => {
    setInputSentence(ejemplo);
  };

  const handleExampleSelectTautologia = (ejemplo) => {
    setTautologia(ejemplo);
  };


  const analyzeFBF = (sentence, existingPropositions = []) => {
    const connectors = {
      'y': '∧',
      'o': '∨',
      'u': '∨',
      'no': '¬',
      'ni': '¬',
      'entonces': '→',
      'porque': '→',
      'si y solo si': '↔',
    };

    const parts = sentence.split(/\s+(y|o|entonces|si y solo si|u|ni)\s+/gi);
    const tempPropositions = [...existingPropositions]; // Reutilizar proposiciones previas
    let expression = '';

    // Ajustar el símbolo inicial basado en las proposiciones existentes
    let currentSymbol = tempPropositions.length > 0
      ? String.fromCharCode(tempPropositions[tempPropositions.length - 1].symbol.charCodeAt(0) + 1)
      : 'P';

    let needParentheses = false;

    parts.forEach((part) => {
      const trimmedPart = part.trim().toLowerCase();

      if (connectors[trimmedPart] && trimmedPart !== 'no' && trimmedPart !== 'ni') {
        if (needParentheses) {
          expression = `( ${expression} )`;
        }
        expression += ` ${connectors[trimmedPart]} `;
        needParentheses = true;
      } else {
        const words = trimmedPart.split(' ');
        let proposition = trimmedPart;
        let isNegated = false;

        if (words[0] === 'no' || words[0] === 'ni') {
          isNegated = true;
          proposition = words.slice(1).join(' ');
        }

        // Verificar si la proposición ya está en las proposiciones existentes
        const existingProp = tempPropositions.find(
          (prop) => prop.proposition.toLowerCase().includes(proposition)
        );

        let subExpression = '';
        if (existingProp) {
          // Reutilizar el símbolo si la proposición ya existe
          subExpression = isNegated ? `¬${existingProp.symbol}` : existingProp.symbol;
        } else {
          // Generar un nuevo símbolo basado en las proposiciones ya existentes
          subExpression = isNegated ? `¬${currentSymbol}` : currentSymbol;
          tempPropositions.push({ symbol: currentSymbol, proposition: proposition });
          currentSymbol = String.fromCharCode(currentSymbol.charCodeAt(0) + 1);
        }

        if (isNegated) {
          subExpression = `( ${subExpression} )`;
        }

        expression += subExpression;
      }
    });

    if (needParentheses) {
      expression = `( ${expression} )`;
    }

    const table = generateTruthTable(tempPropositions, expression, evaluateExpression);
    const type = determineFormulaType(table);

    return {
      propositions: tempPropositions,
      expression,
      table,
      type,
    };
  };


  const HandleTautologia = () => {
    if (!tautologia || !tautologia.trim().includes('.')) {
      toast.error('Debe escribir proposiciones separadas por puntos.');
      return;
    }

    setTipoTautologia('');
    setShowInfo(false);


    // Dividir oraciones
    const oraciones = tautologia
      .split('.')
      .map((oracion) => oracion.trim())
      .filter((oracion) => oracion !== "");

    // Procesar oraciones y generar resultados iniciales
    const procesarOraciones = (oraciones) => {
      let sharedPropositions = [];
      return oraciones.map((oracion, index) => {
        const textoLimpio = oracion.replace(/^por lo tanto\s*/i, '').trim();
        const fbfResult = analyzeFBF(textoLimpio, sharedPropositions);
        sharedPropositions = fbfResult.propositions;

        return {
          id: index + 1,
          texto: textoLimpio,
          ...fbfResult,
        };
      });
    };

    const procesadas = procesarOraciones(oraciones);

    // // Vector de proposiciones del índice 1
    const vectorPropositions = procesadas[1]?.propositions || [];

    // Actualizar `expression` en `procesadas` excepto en el índice 0
    procesadas.forEach((oracion, index) => {
      if (index === 0) return; // No tocar el índice 0

      const propositionMatch = vectorPropositions.find(
        (prop) => oracion.texto.includes(prop.proposition)
      );


      if (propositionMatch) {
        // Verificar si el `expression` tiene un prefijo como ¬ y paréntesis
        const match = oracion.expression.match(/^(.*?)(\w+)(.*?)$/);

        if (match) {
          const prefijo = match[1]; // Captura el prefijo y cualquier cosa antes del símbolo
          const sufijo = match[3]; // Captura cualquier cosa después del símbolo
          const simboloActual = match[2]; // El símbolo actual (entre prefijo y sufijo)

          // Actualizar la expresión preservando el prefijo y el sufijo
          oracion.expression = `${prefijo}${propositionMatch.symbol}${sufijo}`;
        } else {
          // Si no se detecta un prefijo/sufijo, actualizar solo con el nuevo símbolo
          oracion.expression = propositionMatch.symbol;
        }
      }
    });

    const allPropositions = procesadas.map(item => item.propositions);


    if (procesadas.length == 3) {
      const exp0 = procesadas[0].expression;
      const exp1 = procesadas[1].expression;
      const exp2 = procesadas[2].expression;



      let tipoTautologia = 'No aplica';

      // Verificar las condiciones
      for (const { condiciones, tipo } of tautologias) {
        if (condiciones.some(([c0, c1, c2]) => c0 === exp0 && c1 === exp1 && c2 === exp2)) {
          tipoTautologia = tipo;
          break;
        }
      }

      // Validar el resultado
      if (tipoTautologia === 'No aplica') {
        toast.error('No es una tautologia');
        return;
      }

      // Establecer el tipo de tautología
      setTipoTautologia(tipoTautologia);
      generarTablaTautologia(tipoTautologia);
      setPreposiciones(allPropositions)
      setShowInfo(true);
    }


    // Guardar el resultado en el estado
    setProposicionesTautologia(procesadas);
  };


  const obtenerVistaPrevia = (texto, maxLength = 30) => {
    return texto.length > maxLength ? `${texto.slice(0, maxLength)}...` : texto;
  };


  const generateFBF = () => {
    if (!inputSentence) {
      toast.error('Debe escribir una proposición!');
      return;
    }

    const connectors = {
      'y': '∧',
      'o': '∨',
      'u': '∨',
      'no': '¬',
      'ni': '¬',
      'entonces': '→',
      'porque': '→',
      'si y solo si': '↔'
    };

    const parts = inputSentence.split(/\s+(y|o|entonces|si y solo si|u|ni)\s+/gi);
    const tempPropositions = [];
    let expression = '';
    let currentSymbol = 'P';
    let needParentheses = false;

    parts.forEach((part, index) => {
      const trimmedPart = part.trim().toLowerCase();

      if (connectors[trimmedPart] && trimmedPart !== 'no' && trimmedPart !== 'ni') {
        if (needParentheses) {
          expression = `( ${expression} )`;
        }
        expression += ` ${connectors[trimmedPart]} `;
        needParentheses = true;
      } else {
        const words = trimmedPart.split(' ');
        let proposition = trimmedPart;
        let isNegated = false;

        if (words[0] === 'no' || words[0] === 'ni') {
          isNegated = true;
          proposition = words.slice(1).join(' ');
        }

        const existingProp = tempPropositions.find(
          (prop) => prop.proposition.toLowerCase() === proposition
        );

        let subExpression = '';
        if (existingProp) {
          subExpression = isNegated ? `¬${existingProp.symbol}` : existingProp.symbol;
        } else {
          subExpression = isNegated ? `¬${currentSymbol}` : currentSymbol;
          tempPropositions.push({ symbol: currentSymbol, proposition: proposition });
          currentSymbol = String.fromCharCode(currentSymbol.charCodeAt(0) + 1);
        }

        if (isNegated) {
          subExpression = `( ${subExpression} )`;
        }

        expression += subExpression;
      }
    });

    if (needParentheses) {
      expression = `( ${expression} )`;
    }

    setPropositions(tempPropositions);
    setLogicalExpression(expression);
    const table = generateTruthTable(tempPropositions, expression, evaluateExpression);
    setTruthTable(table);
    const type = determineFormulaType(table);
    setFormulaType(type);
  };


  return (
    <div className="bg-white p-8 max-w-4xl w-full mx-auto mb-20 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Convertidor de lenguaje natural a Lenguaje Artificial
      </h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setSelectedTab('proposiciones')}
          className={`flex-1 py-3 font-medium transition-colors 
            ${selectedTab === 'proposiciones'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          Proposiciones
        </button>
        <button
          onClick={() => setSelectedTab('tautologias')}
          className={`flex-1 py-3 font-medium transition-colors 
            ${selectedTab === 'tautologias'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          Tautologías
        </button>
      </div>

      {selectedTab === 'proposiciones' ? (
        <div className="space-y-6">
          {/* Tipo de proposición selector */}
          <div className="flex gap-4">
            <button
              onClick={() => handlePropositionTypeChange('simple')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors 
                ${selectedPropositionType === 'simple'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Proposiciones Simples
            </button>
            <button
              onClick={() => handlePropositionTypeChange('compuesta')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors 
                ${selectedPropositionType === 'compuesta'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Proposiciones Compuestas
            </button>
          </div>

          {/* Ejemplos */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-700">Ejemplos:</h3>
            <div className="flex flex-wrap gap-2">
              {ejemplosProposiciones[selectedPropositionType].map((ejemplo, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleSelect(ejemplo)}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full transition-colors"
                >
                  {ejemplo}
                </button>
              ))}
            </div>
          </div>

          {/* Input área */}
          <textarea
            value={inputSentence}
            onChange={handleInputChange}
            placeholder={`Ingresa una proposición ${selectedPropositionType}`}
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
          />

          <button
            onClick={generateFBF}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Analizar Proposición
          </button>

          {(propositions.length > 0 || logicalExpression) && (
            <div className="mt-8 space-y-6">
              {/* Proposiciones */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Proposiciones:</h2>
                <ul className="space-y-2">
                  {propositions.map((prop, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-semibold">{prop.symbol}:</span> {prop.proposition}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expresión Lógica */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Expresión Lógica:</h2>
                <p className="font-mono text-lg text-gray-700">{logicalExpression}</p>
              </div>

              {/* Tabla de Verdad */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Tabla de Verdad:</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border rounded-lg">
                    <thead>
                      <tr className="bg-gray-100">
                        {propositions.map(prop => (
                          <th key={prop.symbol} className="p-3 border text-gray-700">
                            {prop.symbol}
                          </th>
                        ))}
                        <th className="p-3 border text-gray-700">Resultado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {truthTable.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {propositions.map(prop => (
                            <td key={prop.symbol} className="p-3 border text-center text-gray-700">
                              {row[prop.symbol] ? 'V' : 'F'}
                            </td>
                          ))}
                          <td className="p-3 border text-center text-gray-700">
                            {row.result ? 'V' : 'F'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tipo de Fórmula */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Tipo de Fórmula:</h2>
                <p className="text-lg text-gray-700">{formulaType}</p>
              </div>
            </div>
          )}


        </div>
      ) : (
        <div className="grid gap-4">

          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-700">Ejemplos:</h3>
            <div className="flex flex-wrap gap-2">
              {ejemplosTautologias.simple.map((ejemplo, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleSelectTautologia(ejemplo)}
                  title={ejemplo} // Mostrar el texto completo al hacer hover
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full transition-colors"
                >
                  {obtenerVistaPrevia(ejemplo)}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={tautologia}
            onChange={handlePropositionChange}
            placeholder={`Ingresa una proposición ${selectedPropositionType}`}
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
          />

          <button
            onClick={HandleTautologia}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Analizar Proposición
          </button>

          {showInfo && (
            <>
              {preposiciones.length > 0 && (
                <>
                  <h1 className="text-xl font-bold text-blue-600">Proposiciones</h1>
                  {preposiciones.map((grupo, index) => {
                    if (TipoTautologia === "Silogismo Hipotetico") {
                      if (index === 0) {
                        // Grupo 1 completo
                        return (
                          <div key={index} className="mb-6 pl-4 border-l-2 border-blue-500">
                            {grupo.map((item, subIndex) => (
                              
                              <div key={subIndex} className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                  Símbolo: {item.symbol}
                                </h2>
                                <p className="text-md text-gray-600">
                                  Proposición: {  item.proposition.trim().replace(/^si\s+/i, '') }
                                </p>
                              </div>
                            ))}
                          </div>
                        );
                      } else if (index === 1) {
                        // Solo símbolo S
                        const itemS = grupo.find((item) => item.symbol === "S");
                        return (
                          <div key={index} className="mb-6 pl-4 border-l-2 border-blue-500">
                            {itemS && (
                              <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                  Símbolo: {itemS.symbol}
                                </h2>
                                <p className="text-md text-gray-600">
                                  Proposición: {itemS.proposition}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      }
                    } else if (index === 0) {
                      // Grupo 1 completo para otros tipos
                      return (
                        <div key={index} className="mb-6 pl-4 border-l-2 border-blue-500">
                          {grupo.map((item, subIndex) => (
                            <div key={subIndex} className="mb-4">
                              <h2 className="text-lg font-semibold text-gray-800">
                                Símbolo: {item.symbol}
                              </h2>
                              <p className="text-md text-gray-600">Proposición: {item.proposition.trim().replace(/^si\s+/i, '') }</p>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              )}

              {tabla.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Tabla de Verdad para: {TipoTautologia}
                  </h3>
                  <table className="w-full border-collapse border rounded-lg">
                    <thead>
                      <tr>
                        {tautologias.find((t) => t.tipo === TipoTautologia)?.variable.map((variable) => (
                          <th key={variable} className="p-3 border text-gray-700">
                            {variable}
                          </th>
                        ))}
                        <th className="p-3 border text-gray-700">Resultado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabla.map((fila, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {Object.keys(fila).map((key) => (
                            <td key={key} className="p-3 border text-center text-gray-700">
                              {fila[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {TipoTautologia !== 'No aplica' && proposicionestautologia.length > 0 && (
                proposicionestautologia.map((resultado) => (
                  <div key={resultado.id} className="bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Oración {resultado.id}:
                    </h3>
                    <p className="text-gray-700 mb-2">
                      "{resultado.id === '3' ? 'Por lo tanto' : ''} {resultado.texto}"
                    </p>
                    <h4 className="text-md font-semibold text-gray-800">Expresión Lógica:</h4>
                    <p className="font-mono text-gray-700 mb-4">{resultado.expression}</p>
                  </div>
                ))
              )}

              {TipoTautologia === 'No aplica' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    No se reconoce esta Regla de inferencia, por favor intente de nuevo
                  </h2>
                </div>
              )}
            </>
          )}



        </div>
      )}

    </div>
  );
};