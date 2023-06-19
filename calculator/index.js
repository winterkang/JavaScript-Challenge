// // eval 메서드를 사용
// const buttons = document.querySelectorAll('button')
// const input = document.querySelector('.input')

// operator = ['%', '.', '/', '*', '-', '+', '=']
// output = ''

// function calculate(btnValue){
//   if (btnValue === 'C'){ // 초기화
//       output = ''
//   }else if (btnValue === 'D'){ // 삭제
//       output = output.slice(0, -1)
//   }else if (btnValue === '%'){ // 퍼센트 계산
//     output = eval(output) / 100
//   }else if (btnValue === '='){ // 결과 도출
//     output = eval(output)
//   }else{ // if 조건을 충족 못하면 button 이벤트 발생 시점으로 돌아가고 충족하면 다음 연산 실행
//     if (btnValue === '' && operator.includes(btnValue)) return
//     output += btnValue
//   }
//   input.value = output
// }

// // button을 눌렀을 때 발생하는 이벤트
// buttons.forEach((button) => {
//   button.addEventListener('click', (e) => calculate(e.target.dataset.value))
// })


// 직접 계산 과정 구현 : 스택 (사칙연산)
// 필요한 요소들을 가져옵니다.
const buttons = document.querySelectorAll('.number-button');
const input = document.querySelector('.input');

// 버튼 클릭 이벤트 처리
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // data-value 값 가져오기
    const value = button.dataset.value;
    
    if (value === '=') {
      // 등호 버튼일 경우 계산 결과를 출력합니다.
      const expression = input.value;
      const result = calculate(expression);
      input.value = result;
    } else if (value === 'C') {
      // C 버튼일 경우 입력값을 초기화합니다.
      input.value = '';
    } else if (value === 'D') {
      // D 버튼일 경우 마지막 입력값을 삭제합니다.
      input.value = input.value.slice(0, -1);
    } else {
      // 숫자나 연산자 버튼일 경우 입력값에 추가합니다.
      input.value += value;
    }
  });
});

// 계산 함수
function calculate(expression) {
  const tokens = tokenize(expression);
  const postfix = toPostfix(tokens);
  const result = evaluatePostfix(postfix);
  return result;
}

// 토큰화 함수
function tokenize(expression) {
  const tokens = [];
  let token = '';
  
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    
    if (!isNaN(char) || char === '.') {
      // 숫자나 소수점인 경우 토큰에 추가합니다.
      token += char;
    } else {
      // 연산자인 경우 이전까지의 토큰을 배열에 추가하고 연산자도 배열에 추가합니다.
      if (token !== '') {
        tokens.push(token);
        token = '';
      }
      tokens.push(char);
    }
  }
  
  if (token !== '') {
    tokens.push(token);
  }
  
  return tokens;
}

// 우선순위 반환 함수
function getPriority(operator) {
  if (operator === '*' || operator === '/') {
    return 2;
  } else if (operator === '+' || operator === '-') {
    return 1;
  } else {
    return 0;
  }
}

// 후위 표기법 변환 함수
function toPostfix(tokens) {
  const stack = [];
  const postfix = [];
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    
    if (!isNaN(token)) {
      // 숫자인 경우 바로 후위 표기법 배열에 추가합니다.
      postfix.push(token);
    } else if (token === '(') {
      // 여는 괄호인 경우 스택에 추가합니다.
      stack.push(token);
    } else if (token === ')') {
      // 닫는 괄호인 경우 여는 괄호가 나올 때까지 스택의 연산자를 후위 표기법 배열에 추가합니다.
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        postfix.push(stack.pop());
      }
      
      if (stack[stack.length - 1] === '(') {
        stack.pop(); // 여는 괄호를 제거합니다.
      }
    } else {
      // 연산자인 경우 스택의 우선순위가 높거나 같은 연산자들을 후위 표기법 배열에 추가한 뒤 현재 연산자를 스택에 추가합니다.
      while (stack.length > 0 && getPriority(stack[stack.length - 1]) >= getPriority(token)) {
        postfix.push(stack.pop());
      }
      
      stack.push(token);
    }
  }
  
  // 스택에 남아있는 연산자들을 후위 표기법 배열에 추가합니다.
  while (stack.length > 0) {
    postfix.push(stack.pop());
  }
  
  return postfix;
}

// 후위 표기법 계산 함수
function evaluatePostfix(postfix) {
  const stack = [];
  
  for (let i = 0; i < postfix.length; i++) {
    const token = postfix[i];
    
    if (!isNaN(token)) {
      // 숫자인 경우 스택에 추가합니다.
      stack.push(Number(token));
    } else {
      // 연산자인 경우 스택에서 숫자를 꺼내 연산을 수행한 뒤 결과를 다시 스택에 추가합니다.
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      
      let result;
      
      if (token === '+') {
        result = operand1 + operand2;
      } else if (token === '-') {
        result = operand1 - operand2;
      } else if (token === '*') {
        result = operand1 * operand2;
      } else if (token === '/') {
        result = operand1 / operand2;
      } else if (token === '%') {
        result = operand2 / 100
      }
      
      stack.push(result);
    }
  }
  
  return stack.pop();
}
