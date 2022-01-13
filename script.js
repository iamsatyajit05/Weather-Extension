const locationOfUser = position => {
    const { latitude, longitude } = position.coords;
    fetch('https://api.opencagedata.com/geocode/v1/json?q='+latitude+'+'+longitude+'&key=e1dd5a47b0df4519a58e61f52c62d49a')
        .then(response => {
            return response.json()
        }).then(cityOfUser);
}

function cityOfUser(response) {
    getResults(response.results[0].components.city);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationOfUser, console.log);
}

const searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('keypress', getCity);

function getCity(e) {
    if (e.which == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&appid=fdf4dbd0ffcb93f8184f887e5681e258')
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.city');
    city.innerText = weather.name+', '+weather.sys.country;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = getDate(now);

    let weatherType = document.querySelector('.weatherType');
    weatherType.innerText = weather.weather[0].main;

    let weatherIcon = document.querySelector(".weatherIcon");
    weatherIcon.src = getIcon(weatherType.innerText, now);
    
    let temp = document.querySelector('.temperature');
    temp.innerHTML = Math.round(weather.main.temp)+'<span>°c</span>';

    let feelsLike = document.querySelector('.feelsLike');
    feelsLike.innerHTML = '<span class="smallText">Feels Like </span>'+Math.round(weather.main.feels_like)+'<span>°c</span>';

    let hiLow = document.querySelector('.hiLow');
    hiLow.innerHTML = '<span class="smallText">Low </span>'+Math.round(weather.main.temp_min)+'°c | <span class="smallText">High </span>'+Math.round(weather.main.temp_max)+'°c';
}

function getDate(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return day+' '+date+' '+month+' '+year;
}

function getIcon(weatherType, d) {
    let icon = "";

    switch (weatherType) {
        case "Smoke":
            icon = "icons/fog.png";
            return icon;

        case "Fog":
            icon = "icons/fog.png";
            return icon;

        case "Rain":
            icon = "icons/rain.png";
            return icon;

        case "Snow":
            icon = "icons/snow.png";
            return icon;

        case "Clouds":
            icon = "icons/clouds.png";
            return icon;

        case "Torando":
            icon = "icons/tornado.png";
            return icon;

        case "Thunderstrom":
            icon = "icons/thunderstrom.png";
            return icon;

        case "Haze":
            icon = "icons/haze.png";
            return icon;

        case "Drizzle":
            icon = "icons/drizzle.png";
            return icon;

        case "Sand":
            icon = "icons/sand.png";
            return icon;

        case "Dust":
            icon = "icons/sand.png";
            return icon;

        case "Squall":
            icon = "icons/squall.png";
            return icon;

        case "Clear":
            if (d.getHours() < 19) {
                icon = "icons/clearDay.png"
                return icon;
            }

            else {
                icon = "icons/clearNight.png";
                return icon;
            }
    }
}

