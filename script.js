
const digitsHtml = document.querySelector('#digits');
const inputHtml = document.querySelector('#inp');
const clearCurrentHtml = document.querySelector('#clearCurrent');
const clearAllHtml = document.querySelector('#clearAll');
const equalsHtml = document.querySelector('#equals');
const opsHtml = document.querySelectorAll('.ops');

// used for the actual calculations
let prevDigit = null;
let prevOpera = null;

// function to display input
function appendToInput(e) {
    inputHtml.value = inputHtml.value + e.target.id;
}

// function to clear input area
function clearInputArea(){
    inputHtml.value = "";
}

// adding in the digit buttons
for(let i=0; i<=9; i++){
    let elt = document.createElement('button');
    elt.classList.add('digit');
    elt.setAttribute('id',`${i}`);
    elt.textContent = `${i}`;
    digitsHtml.appendChild(elt);
}


// building the basic operation function
function operate(num1, num2, operator){
    switch(operator){
        case '+':
            return num1+num2;
        case '-':
            return num1-num2;
        case '*':
            return num1*num2;
        case '/':
            if(num2 === 0) return 'Error:DivideByZero';
            return num1 / num2;
    }
}

// function on the operation button eventListener
function calculate(e){
    if(prevDigit && prevOpera){
        const nowDigit = parseInt(inputHtml.value);
        prevDigit = operate(prevDigit,nowDigit,prevOpera);
        if(prevDigit === 'Error:DivideByZero') return 'Error:DivideByZero';
        prevOpera = e.target.id;
    }
    else if(prevDigit){
        prevOpera = e.target.id;
    }
    else{
        prevDigit = parseInt(inputHtml.value);
        prevOpera = e.target.id;
    }
    clearInputArea();
}

// function on the equals button eventListener
function equalCalc(){
    if(prevDigit && prevOpera){
        inputHtml.value = operate( prevDigit, parseInt(inputHtml.value), prevOpera );
    }
    else {
        inputHtml.value = "Error! Equals too early";
    }
}

// function to clear everything
function clearAll(){
    prevDigit = null;
    prevOpera = null;
    clearInputArea();
}

// button magic
const allDigitsHtml = document.querySelectorAll('.digit');
allDigitsHtml.forEach((digit) => {
    digit.addEventListener('click', appendToInput);
});

// clearCurrentValue
clearCurrentHtml.addEventListener('click',clearInputArea);

// operations
opsHtml.forEach((ops) => ops.addEventListener('click',calculate));

// equals
equalsHtml.addEventListener('click',equalCalc);

// clear all
clearAllHtml.addEventListener('click',clearAll);
