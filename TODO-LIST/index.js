const input = document.querySelector('.input-form input:first-child')
const button = document.querySelector('.input-form input:last-child')
const box = document.querySelector('.content')

// 키보드 or 버튼 클릭
function handleEvent(event){
  if(event.type === 'click'){
    createTodoList()
    event.preventDefault()
  }else if ((event.type === 'keypress') && (event.key === 'Enter')){
    createTodoList()
    event.preventDefault()
  }
}
// 투두리스트 생성
function createTodoList(){
  const todo = input.value.trim()
  input.value = '' // 초기화

  if (todo.length === 0){
    return alert('할 일을 입력하세요')
  }else{  // input 폼에 할 일을 입력한 후 엔터 또는 버튼을 눌렀을 때, 할 일 생성
    const div = document.createElement('div')
    div.className = 'todo-box'

    // 현재 시간을 기준으로 고유 id생성
    const todoId = 'todo-list-' + Date.now()
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.id = todoId 

    const label = document.createElement('label')
    label.htmlFor = todoId
    label.textContent = todo

    const span = document.createElement('span')
    span.className = 'delete'
    span.textContent = 'X'

    box.appendChild(div)
    div.append(checkBox, label, span)

    // 삭제 이벤트 실행
    span.addEventListener('click', deleteTodoList)
  }
}
// 이벤트 리스너 실행
button.addEventListener('click', createTodoList)
input.addEventListener('keypress', handleKeyEvent)


// 할 일 삭제 ('X' 표시 선택시)
function deleteTodoList(){
  // this는 span을 가리킨다.
  const todoBox = this.parentNode
  todoBox.remove()
}

// 키보드 이벤트
function handleKeyEvent(event){
  if (event.key === 'Enter'){
    createTodoList()
  }
}
