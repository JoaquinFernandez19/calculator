// Utilities of the calculator

let add = (a,b) => a + b;
let multiply = (a,b) => a * b;
let substract = (a,b) => a - b;
let divide = (a,b) => a / b;


let operate = (a,operator,b) => {
    let aNum = parseInt(a);
    let bNum = parseInt(b);
    switch(operator){
        case '+':
          return add(aNum,bNum);
        case '-':
            return substract(aNum,bNum);

        case '*':
            return multiply(aNum,bNum);
        break;
        case '/':
            return divide(aNum,bNum);
        break;    
        default:
            alert('wrong entry');
    }
}



