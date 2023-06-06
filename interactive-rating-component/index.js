const buttons = document.querySelectorAll('.number-box button')
const submit = document.querySelector('.submit')
const box1 = document.querySelector('.box1')
const box2 = document.querySelector('.box2')
const result = document.querySelector('.result')
const score = document.querySelector('.score');
const goBack = document.querySelector('.go-back')

function clickSubmitButton(){
  box1.classList.add('hidden')
  box2.classList.remove('hidden')
  score.textContent = `You selected ${result.textContent} out of 5`;
}
submit.addEventListener('click', clickSubmitButton)

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    result.textContent = button.textContent
  })
})

function clickGoBackButton(){
  box2.classList.add('hidden')
  box1.classList.remove('hidden')
}
goBack.addEventListener('click', clickGoBackButton)
