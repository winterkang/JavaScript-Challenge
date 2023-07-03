const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const CANVASE_WIDTH = 700
const CANVAS_HEIGHT = 700
canvas.width = CANVASE_WIDTH
canvas.height = CANVAS_HEIGHT

// painting
const lineWidth = document.querySelector('#line-width')
const color = document.querySelector('#color')
const colorOptions = document.querySelectorAll('.color')
const modeBtn = document.querySelector('#mode-btn')
const clear = document.querySelector('#clear')
const erase = document.querySelector('#eraser')

ctx.beginPath()
let isPainting = false
let isFilling = false

ctx.lineWidth = lineWidth.value
ctx.strokeStyle = color.value
function onMouseMove(e){
  if (isPainting){
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    // return은 함수를 즉시 종료하는 역할을 하는데 return의 유무가 동작에 영향을 미치지는 않지만
    // 유지보수와 가독성에 영향을 미치기 떄문에 작성하는것이 권장된다.
    return
  }
  ctx.moveTo(e.offsetX, e.offsetY)
}
function startPainting(){
  isPainting = true
}
function endpainting(){
  isPainting = false
  ctx.beginPath() // 그리기 동작이 끝나면 초기화 (선 굵기를 업데이트 하기 위함)
}

function onLineWidthChange(e){
  ctx.lineWidth = e.target.value
}
function onColorChange(e){
  ctx.strokeStyle = e.target.value
  ctx.fillStyle = e.target.value
}
function onClickColor(e){
  const dataSetColor = e.target.dataset.color
  ctx.strokeStyle = dataSetColor
  ctx.fillStyle = dataSetColor
  color.value =  dataSetColor
}
function onModeClick(){
  if (isFilling){
    isFilling = false
    modeBtn.innerText = 'Draw'
  }else{
    isFilling = true
    modeBtn.innerText = 'Fill'
  }
}
function onCanvasClick(){
  if (isFilling){
    ctx.fillRect(0, 0, CANVASE_WIDTH, CANVAS_HEIGHT)
  }
}
function onClearClick(){
  ctx.fillRect(0, 0, CANVASE_WIDTH, CANVAS_HEIGHT)
  ctx.fillStyle = 'white'
}
function onEraserClick(){
  ctx.strokeStyle = 'white'
  isFilling = false
  modeBtn.innerText = 'Draw'
}

canvas.addEventListener('mousemove', onMouseMove)
canvas.addEventListener('mousedown', startPainting)
canvas.addEventListener('click', onCanvasClick)

// mouseup 이벤트만 실행하면 캔버스를 벗어나도 그리기 상태가 유지되는 버그가 발생한다.
// mouseleave 이벤트를 설정하여 마우스가 캔버스를 벗어날 경우 그리기 동작을 멈추도록 할 필요가 있다.
canvas.addEventListener('mouseup', endpainting)
canvas.addEventListener('mouseleave', endpainting)
lineWidth.addEventListener('change', onLineWidthChange)
color.addEventListener('change', onColorChange)
colorOptions.forEach(colorOption => colorOption.addEventListener('click', onClickColor))
modeBtn.addEventListener('click', onModeClick)
clear.addEventListener('click', onClearClick)
erase.addEventListener('click', onEraserClick)

// meme maker
ctx.beginPath()
ctx.lineCap = 'round' // 선의 끝이 둥글게
const imgFile = document.querySelector('#file')

function onFileChange(e){
  const file = e.target.files[0] // file이름
  const url = URL.createObjectURL(file) // 이미지 파일 주소 생성
  const image = new Image() // JS에서 img 태그 생성
  image.src = url
  image.onload = function (){
    ctx.drawImage(image, 0, 0, CANVASE_WIDTH, CANVAS_HEIGHT)
    imgFile.value = null
    URL.revokeObjectURL(url); // 사용이 끝난 URL 해제
  }
}
imgFile.addEventListener('change', onFileChange)

// text
const textInput = document.querySelector('#text')
function onDoubleClick(e){
  const text = textInput.value
  if (text !== ''){
    ctx.save() // ctx 저장
    ctx.lineWidth = 1
    ctx.font = '48px serif'
    ctx.fillText(text, e.offsetX, e.offsetY)
    ctx.restore() // ctx 재개
  }
}
canvas.addEventListener('dblclick', onDoubleClick)

// 저장
const save = document.querySelector('#save')
function onSaveClick(e){
  const url = canvas.toDataURL()
  // html의 a태그를 만드는 것과 동일
  const a = document.createElement('a')
  a.href = url
  a.download = 'myDrawing.png'
  a.click()
}
save.addEventListener('click', onSaveClick)