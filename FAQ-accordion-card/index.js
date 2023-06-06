const labelBox = document.querySelectorAll('.label-box')
const arrowIcon = document.querySelectorAll('.arrow-icon')


function clickArrowIcon (event){
  // currentLabelBox는 .label-box를 가리킴
  const currentLabelBox = event.currentTarget.parentNode
  // .label-box의 다음 형제 요소는 .hidden
  const hidden = currentLabelBox.nextElementSibling
  hidden.classList.toggle('hidden')

}
arrowIcon.forEach(icon => {
  icon.addEventListener('click', clickArrowIcon)
})