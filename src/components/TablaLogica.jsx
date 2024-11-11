
import { useState } from 'react';
import toast from "react-hot-toast";
import { determineFormulaType, evaluateExpression, generateTruthTable } from '../helpers';

export const TablaLogica = () => {
  const [inputSentence, setInputSentence] = useState('');
  const [propositions, setPropositions] = useState([]);
  const [logicalExpression, setLogicalExpression] = useState('');
  const [truthTable, setTruthTable] = useState([]);
  const [formulaType, setFormulaType] = useState('');

  const handleInputChange = (e) => {
    setInputSentence(e.target.value);
  };

  const generateFBF = () => {

    if (!inputSentence) {
      toast.error('Debe escribir una proposición!');
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

    // Utilizar helpers para generar la tabla de verdad
    const table = generateTruthTable(tempPropositions, expression, evaluateExpression);
    setTruthTable(table);

    // Utilizar el helper para determinar el tipo de fórmula
    const formulaType = determineFormulaType(table);
    setFormulaType(formulaType);
  };

  return (
    <div id='simulation' className="bg-white  p-8 max-w-4xl w-full mx-auto mb-20">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Convertir Oraciones</h1>

        <textarea
          value={inputSentence}
          onChange={handleInputChange}
          placeholder="Ingresa una oración: Ejemplo: hoy es lunes si y solo si juego futbol"
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
        />

        <button
          onClick={generateFBF}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
        >
          Generar FBF
        </button>

        {propositions.length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-black">Proposiciones:</h2>
              <ul className="list-disc ml-5 space-y-1">
                {propositions.map((prop, index) => (
                  <li key={index} className="text-black" >
                    <span className="font-semibold text-black">{prop.symbol}:</span> {prop.proposition}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-black">Expresión Lógica:</h2>
              <p className="bg-gray-100 p-4 rounded-lg text-black">{logicalExpression}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-black">Tabla de Verdad:</h2>
              <table className="w-full border border-gray-300 rounded-lg text-center">
                <thead className="text-black">
                  <tr className="bg-gray-200 text-black">
                    {propositions.map(prop => (
                      <th key={prop.symbol} className="p-2 ">{prop.symbol}</th>
                    ))}
                    <th className="p-2 text-black">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {truthTable.map((row, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      {propositions.map(prop => (
                        <td key={prop.symbol} className="p-2 text-black ">{row[prop.symbol] ? 'V' : 'F'}</td>
                      ))}
                      <td className="p-2 text-black">{row.result ? 'V' : 'F'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-black">Tipo de Fórmula:</h2>
              <p className="bg-gray-100 p-4 rounded-lg text-black">{formulaType}</p>
            </div>

          </>

        )}
      </div>
    </div>
  );
};
