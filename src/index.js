import { validateIp } from './helpers'

window.addEventListener("DOMContentLoaded", () => {
  
  const btn = document.querySelector('.search-bar__btn')
  const searchInput = document.querySelector('.search-bar__input')

  if (btn) {
    btn.addEventListener('click', () => getData())
  } if (searchInput) {
    searchInput.addEventListener('keydown', handleKey)
  }

  function getData() {
    if(validateIp(searchInput.value)) {
      fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_tYZqqhiMxrew2hEX8fUEhp79mwUlG&ipAddress=${searchInput.value}`)
        .then(repsonse => repsonse.json())
        .then(console.log)
    }
  }
  
  function handleKey(e) {
    if(e.code === 'Enter') {
      getData()
    }
  }

});

