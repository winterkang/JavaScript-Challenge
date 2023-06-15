// eval 메서드를 사용
const buttons = document.querySelectorAll('button')
const input = document.querySelector('.input')

operator = ['%', '.', '/', '*', '-', '+', '=']
output = ''

function calculate(btnValue){
  if (btnValue === 'C'){ // 초기화
      output = ''
  }else if (btnValue === 'D'){ // 삭제
      output = output.slice(0, -1)
  }else if (btnValue === '%'){ // 퍼센트 계산
    output = eval(output) / 100
  }else if (btnValue === '='){ // 결과 도출
    output = eval(output)
  }else{ // if 조건을 충족 못하면 button 이벤트 발생 시점으로 돌아가고 충족하면 다음 연산 실행
    if (btnValue === '' && operator.includes(btnValue)) return
    output += btnValue
  }
  input.value = output
}

// button을 눌렀을 때 발생하는 이벤트
buttons.forEach((button) => {
  button.addEventListener('click', (e) => calculate(e.target.dataset.value))
})


// 직접 계산 과정 구현 : 스택 (사칙연산)
