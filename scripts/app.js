import Utils from "./utils.js";
import Calculator from "./main.js";

class App {
    initCalculator(){
        calculator.getDisplayKeyboardButtons()
        calculator.pressKeyboard()
    
        utils.blurInput()
        utils.modalCloseConfirm()
    }    
}

// =================================== HTML Variables ===================================
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
const utils = new Utils()
const app = new App();

app.initCalculator();