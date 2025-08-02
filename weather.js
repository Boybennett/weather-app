// 0784922728f5d36d16bcfe4d4d29abcc my api key

const date = document.getElementById('date')
const city = document.getElementById('city')
const country = document.getElementById('country')
const temp = document.getElementById('temp')
const tempImg = document.getElementById('tempimg')
const description = document.getElementById('description')
const tempMax = document.getElementById('tempmax')
const tempMin = document.getElementById('tempmin')
const searchIcon = document.getElementById('searchicon')
const searchBarInput = document.getElementById('searchbarinput')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let dateObj = new Date() // creates a date object with methods that i can access to get current date and time
let month = months[dateObj.getUTCMonth()]
let day = dateObj.getUTCDate()
let year = dateObj.getUTCFullYear()
let hours = dateObj.getUTCHours()
let minutes = dateObj.getUTCMinutes()

date.innerHTML = `${day} ${month}, ${year} ${hours}:${minutes} UTC`

const fetchedWeatherData = async () => {
    try {
        const cityName = document.getElementById('searchbarinput').value
        const fetchedData = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0784922728f5d36d16bcfe4d4d29abcc`, {
            headers: {
                Accept: "application/json"
            }
        })
        console.log(fetchedData.status)
        const newFetchedData = await fetchedData.json()
        console.log(newFetchedData)
        city.innerHTML = newFetchedData.name;
        country.innerHTML = newFetchedData.sys.country
        tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${newFetchedData.weather[0].icon}.png" />`
        description.innerHTML = newFetchedData.weather[0].description
        temp.innerHTML = `${Math.round(newFetchedData.main.temp - 273.15)}°C` // Math.round() rounds a number to the nearest integer
        tempMax.innerHTML = `${Math.round(newFetchedData.main.temp_max - 273.15)}°C`
        tempMin.innerHTML = `${Math.floor(newFetchedData.main.temp_min - 273.15)}°C`
    }

    catch (error) {
        console.log(error)
    }
}

searchBarInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        fetchedWeatherData()
    }
})

searchIcon.addEventListener('click', fetchedWeatherData)
// searchBarInput.value