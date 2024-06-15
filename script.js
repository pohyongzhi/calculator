// Functions
const add = (n1, n2) => {
    return n1 + n2;
};

const subtract = (n1, n2) => {
    return n1 - n2;
};

const multiply = (n1, n2) => {
    return n1 * n2;
};

const divide = (n1, n2) => {
    return n1 / n2;
};

const operate = (operator) => {
    if (operator === "add") {
        add();
    } else if (operator === "subtract") {
        subtract();
    } else if (operator === "multiply") {
        multiply();
    } else if (operator === "divide") {
        divide();
    }
};

// Calculator logic - Limit to a maximum of 9 digits
let textField = "";
let num1 = 0;
let num2 = 0;
let result = 0;
let operator = "";

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

// Add buttons to display and updates each time any .number-dot button gets clicked
buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const className = event.target.classList[1];
        const id = event.target.id;

        if (id === "cancel") {
            textField = 0;
            display.innerHTML = textField;
        } else if (className === "number-decimal" && id !== "decimal") {
            textField += id;
            display.innerHTML = textField;
        } else if (className === "number-decimal" && id === "decimal") {
            textField += ".";
            display.innerHTML = textField;
        }

        if (id === "add") {
            num1 = parseFloat(textField);
            operator = "+";
            textField = "";
            display.innerHTML = operator;
        }
        if (id === "subtract") {
            num1 = parseFloat(textField);
            operator = "-";
            textField = "";
            display.innerHTML = operator;
        }
        if (id === "multiply") {
            num1 = parseFloat(textField);
            operator = "*";
            textField = "";
            display.innerHTML = operator;
        }
        if (id === "divide") {
            num1 = parseFloat(textField);
            operator = "/";
            textField = "";
            display.innerHTML = operator;
        }

        if (id === "equal") {
            num2 = parseFloat(textField);

            switch (operator) {
                case "+":
                    result = add(num1, num2);
                    break;
                case "-":
                    result = subtract(num1, num2);
                    break;
                case "*":
                    result = multiply(num1, num2);
                    break;
                case "/":
                    result = divide(num1, num2);
                    break;
            }

            num1 = result;
            display.innerHTML = num1;
        }
    });
});
