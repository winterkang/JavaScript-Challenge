// 할 일 추가 : todo-box 클래스 추가
// 할 일 완료 : 글씨 누르면 line-through
// 할 일 삭제 : X 누르면 할 일 삭제
// 유효성 검사 : 아무것도 입력하지 않고 제출한 경우 경고창 뜨기
// 엔터키 눌렀을 때도 할 일 추가 가능

const inputTodo = document.querySelector('.input-form input:first-child')
const submitButton = document.querySelector('.input-form input:last-child')
const todoContent = document.querySelector('.content')

const TODOS_KEY = 'todos'
const toDos = [] 
function saveTodo(){
  // 객체나 배열을 문자열로 변환 > 로컬 스토리지는 문자열밖에 저장못함
  // 배열의 구조와 데이터가 그대로 보존됨
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}


function createTodo(e){
  const todo = inputTodo.value.trim() // 입력 값의 앞뒤 공백 제거
  if (todo.length === 0){  // 입력값이 없는데 제출한 경우
     return alert('할 일을 입력해주세요')
  }else{
    const div = document.createElement('div')
    div.classList.add('todo-box')

    const p = document.createElement('p')
    p.textContent = todo

    const span = document.createElement('span')
    span.classList.add('delete')
    span.textContent = 'X'

    div.append(p, span)
    todoContent.appendChild(div)

    inputTodo.value = '' // 할 일 추가후 입력필드 초기화

    // 완료
    p.addEventListener('click', completeTodo)
    // 삭제
    span.addEventListener('click', deleteTodo)
    p.addEventListener('dblclick', deleteTodo)

    // 로컬 스토리지에 저장
    toDos.push(todo)
    saveTodo()
  } 
  // handleEvent()
}

// 엔터키 눌렀을 때
function handleKeydown(event){
  if (event.key == 'Enter'){
    createTodo()
  }
}

// this 키워드는 직접적으로 대상을 가르킨다!
// 할 일 완료
function completeTodo(){
  this.style.textDecoration = 'line-through'
} 
// 할 일 삭제
function deleteTodo(){
  
  const todoBox = this.parentNode
  // event.parentNode는 div
  todoBox.parentNode.removeChild(todoBox)
}

// click or keydown
// function handleEvent(event){
//   if (event.type == 'click'){
//     createTodo()
//   }else if (event.type == 'keydown'){
//     createTodo()
//   }
// }
// 이벤트 실행
submitButton.addEventListener('click', createTodo) 
// inputTodo.addEventListener('keydown', handleKeydown)

