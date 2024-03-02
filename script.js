// light dark theme

const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => {
    toggleElement.classList.toggle("themes__toggle--isActive");
};

const toggleDarkThmeeWithEnter = (event) => {
    if (event.key === "Enter") {
        toggleDarkTheme();
    }
};

// const toggleDarkThmeeWithEnter = (event) => (event.key === "Enter") && toggleDarkTheme();
toggleElement.addEventListener("keydown", toggleDarkThmeeWithEnter);

toggleElement.addEventListener("click", toggleDarkTheme);

//create logic

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");
const updateUi = (value) => {
    resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {

    if (value === "." && currentNumber.includes(".")) return;
    if (value === "." && !currentNumber) return;
    currentNumber += value;
    updateUi(currentNumber);
}
// reset button function
const resetButtonHandler = () => {
    storedNumber = "";
    currentNumber = "";
    operation = "";
    updateUi(currentNumber);
};
// end reset buttton function

// delete button function
const deleteButtonHandler = () => {
    if (!currentNumber || currentNumber === "0") return;
    if (currentNumber.length === 1) {
        currentNumber = "";
        updateUi(currentNumber);
    } else {
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        updateUi(currentNumber);
    }
};
// end delete button function

// operations  buttons handler
const excuteOperation = () => {

    if (currentNumber && storedNumber && operation) {
        switch (operation) {
            case "+":
                storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
                break;
            case "-":
                storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
                break;
            case "/":
                storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
                break;
            case "*":
                storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
                break;
        }
        currentNumber = "";
        updateUi(storedNumber);
    }
};
const operationButtonHandler = (operationValue) => {
    if (!storedNumber && !currentNumber) return;
    if (currentNumber && !storedNumber) {
        storedNumber = currentNumber;
        currentNumber = "";
        operation = operationValue;
    } else if (storedNumber) {
        operation = operationValue;
        if (currentNumber) excuteOperation();
    }
};
// operations  buttons handler
keyElements.forEach((element) => {
    element.addEventListener("click", () => {
        const type = element.dataset.type;
        if (type === "number") {
            numberButtonHandler(element.dataset.value);
        } else if (type === "operation") {
            switch (element.dataset.value) {
                case "c":
                    resetButtonHandler();
                    break;
                case "Backspace":
                    deleteButtonHandler();
                    break;
                case "Enter":
                    excuteOperation();
                    break;
                default:
                    operationButtonHandler(element.dataset.value);
            }
        };
    });
});

// use keyboard as input source
const availableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".",]
const availableOperations = ["+", "-", "*", "/"];
const availableKeys = [...availableNumbers, ...availableOperations, "c", "Enter", "Backspace"];
window.addEventListener("keydown", (event) => {
    keyboardWithHover(event.key);
});

// const keyboardWithoutHover = (key) => {
//     if (availableNumbers.includes(key)) {
//         numberButtonHandler(key);

//     } else if (availableOperations.includes(key)) {
//         operationButtonHandler(key);
//     } else if (key === "Backspace") {
//         deleteButtonHandler();
//     } else if (key === "Enter") {
//         excuteOperation();
//     } else if (key === "c") {
//         resetButtonHandler();
//     }
// };

const keyboardWithHover = (key) => {
    if (availableKeys.includes(key)) {
        const elem = document.querySelector(`[data-value="${key}"]`);
        elem.classList.add("hover");
        elem.click();
        setTimeout(() => elem.classList.remove("hover"), 150);
    }
};
