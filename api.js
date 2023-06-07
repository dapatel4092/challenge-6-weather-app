var apiKey = "c3feab0bb593e4760fbae7d9f3259dcf"


var searchWeather = document.getElementById("search-weather");

searchWeather.addEventListener("click", function(event) {
    event.preventDefault();
    var city = document.getElementById("city-input").value
    getForecast(city)
    var storedVal = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    storedVal.push(city)
    localStorage.setItem("weather-dashboard", JSON.stringify(storedVal))
    dashboardW()
})

function getForecast(city) {
    var Url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    fetch(Url)
        .then(response => response.json())
        .then(apiData => {
            console.log(apiData)
            var HTMLCode = ""
            for (let i = 0; i < apiData.list.length; i = i + 8) {
                HTMLCode += `
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${dayjs(apiData.list[i].dt_txt).format("MM/DD/YYYY")}</h4>
                        <p>Temperature: ${apiData.list[i].main.temp}°F<span>
                        <img src="https://openweathermap.org/img/wn/${apiData.list[i].weather[0].icon}@2x.png" /></span>
                        </p>
                        <p>Wind: ${apiData.list[i].wind.speed} MPH</p>
                        <p>Humidity: ${apiData.list[i].main.humidity}%</p>
                    </div>
                </div>
                `
            }
            document.getElementById("forecast").innerHTML = HTMLCode
        })
}

dashboardW()

function dashboardW() {
    var storedVal = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    var htmlButton = ""
    for (let i = 0; i < storedVal.length; i++) {
        htmlButton += `<button class="history-btn btn-history">${storedVal[i]}</button>`
    }
    document.getElementById("history").innerHTML = htmlButton
    var searchBtnList = document.querySelectorAll(".history-btn")
    searchBtnList.forEach(element => element.addEventListener("click", getStoredCityForecast))
}

function getStoredCityForecast() {
    var city = this.textContent
    getForecast(city)
}

function getcurrentForecast(){
    var renderCurrentWeather = this.textContent
}
