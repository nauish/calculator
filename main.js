class Calculator {
  constructor(previousOperantHTML, currentOperantHTML) {
    this.previousOperantHTML = previousOperantHTML;
    this.currentOperantHTML = currentOperantHTML;
    this.allClear();
  }

  // Clear all numbers on screen and operations
  allClear() {
    this.currentOperant = "";
    this.previousOperant = "";
    //
  }

  // Delete the last digit
  clear() {
    if (this.currentOperant > 0) {
      this.currentOperant = this.currentOperant.toString().slice(0, -1);
    } else {
      this.currentOperant = Math.ceil(this.currentOperant / 10).toString();
    }
  }

  clickNumbers(number) {
    // Clear out computed number if no operation button is pressed
    if (typeof this.currentOperant === "number") {
      this.allClear();
    }
    // Prevent multiple dots
    if (this.currentOperant.includes(".") && number === ".") return;
    // Concatenate strings instead of adding it up
    this.currentOperant = this.currentOperant.toString() + number.toString();
    if (
      this.currentOperant[0] == "0" &&
      this.currentOperant[1] in [1, 2, 3, 4, 5, 6, 7, 8, 9, 9]
    ) {
      this.currentOperant = this.currentOperant.slice(1);
    }
  }

  clickOperation(operator) {
    // If no value, return
    if (this.currentOperant === "") return;
    // Check if the clicked operator is different from the current operator, if different, compute the result
    if (this.operator !== operator) {
      this.compute();
      this.operator = operator;
    }
    // If already an operant, compute
    if (this.previousOperant) this.compute();
    // Move the number before clicking the operation button to previous operant
    this.previousOperant = this.currentOperant + ` ${operator} `;
    // Clear out the operant that has been moved
    this.currentOperant = "";
  }

  compute() {
    let result;
    const previousOperant = parseFloat(this.previousOperant);
    const currentOperant = parseFloat(this.currentOperant);
    if (isNaN(previousOperant) || isNaN(currentOperant)) return;
    switch (this.operator) {
      case "+":
        result = previousOperant + currentOperant;
        break;
      case "-":
        result = previousOperant - currentOperant;
        break;
      case "x":
        result = previousOperant * currentOperant;
        break;
      case "÷":
        result = previousOperant / currentOperant;
        break;
      default:
        return;
    }
    // Display result on currentOperant
    this.currentOperant = +result.toFixed(10);
    this.previousOperant = "";
  }

  refreshOutput() {
    this.previousOperantHTML.innerText = this.previousOperant;
    this.currentOperantHTML.innerText = this.currentOperant;
  }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const allClearButton = document.querySelector(".all-clear");
const previousOperantHTML = document.querySelector(".previous-operant");
const currentOperantHTML = document.querySelector(".current-operant");

const calculator = new Calculator(previousOperantHTML, currentOperantHTML);

document.addEventListener("keydown", (event) => {
  const allowedNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  if (event.key in allowedNumbers) {
    calculator.clickNumbers(event.key);
  } else if (event.key == ".") {
    calculator.clickNumbers(".");
  } else if (event.key === "+" || event.key === "-") {
    calculator.clickOperation(event.key);
  } else if (event.key === "x" || event.key === "*") {
    calculator.clickOperation("x");
  } else if (event.key === "/") {
    calculator.clickOperation("÷");
  } else if (event.key === "Enter") {
    calculator.compute();
  } else if (event.key === "Backspace" || event.key === "Delete") {
    calculator.clear();
  }
  calculator.refreshOutput();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.clickNumbers(button.innerText);
    calculator.refreshOutput();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.clickOperation(button.innerText);
    calculator.refreshOutput();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.refreshOutput();
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
  calculator.refreshOutput();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.refreshOutput();
});
