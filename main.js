const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal-to");
const clearButton = document.querySelector(".clear");
const allClearButton = document.querySelector(".all-clear");

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (array) {
  return array.reduce((total, current) => {
    return total + current;
  }, 0);
};

const multiply = function (array) {
  return array.reduce((total, current) => {
    return total * current;
  }, 0);
};

const power = function (base, power) {
  return base ** power;
};

const factorial = function (int) {
  if (int === 0 || int === 1) return 1;
  else return int * factorial(int - 1);
};

const factorialLoop = function (int) {
  let answer = 1;
  if (int === 0 || int === 1) return 1;
  for (let i = int; i > 0; i--) {
    answer *= i;
  }
  return answer;
};
