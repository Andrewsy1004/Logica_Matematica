// helpers.js

export const determineFormulaType = (truthTable) => {
    const allTrue = truthTable.every(row => row.result);
    const allFalse = truthTable.every(row => !row.result);
  
    if (allTrue) {
      return 'Tautología';
    } else if (allFalse) {
      return 'Contradicción';
    } else {
      return 'Contingencia';
    }
  };
  
  export const evaluateExpression = (expr, values, steps) => {
    const operators = {
      '∧': { precedence: 2, operation: (a, b) => a && b },
      '∨': { precedence: 1, operation: (a, b) => a || b },
      '¬': { precedence: 3, operation: a => !a },
      '→': { precedence: 0, operation: (a, b) => !a || b },
      '↔': { precedence: 0, operation: (a, b) => a === b }
    };
  
    const outputQueue = [];
    const operatorStack = [];
  
    const tokens = expr.match(/[P-Z]|[∧∨¬→↔]|\(|\)/g);
  
    tokens.forEach(token => {
      if (token in values) {
        outputQueue.push(values[token]);
      } else if (token in operators) {
        while (operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          operators[token].precedence <= operators[operatorStack[operatorStack.length - 1]].precedence) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
          operatorStack.pop();
        }
      }
    });
  
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
  
    const stack = [];
    outputQueue.forEach(token => {
      if (typeof token === 'boolean') {
        stack.push(token);
      } else if (token in operators) {
        if (token === '¬') {
          const operand = stack.pop();
          const result = operators[token].operation(operand);
          stack.push(result);
          steps.push(`¬${operand} = ${result}`);
        } else {
          const b = stack.pop();
          const a = stack.pop();
          const result = operators[token].operation(a, b);
          stack.push(result);
          steps.push(`${a} ${token} ${b} = ${result}`);
        }
      }
    });
  
    return stack.pop();
  };
  
  export const generateTruthTable = (props, expr, evaluateExpression) => {
    const numProps = props.length;
    const rows = Math.pow(2, numProps);
    const table = [];
    const stepsCalculation = [];
  
    for (let i = rows - 1; i >= 0; i--) {
      const row = {};
      const binary = i.toString(2).padStart(numProps, '0');
  
      props.forEach((prop, index) => {
        row[prop.symbol] = binary[index] === '1';
      });
  
      const result = evaluateExpression(expr, row, stepsCalculation);
      row.result = result;
      table.push(row);
    }
  
    return table;
  };
  