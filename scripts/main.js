// Global Variables
const operationsArray = ['+', '-', '*', '÷'];

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(operation === '/') operation = operationsArray[3]
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(previous) || isNaN(current)) return
        
        switch (this.operation) {
            case operationsArray[0]: 
                computation = previous + current
                break
            case operationsArray[1]: 
                computation = previous - current
                break
            case operationsArray[2]: 
                computation = previous * current
                break
            case operationsArray[3]:
                if(current === 0) {
                    this.modalOpen()
                    this.clear()
                    this.updateDisplay()
                    return
                }
                computation = previous / current
                break
            default: 
                return
        }
        
        this.currentOperand = computation
        this.operation = undefined 
        this.previousOperand = ''
    }

    getDisplayNumber(number) { 
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    // =================================== Keyboard Functions ===================================
    verifyClearButton(keys) {
        if (/[\c\C]/.test(keys)) {
            this.clear()
            this.updateDisplay()
        }
    }

    verifyInputNumbers(keys) {
        if (/[0-9]/.test(keys)) {
            this.appendNumber(keys)
            this.updateDisplay() 
        }
    }

    verifyInputOperation(keys){
        if(/[\*\/\+\-]/.test(keys)) this.chooseOperation(keys)
    }

    verifyEnterAndDelete(keys){
        const enterDelete = ['Enter', 'Delete']
        
        if(keys === enterDelete[0]) this.compute()
        else if(keys === enterDelete[1]) this.delete()
    }

    pressKeyboard(){
        document.addEventListener('keydown', event => {
            const keys = event.key

            // These buttons cause a bug that when inserted in the event by "keydown" the calculator triggers "clear()" and locks.
            // Esses botões causam um bug que ao serem inseridos no evento pelo "keydown" a calculadora aciona o "clear()" e trava.
            let checkBugButtons = (arr, event) => arr.includes(event)
            const bugButtons = ['CapsLock', 'Backspace', 'Control', 'ScrollLock']

            if(checkBugButtons(bugButtons, keys)) return

            this.verifyClearButton(keys)
            this.verifyInputNumbers(keys)
            this.verifyInputOperation(keys)
            this.verifyEnterAndDelete(keys)
            this.updateDisplay()
        })
    }

    // =================================== Modal Error ===================================
    modalOpen() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    }

    modalClose() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }    
}

// =================================== HTML Variables ===================================
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

calculator.pressKeyboard()

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


