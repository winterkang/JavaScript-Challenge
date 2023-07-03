// date
const dateElement = document.querySelector('.date')
function todayIsDate(){
  let today = new Date()
  const year = today.getFullYear()
  const date = today.getDate()
  const month = today.getMonth() + 1
  const day = today.getDay()
  dayObj = {
    0 : 'Sun',
    1 : 'Mon',
    2 : 'Tue',
    3 : 'Wed',
    4 : 'Thu',
    5 : 'Fri',
    6 : 'Sat',
  }
  let whichDay;
  for (obj in dayObj){
    if (day === parseInt(obj)){
     whichDay = dayObj[obj] 
    } 
  }

  monthObj = {
    1 : 'Jan.',
    2 : 'Feb.',
    3 : 'Mar.',
    4 : 'Apr.',
    5 : 'May.',
    6 : 'Jun.',
    7 : 'Jul.',
    8 : 'Aug.',
    9 : 'Sep.',
    10 : 'Oct.',
    11 : 'Nov.',
    12 : 'Dec.',
  }
  let whichMonth;
  for (obj in monthObj){
    if (month === parseInt(obj)){
      whichMonth = monthObj[obj]
    }
  }
  dateElement.textContent = `${whichDay} ${whichMonth} ${date} ${year}`
}
window.addEventListener('DOMContentLoaded', todayIsDate)

// weather
const API_KEY = 'fe6747b364df4e73f771db6fb583f92d'

function success(position){
  let weatherIcon = {

  }
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const weather = document.querySelector('.today-weather span:nth-of-type(2)')
    const city = document.querySelector('.location span:first-child')
    const temp = document.querySelector('.today-weather span:first-child')
    const humidity = document.querySelector('.today-weather span:last-child')
    const iconEle = document.createElement('img')
    const weatherIcon = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`
    iconEle.src = iconUrl
    temp.innerHTML = ''
    temp.prepend(iconEle)
    temp.append(`${parseInt(data.main.temp)} °C`)
    city.innerText = data.name
    weather.innerText = data.weather[0].description
    humidity.innerHTML = `${data.main.humidity}% Humidity`
    
  })
}
function error(){
  alert('죄송합니다. 위치 정보를 사용할 수 없습니다.')
}
navigator.geolocation.watchPosition(success, error)

// music player
