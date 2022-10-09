const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');

let numberContainer = "";
let operatorContainer = "";
let mathOp = "";

function reset() {
    numberContainer = "";
    operatorContainer = "";
    mathOp = "";
}

function handleClick(event) {
    // if button is a number
    if (!isNaN(event.target.innerText)) {
        if (display.innerText !== "0") {
            display.innerText += event.target.innerText;
        } else {
            display.innerText = event.target.innerText;
        }

        //cancel
    } else if (event.target.innerText === "C") {
        display.innerText = "0";
        reset()

        //backspace
    } else if (event.target.innerText === "←" && display.innerText !== "0") {
        if (display.innerText.length === 1 && display.innerText !== "0") {
            display.innerText = "0";
            operatorContainer = "";
        } else {
            display.innerText = display.innerText.slice(0, -1);
        }

        //math
    } else {
        handleOperator(event.target.innerText);
        if (event.target.innerText === "=") {
            //equals
            display.innerText = numberContainer;
            reset()
        }
    }
}

function handleOperator(operator) {
    if (numberContainer.length === 0) {
        console.log('zapisz liczbe i operator')
        operatorContainer = operator;
        numberContainer = Number(display.innerText);
        display.innerText = "0";

    } else {
        console.log('wykonaj dzialanie i zapisz liczbe')
        handleMath(operatorContainer);
        operatorContainer = operator;
    }
}

function handleMath(operator) {
    if (operator !== "=") {
        mathOp = operator;
        let tempNumber = Number(numberContainer);
        if (mathOp === "÷") {
            console.log('dzielenie')
            numberContainer = tempNumber / Number(display.innerText);
        } else if (mathOp === "×") {
            console.log('mnozenie')
            numberContainer = tempNumber * Number(display.innerText);
        } else if (mathOp === "-") {
            console.log('odejmowanie')
            numberContainer = tempNumber - Number(display.innerText);
        } else if (mathOp === "+") {
            console.log('dodawanie')
            numberContainer = tempNumber + Number(display.innerText);
        }
        display.innerText = "0";
        console.log(numberContainer)

    } else {
        console.log('wynik')
        if (display.innerText === "0") {
            display.innerText = numberContainer;
        } else {
            handleMath(mathOp);
            display.innerText = numberContainer;
            numberContainer = "";
        }
    }
}

buttons.addEventListener('click', handleClick)