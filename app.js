
///Hello dear friend, i hope you like this home made calculator

// Utilities of the calculator

let add = (a,b) => a + b;
let multiply = (a,b) => a * b;
let minus = (a,b) => a - b;
let divide = (a,b) => a / b;
let operate = (a,operator,b) => {
    let aNum = parseInt(a);
    let bNum = parseInt(b);
    switch(operator){
        case '+':
          return add(aNum,bNum);
        case '-':
            return minus(aNum,bNum);
        case '*':
            return multiply(aNum,bNum);
        case '/':
            return divide(aNum,bNum);

        default:
            alert('wrong entry');
    }
}

let string1;
let string2;
let result;

let display = {
    area : document.querySelector('.text'),

    arrayNumbers : [],
    arrayNumbers2 : [],
    arraySimbol : [],
    

    writer (txt){
        
        let text = txt;

        if(parseInt(text) || text === '0'){
            if(this.arraySimbol.length === 0){
                this.arrayNumbers.push(text);
                this.area.textContent = this.arrayNumbers.join('');
            }else {
                this.arrayNumbers2.push(text);
                this.area.textContent = this.arrayNumbers2.join('');
            }

        }else {
            this.arraySimbol.push(text);
            string1 = this.arrayNumbers.join('');
            this.arrayNumbers.length = 0;
        }
        if (text === 'finished'){
            this.area.textContent = result;
            result = 0;
        }


    },
    clear (option){
        if(option === 'clear'){
            this.arraySimbol.length = 0;
            this.arrayNumbers.length = 0;
            this.area.textContent = this.arrayNumbers.join('');
            string1 = 0;
            string2 = 0;
            result = 0;
        }else if(option === 'equal'){
            string2 = this.arrayNumbers2.join('');
            //hacer stwitch para cada operacionnnn al despertarme maniana
            result = add(parseInt(string1),parseInt(string2));
            this.writer('finished');
        }
    },

}


window.addEventListener('click', e => {

    let value = e.target.value;
    if((value !== undefined) && (value !== 'equal' || value !== 'clear')){

        // printing options, situations where i can use writer()

        if(parseInt(value) || value === '0'){

            display.writer(value);

        }else{
                switch(value)   {
                    case ('add'):
                        display.writer('+');
                        break;
                    case ('minus'):
                        display.writer('-');
                        break;
                    case ('multiply'):
                        display.writer('X');
                        break;
                    case ('divide'):
                        display.writer('/');
                        break;
                }
        }
    }
    if(value === 'clear' || value === 'equal') {
        display.clear(value);
    }
});
























