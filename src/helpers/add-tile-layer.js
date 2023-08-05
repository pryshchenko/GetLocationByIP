import L from 'leaflet'

export const addTileLayer = (map) => {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    attribution: 'Coded by <a href="https://github.com/pryshchenko">pryshchenko</a>.'
  }).addTo(map);
}