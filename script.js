class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  addNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  Operation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  calculate() {
    let calculation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        calculation = prev + current
        break
      case '-':
        calculation = prev - current
        break
      case '*':
        calculation = prev * current
        break
      case '÷':
        calculation = prev / current
        break
      default:
        return
    }

    this.currentOperand = calculation
    this.operation = undefined
    this.previousOperand = ''
  }

  DisplayNumber(number) {
    const sNum = number.toString();
    const iDigits = parseFloat(sNum.split('.')[0]);
    const dDigits = sNum.split('.')[1];
    let integerDisplay;

    if (isNaN(iDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = iDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (dDigits != null) {
      return `${integerDisplay}.${dDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.DisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.DisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  purge() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumber(button.innerText)
    calculator.updateDisplay()
  });
});
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.Operation(button.innerText)
    calculator.updateDisplay()
  })
});
equalsButton.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateDisplay()
});
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
});
deleteButton.addEventListener('click', button => {
  calculator.purge()
  calculator.updateDisplay()
});