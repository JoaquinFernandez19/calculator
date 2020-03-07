/*
El pensamiento detrás de esta calculadora es crear una class Calculator que, aparte de crear un objecto calculadora,
le otorgue metodos(funciones) especiales de una calculadora, estos son: mostrar valores en la pantalla, limpiarlos,
actualizarlos cada vez que se cambie algo, borrar un caracter, escribir un numero, elegir una operacion, hacer las cuentas.

Entonces al crear una nueva calculadora, esta tendrá todos los metodos designados.

Luego hay que buscar los elementos del HTML para poder recibir eventos.

A estos elementos html les asignamos eventListeners para que, al ser activados, activen el metodo indicado, o los metodos, eso si, 
en cada event listener, aparte del metodo correspondiente, se le asigna el metodo de actualizar la pantalla, para que cada accion del usario se vea reflejada en pantalla.

----------

En la clase Calculadora, vamos a tener variables designadas para mostrarse y para poder calcular el resultados, estas son currentOperand y previousOperand.
Un ejemplo de esto, es, al actualizar la pantalla, el valor almacenado en currentOperand pase a ser el innerText de el elemento designado a manejar la pantalla.



(Esta cantidad de comentarios es debido a que estoy aprendiendo y quiero recordar todo y ordenarlo en mi cabeza :))
*/



class Calculator {                                                                  
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    //Metodo que limpia(resetea todos los valores)
    clear(){
        this.currentOperand = '';                                                   //currentOperand es el operand al cual podemos modificar con numeros o puntos,siempre que modificamos, es en este
        this.previousOperand = '';                                                  //previousOperand guarda currentOperand luego de que elijamos operation
        this.operation = undefined;                                                 //Se guarda el simbolo de operación elegido
    }
    //Borra el ultimo digito agregado al currentOperand (slice(0,-1) borra el último =O)
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0 , -1);        //Vuelve currentOperand un string para poder cortarle el último caracter
    }
    //Metodo que recibe un numero del eventlistener y lo pone en el currentOperand
    appendNumber(number){
        //No deja poner más de 1 punto                                              //Check in
        if(number === '.' && this.currentOperand.includes('.')) return;             
        this.currentOperand = this.currentOperand.toString() + number.toString();   //Agrega el numero en forma de string a el string ya establecido.
    }

    chooseOperation(operation){                                                     //Este método es el que almacena la operation designada desde el eventlistener
        //Evita que se ejecute si todavía no escribimos la 2da parte                //Check in
        if(this.currentOperand === '') return;                                      
        //Si ya tenemos un previousOperand, se ejecute compute, que realiza la operación
        if(this.previousOperand !== ''  ){
            this.compute();
        }                                                                       
        this.operation = operation;                                                 //Esto pasa si no tenemos operation elegida aun
        this.previousOperand = this.currentOperand;                                 //Previous toma el valor de current y pasa para arriba
        this.currentOperand = '';                                                   //Ya almacenado previousOperand, podemos vaciar currentOperand para escribir la 2da parte de la cuenta
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
        if(this.operation != null){                                             //De existir una operation
            this.previousOperandTextElement.innerText =                         //Agregar el previousOperand y a su derecha el simbolo de la operación
                `${this.previousOperand}${this.operation}`;
        }else {
            this.previousOperandTextElement.innerText = '';                     //Si no pasé un nuevo operation, simplemente se actualizo el valor de previous, borrandolo
                                                                                //para poder luego darle un nuevo valor.
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