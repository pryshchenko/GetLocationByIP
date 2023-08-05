import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { validateIp, addTileLayer, addOffset } from './helpers'
import icon from '../images/icon-location.svg'

window.addEventListener("DOMContentLoaded", () => {
  
  const btn = document.querySelector('.search-bar__btn')
  const searchInput = document.querySelector('.search-bar__input')
  
  const ipInfo = document.querySelector('#ip')
  const locationInfo = document.querySelector('#location')
  const proxy = document.querySelector('#proxy')
  const ispInfo = document.querySelector('#isp')

  if (btn) {
    btn.addEventListener('click', () => getData())
  } if (searchInput) {
    searchInput.addEventListener('keydown', (e) => handleKey(e))
  }

  const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
  })

  const mapArea = document.querySelector('.map')
  const map = L.map(mapArea, {
    center: [50.45466, 30.5238],
    zoom: 13,
  })

  addTileLayer(map)

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
    console.log(data)
    const { country, region, city, lat, lng } = data.location
    ipInfo.innerText = data.ip
    locationInfo.innerText = `${country} ${region} ${city}`
    ispInfo.innerText = data.isp
    proxy.innerText = (data.proxy.proxy || data.proxy.tor || data.proxy.vpn) ? 'Есть' : 'Нету'
    map.setView([lat, lng])
    L.marker([lat, lng], {icon: markerIcon}).addTo(map)
    
    if (matchMedia("(max-width: 1023px)").matches) {
      addOffset(map)
    }
  }
});

