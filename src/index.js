import { validateIp } from './helpers'

window.addEventListener("DOMContentLoaded", () => {
  
  const btn = document.querySelector('.search-bar__btn')
  const searchInput = document.querySelector('.search-bar__input')
  
  const ipInfo = document.querySelector('#ip')
  const locationInfo = document.querySelector('#location')
  const timezoneInfo = document.querySelector('#timezone')
  const ispInfo = document.querySelector('#isp')

  if (btn) {
    btn.addEventListener('click', () => getData())
  } if (searchInput) {
    searchInput.addEventListener('keydown', (e) => handleKey(e))
  }

  const getData = () => {
    if (validateIp(searchInput.value)) {
      fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_tYZqqhiMxrew2hEX8fUEhp79mwUlG&ipAddress=${searchInput.value}`)
        .then(repsonse => repsonse.json())
        .then(setInfo)
    }
  }
  
  const handleKey = (e) => {
    if(e.code === 'Enter') {
      getData()
    }
  }

  const setInfo = data => {
    ipInfo.innerText = data.ip
    locationInfo.innerText = `${data.location.country} ${data.location.region} ${data.location.city}`
    timezoneInfo.innerText = data.location.timezone
    ispInfo.innerText = data.isp
  }

});

