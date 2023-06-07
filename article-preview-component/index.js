const share = document.querySelector('.share')
const popUp = document.querySelector('.pop-up')
const hidden = document.querySelector('.hidden')

function clickShareImage (){
  popUp.classList.toggle('hidden')
}
share.addEventListener('click', clickShareImage)