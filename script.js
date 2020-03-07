class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear(){
        this.currentOperand = '';  
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0 , -1);
    }

    appendNumber(number){
        //No deja poner más de 1 punto                                              //Check in
        if(number === '.' && this.currentOperand.includes('.')) return;             
        this.currentOperand = this.currentOperand.toString() + number.toString();   //Agrega el numero en forma de string a el string ya establecido.
    }

    chooseOperation(operation){
        //Evita que se ejecute si todavía no escribimos la 2da parte                //Check in
        if(this.currentOperand === '') return;                                      
        //Si ya tenemos un previous, se ejecute compute, que realiza la operación
        if(this.previousOperand !== ''  ){
            this.compute();
        }                                                                       
        this.operation = operation;                                               
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        //Resultado de la computación
        let computation;
        //Creacion de numeros en base a los strings de numeros indicados por el usuario
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);                            
        //Por si acaso ponemos este check                                           
        if(isNaN(prev) || isNaN(current)) return;                                   //Check in

        //Switch que verifica que operacion hacer y al hacerla devuelve el valor de computation(el resultado)
        switch (this.operation) {   
            case '+' : 
                computation = prev + current
                break
            case '-' : 
                computation = prev - current
                break
            case '*' : 
                computation = prev * current
                break
            case '÷' : 
                computation = prev / current
                break
            default:
                return
        }

        
        this.currentOperand = computation;  //El resultado se vuelve el operador grande y actual para mostrarle el resultado al usuario
        this.operation = undefined;         //Luego de dar un resultado, borramos el operation para esperar uno nuevo
        this.previousOperand = '';          //El operador previo se limpia para esperar uno nuev
    }


   

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;         //Actualiza la pantalla (en forma de strings)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand}${this.operation}`;
        }else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}







//Seleccion de todos los botones de la UI

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');


//Seleccion de los display de numeros y elementos a mostrar
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


//Creo una calculadora, con todas las funciones de la clase Calculator
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);




//EventListener de los botones, que ejecutan metodos de la clase Calculator
numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});




deleteButton.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateDisplay();
});


allClearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
});