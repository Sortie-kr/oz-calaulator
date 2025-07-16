let history = [];
let currentInput = "";
let firstNumber = null;
let operator = null;

const appendNumer = (number) => {
  try {
    if (!/^[0-9]$/.test(number)) {
      throw new Error("유효한 숫자를 입력하세요");
    }
    currentInput += number;

    const display = document.getElementById("display");
    if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
    display.textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};
const setOperator = (op) => {
  try {
    if (!["+", "-", "*", "/"].includes(op)) {
      throw new Error("유효한 연산자를 선택하세요.");
    }

    if (!currentInput) {
      throw new Error("숫자를 먼저 입력하세요.");
    }

    if (isNaN(firstNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    firstNumber = Number(currentInput);

    operator = op; // Null로 비워둔 operator에, 입력한 연산자를 넣겠다.
    currentInput = ""; //초기화
    document.getElementById("display").textContent = ""; //
  } catch (error) {
    showError(error.message);
  }
};

//초기화버튼 클릭 시
clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = "0";
  //기존의 결과값 히든
  document.getElementById("result").classList.add("d-none");
};

//계산 실행
const calculate = () => {
  const resultElement = document.getElementById("result");
  try {
    if (firstNumber === null || operator === null || !currentInput)
      throw new Error("계산에 필요한 값이 부족합니다.");

    const secondNumber = Number(currentInput);
    if (isNaN(secondNumber)) throw new Error("유효한 숫자를 입력하세요.");
    if (operator === "/" && secondNumber === 0)
      throw new Error("0으로 나눌 수 없습니다.");

    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      default:
        throw new Error("지원하지 않는 연산자입니다.");
    }

    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;

    const record = { firstNumber, operator, secondNumber, result };
    history.push(record);
    console.log("계산 기록:", JSON.stringify(history, null, 2));

    currentInput = result.toString();
    firstNumber = null;
    operator = null;
    document.getElementById("display").textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};

// HTML에서 <div id="history"></div> 추가 수
const updateHistory = () => {
  const historyEl = document.getElementById("history");
  if (!historyEl) return;

  historyEl.innerHTML = "<h4>기록:</h4>";
  history.forEach((record) => {
    const line = `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}`;
    const div = document.createElement("div");
    div.textContent = line;
    historyEl.appendChild(div);
  });
};

updateHistory();
