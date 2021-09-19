import Calculator from "./main.js";

class App {
    initCalculator(){
        calculator.getDisplayKeyboardButtons()
        calculator.pressKeyboard()
    }    
}

// =================================== HTML Variables ===================================
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
const app = new App();

app.initCalculator();