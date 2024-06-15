// Functions
const add = (n1, n2) => n1 + n2;

const subtract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => (n2 !== 0 ? n1 / n2 : "NaN");

const mod = (n1, n2) => n1 % n2;

const operate = (operator, n1, n2) => {
    let result;

    switch (operator) {
        case "add":
            result = add(n1, n2);
            break;
        case "subtract":
            result = subtract(n1, n2);
            break;
        case "multiply":
            result = multiply(n1, n2);
            break;
        case "divide":
            result = divide(n1, n2);
            break;
        case "mod":
            result = mod(n1, n2);
            break;
        default:
            result = null;
            break;
    }

    return roundIfDecimal(result, 2);
};

const roundIfDecimal = (num, decimalPlaces) => {
    if (Number.isInteger(num)) {
        return num;
    } else {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(num * factor) / factor;
    }
};

const checkDot = (num) => num.includes(".");

// Calculator logic - Limit to a maximum of 9 digits
let textField = "";
let num1 = null;
let num2 = null;
let result = null;
let operator = "";

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

// Add buttons to display and updates each time any .number-dot button gets clicked
buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const className = event.target.classList[1];
        const id = event.target.id;

        if (id === "cancel") {
            textField = "";
            num1 = null;
            num2 = null;
            operator = "";
            display.innerHTML = 0;
        } else if (className === "number-decimal" && id !== "decimal") {
            textField += id;
            display.innerHTML = textField;
        } else if (
            className === "number-decimal" &&
            id === "decimal" &&
            !checkDot(textField)
        ) {
            textField += ".";
            display.innerHTML = textField;
        } else if (
            ["add", "subtract", "multiply", "divide", "mod"].includes(id)
        ) {
            if (num1 === null) {
                num1 = parseFloat(textField);
            } else if (operator) {
                num2 = parseFloat(textField);
                num1 = operate(operator, num1, num2);
            }
            operator = id;
            textField = "";

            if (id === "add") {
                display.innerHTML = "+";
            } else if (id === "subtract") {
                display.innerHTML = "-";
            } else if (id === "multiply") {
                display.innerHTML = "*";
            } else if (id === "divide") {
                display.innerHTML = "/";
            } else if (id === "mod") {
                display.innerHTML = "%";
            }
        } else if (id === "equal") {
            num2 = parseFloat(textField);

            if (operator && num1 !== null) {
                result = operate(operator, num1, num2);
                num1 = result;
                display.innerHTML = num1;
                textField = "";
                operator = "";
            }
        } else if (id === "negate") {
            textField = (parseFloat(textField) * -1).toString();
            display.innerHTML = textField;
        }
    });
});
