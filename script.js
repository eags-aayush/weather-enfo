const settingsIcon = document.getElementById('settingsIcon');
const navLinks = document.getElementById('navLinks');
const icon = document.querySelector("#icon");

settingsIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    icon.classList.toggle("fa-xmark");
});

//temperature
let tempSelectedUnit = "c"; // Default

const tempUnitButtons = document.querySelectorAll(".temp-unit");

tempUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        tempUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        tempSelectedUnit = button.dataset.unit;
        console.log("Selected:", tempSelectedUnit);
    });
});

//time
let timeSelectedUnit = "12";

const timeUnitButtons = document.querySelectorAll(".time-unit");

timeUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        timeUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        timeSelectedUnit = button.dataset.unit;
        console.log("Selected:", timeSelectedUnit);
    });
});

//distance
let distanceSelectedUnit = "km";

const distanceUnitButtons = document.querySelectorAll(".distance-unit");

distanceUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        distanceUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        distanceSelectedUnit = button.dataset.unit;
        console.log("Selected:", distanceSelectedUnit);
    });
});

//pressure
let pressureSelectedUnit = "mb";

const pressureUnitButtons = document.querySelectorAll(".pressure-unit");

pressureUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        pressureUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        pressureSelectedUnit = button.dataset.unit;
        console.log("Selected:", pressureSelectedUnit);
    });
});

//theme
let themeSelectedUnit = "light";

const themeUnitButtons = document.querySelectorAll(".theme-unit");

themeUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        themeUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        themeSelectedUnit = button.dataset.unit;
        console.log("Selected:", themeSelectedUnit);
    });
});





const apikey = "4c388691b46f47fdb0b93122253101";

const locationValue = document.querySelector(".location-input");
const btn = document.querySelector(".click");

let deg = "°C";
let speed = "kph";
let pressure = "mb";


//Hero section
let locationArea = document.querySelector(".location");
let temp = document.querySelector(".temp");
let weather_condition = document.querySelector(".weather-condition");
let high = document.querySelector(".high-info");
let low = document.querySelector(".low-info");
let feels = document.querySelector(".feels-info");
let hero_icon = document.querySelector(".hero-icon");

//Hour forcast section
let forcastTime = document.querySelector(".time"); 
let forcastImg = document.querySelector(".forcast>img");
let forcastTemp = document.querySelector(".hour-temp");

//Info section
let aqi = document.querySelector(".aqi-info");
let uv = document.querySelector(".uv-info");
let humidity = document.querySelector(".humidity-info");
let precipitation = document.querySelector(".precipitation-info");
let wind = document.querySelector(".wind-info");
let dew = document.querySelector(".dew-info");
let pressurue = document.querySelector(".pressure-info");
let visibility = document.querySelector(".visibility-info");

//Sun section
let sunrise = document.querySelector(".sunrise-info");
let sunset = document.querySelector(".sunset-info");

//Sun section
let moonrise = document.querySelector(".moonrise-info");
let moonset = document.querySelector(".moonset-info");
let mooninfo = document.querySelector(".moonstate-info");
let moonimg = document.querySelector(".moonstate-img");

//Alert section
let alertTitle = document.querySelector(".alert>span");

//Defualt state
window.onload = () => {
    fetchWeather();
};

//Toggling skeleton mode
const skeleton = () => {
    //Hero section
    locationArea.classList.toggle("skeleton");
    temp.classList.toggle("skeleton");
    weather_condition.classList.toggle("skeleton");
    high.classList.toggle("skeleton");
    low.classList.toggle("skeleton");
    feels.classList.toggle("skeleton");
    hero_icon.classList.toggle("hidden");
    hero_icon.classList.toggle("skeleton");

    //Hour forecast section
    document.querySelector(".hour-forcast-container").classList.toggle("skeleton");

    //Info section
    aqi.classList.toggle("skeleton");
    uv.classList.toggle("skeleton");
    humidity.classList.toggle("skeleton");
    precipitation.classList.toggle("skeleton");
    wind.classList.toggle("skeleton");
    dew.classList.toggle("skeleton");
    pressurue.classList.toggle("skeleton");
    visibility.classList.toggle("skeleton");

    //Sun section
    sunrise.classList.toggle("skeleton");
    sunset.classList.toggle("skeleton");

    //Sun section
    moonrise.classList.toggle("skeleton");
    moonset.classList.toggle("skeleton");
    moonimg.classList.toggle("hidden");
    moonimg.classList.toggle("skeleton");
    mooninfo.classList.toggle("skeleton");
};

//Fetching weather data
async function fetchWeather(){
    try{
        skeleton();
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey} &q=${locationValue.value}&days=1&aqi=yes&alerts=yes`;
        const response = await fetch(url);
        const data = await response.json();
        weatherData = data;
        console.log(data);

        useWeatherData();
    } catch(err) {
        console.error('Got an error:', err);     
    }
}

//Using weather data

const hero = () => {
    locationArea.innerText = weatherData.location.name+", "+weatherData.location.country;
    temp.innerText = `${weatherData.current['temp_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;
    weather_condition.innerText = weatherData.current.condition.text;
    temp.innerText = `${weatherData.current['temp_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;
    high.innerText = `${weatherData.forecast.forecastday[0].day['maxtemp_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;
    low.innerText = `${weatherData.forecast.forecastday[0].day['mintemp_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;
    feels.innerText = `${weatherData.current['feelslike_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;
    hero_icon.childNodes[1].src = weatherData.current.condition.icon;
    themeSelectedUnit === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");    
};

const hourForcast = () => {

    document.querySelector(".hour-forcast-container").innerHTML = "";

    let currTime = new Date().getHours();

    for(time of weatherData.forecast.forecastday[0].hour){
        if(time.time.slice(11,13) >= currTime){

            const newDiv = document.createElement("div");
            newDiv.className = "forcast";
            document.querySelector(".hour-forcast-container").appendChild(newDiv);

            const newTime = document.createElement("span");
            newTime.className = "time";
            newTime.textContent = time.time.slice(11,16);
            newDiv.appendChild(newTime);

            const newImg = document.createElement("img");
            newImg.src = time.condition.icon;
            newDiv.appendChild(newImg);

            const newTemp = document.createElement("span");
            newTemp.className = "hour-temp";
            newTemp.textContent = `${time['temp_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;

            newDiv.appendChild(newTemp);
        }
    }
};

const info = () => {
    //AQI
    const aqiData = weatherData.current.air_quality["us-epa-index"]
    if(aqiData == 1){
        aqi.innerText = "Good";
        aqi.style.color= "green";
    }
    else if(aqiData == 2){
        aqi.innerText = "Moderate";
        aqi.style.color= "yellow";
    }
    else if(aqiData == 3){
        aqi.innerText = "Unhealthy for Sensitive Groups";
        aqi.style.color= "orange";
    }
    else if(aqiData == 4){
        aqi.innerText = "Unhealthy";
        aqi.style.color= "red";
    }
    else if(aqiData == 5){
        aqi.innerText = "Very Unhealthy";
        aqi.style.color= "purple";
    }
    else if(aqiData == 6){
        aqi.innerText = "Hazardous";
        aqi.style.color= "maroon";
    }

    //UV
    if(weatherData.current.uv <=2)
        uv.innerText = `Low (${weatherData.current.uv})`;
    else if(weatherData.current.uv >=3 && weatherData.current.uv <=5)
        uv.innerText = `Moderate (${weatherData.current.uv})`;
    else if(weatherData.current.uv >=6 && weatherData.current.uv <=7)
        uv.innerText = `Unhealthy (${weatherData.current.uv})`;
    else if(weatherData.current.uv >=8 && weatherData.current.uv <=10)
        uv.innerText = `Very Unhealthy (${weatherData.current.uv})`;
    else if(weatherData.current.uv >=11)
        uv.innerText = `Hazardous (${weatherData.current.uv})`;

    humidity.innerText = weatherData.current.humidity+"%";
    precipitation.innerText = weatherData.current.precip_mm+"%";
    wind.innerText = `${weatherData.current['wind_' + (distanceSelectedUnit === 'km' ? 'kph' : 'mph')]} ${distanceSelectedUnit === 'km' ? 'km/hr' : 'mph'}`;
    dew.innerText = `${weatherData.current['dewpoint_' + tempSelectedUnit]} ${tempSelectedUnit === 'c' ? '°C' : '°F'}`;
    pressurue.innerText = `${weatherData.current['pressure_' + pressureSelectedUnit]} ${pressureSelectedUnit === 'mb' ? ' mb' : ' inHg'}`;
    visibility.innerText = `${weatherData.current['vis_' + distanceSelectedUnit]} ${distanceSelectedUnit === 'km' ? 'Km' : 'miles'}`;
};

const sun = () => {
    sunrise.innerText = weatherData.forecast.forecastday[0].astro.sunrise;
    sunset.innerText = weatherData.forecast.forecastday[0].astro.sunset;
};

const moon = () => {
    moonrise.innerText = weatherData.forecast.forecastday[0].astro.moonrise;
    moonset.innerText = weatherData.forecast.forecastday[0].astro.moonset;
    mooninfo.innerText = weatherData.forecast.forecastday[0].astro.moon_phase;
    moonimg.src = `/moon phases/${weatherData.forecast.forecastday[0].astro.moon_phase}.png`; 
};

const alert = () => {
    let alerts = weatherData.alerts.alert;
    let alul = document.querySelector(".alert>ul");
    alul.innerHTML = "";

    if(alerts.length == 0){
        alertTitle.innerText = `No alerts in ${locationArea.innerText}`;
    } else{
        alertTitle.innerText = `Alerts in ${locationArea.innerText}`;

        for(const alts of alerts){
            let desc = alts.desc;
            let inst = alts.instruction;

            const newItem = document.createElement("li");
            newItem.textContent = `${desc}${inst}`;
            alul.appendChild(newItem);
        }
    }
};

const useWeatherData = () => {
    skeleton();
    //Hero section
    hero();

    //Hour forcast section
    hourForcast();

    //Info section
    info();

    //Sun section
    sun();

    //Moon section
    moon();

    //Alert section
    alert();
};

//button click behaviour
btn.addEventListener("click", () => {
    navLinks.classList.remove('active');
    icon.classList.remove("fa-xmark");
    fetchWeather();
});
