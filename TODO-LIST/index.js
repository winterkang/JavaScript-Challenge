const toDoForm = document.querySelector('#todo-form')
const toDoInput = document.querySelector('#todo-form input')
const toDoList = document.querySelector('#todo-list')

let toDos = [] 

const TODOS_KEY = 'todos'
// 4. 로컬 스토리지에 저장
function saveToDos(){
  // JSON.stringify는 문자열로 바꾸는 것 
  // 왜? 로컬스토리지에서는 문자열밖에 저장을 못함
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

// 3. 삭제
function deleteTodo(event){
  // target은 HTML element인데 HTML element에는 하나 이상의 property가 있다 
  // parentElement/parentNode는 클릭된 event(li요소)의 부모 요소
  // innerText 해서 출력해보면 클릭된 li의 텍스트를 볼 수 있다.
  // console.dir(event.target.parentNode.innerText)
  const li = event.target.parentNode
  li.remove() // 화면상에서만 할 일 삭제
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)) // 6. 로컬에서 삭제
  // 사용자가 클릭한 li.id와 다른 toDo는 남김 ->
  // 기존의 toDos 배열에 삭제한 todo를 제외한 새 배열을 할당
  saveToDos() // 다시 로컬스토리지에 업데이트 해야함. -> 저장
}

 // 2. newTodo 값을 받아서 화면에 할 일 생성
function paintToDo(newTodo){
  const li = document.createElement('li') // li태그 생성
  // newTodoObj 객체를 전달받아 newTodo 인수로 받아와서 사용
  li.id = newTodo.id // newTodoObj의 id값을 가리킴
  const span = document.createElement('span') // span태그 생성
  span.innerText = newTodo.text 
  const button = document.createElement('button') // 삭제버튼 생성
  button.innerText = 'X'
  button.addEventListener('click', deleteTodo)
  // <ul><li><span></span></li></ul> 구조만들기
  li.appendChild(span)
  li.appendChild(button)
  toDoList.appendChild(li)
}

// 1. input 관리
function handleToDoSubmit(event){
  event.preventDefault() // 입력칸에 텍스트 입력 후 제출안되고 남아있음
  const newTodo = toDoInput.value // 입력칸 비우기 전 값을 newTodo변수에 저장하기 
  toDoInput.value = '' // 제출 후 입력칸 비우기
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), // 각 Todo에 대해 고유 번호 부여
  }
  toDos.push(newTodoObj) // 할 일을 배열에 push
  paintToDo(newTodoObj) // paintToDo 함수에 객체 형태로 보내기 ; 할 일을 화면에 그리기
  saveToDos() // 로컬 스토리지에서 아이템 가져오기
}
toDoForm.addEventListener('submit', handleToDoSubmit)


// 5. 로컬스토리지에서 아이템 가져오기
const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos){
  const parsedToDos = JSON.parse(savedToDos) // 배열로 가져오기 ; 문자열 -> 배열
  toDos = parsedToDos // 이전의 todo를 복원
  // 배열의 아이템을 하나씩 순회할 필요X
  // 왜? paintToDo라는 함수에서 할 일을 하나씩 생성할거니까
  parsedToDos.forEach(paintToDo) // 각각의 할 일에 대해서 실행
}
