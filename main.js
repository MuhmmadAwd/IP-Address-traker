
const searchInput = document.querySelector(".search-input")
const ipInfoList = document.querySelector(".ip-info-list")
searchInput.addEventListener("change",handleClick)
let lat = null;
let lng = null;

getGeoData()

function handleClick(e){
    e.preventDefault()
    const IP = searchInput.value
    getGeoData(IP)
}

async function getGeoData(IP){
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RLFbXj6cXHFFTduIlpB1V2ChzRW3C&ipAddress=${IP || ""}`)
    const data = await res.json()  
    generateGeoHtml(data)
}

function generateGeoHtml(data){
    const {ip,isp,location} = data
    const{country,region,timezone} = location;
    lat = location.lat;
    lng = location.lng;
    console.log(lat,lng);

    ipInfoList.innerHTML = `
    <li class="ip-info-item"><span class="ip-info-item-title">IP Address</span> ${ip}</li>
    <li class="ip-info-item"><span class="ip-info-item-title">LOCATION</span> ${country}, ${region}</li>
    <li class="ip-info-item"><span class="ip-info-item-title">TIMEZONE</span> ${timezone}</li>
    <li class="ip-info-item"><span class="ip-info-item-title">ISP</span> ${isp}</li>
          `
    initMap()
}

function initMap(){
    let map = L.map('map', {
        center: [lat, lng],
        zoom: 8,
        scrollWheelZoom:true,
        keyboard: true
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '@muhmmadAwd - 2023',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
}




