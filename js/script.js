function getWeather() {
  const city = document.querySelector("#searchInput").value.trim();
  if (!city) {
    alert("Enter correct city name");
  }
  const apiKey = "f35fc0f539e9906213379c14fb9a3327";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // store data desructureing
      const { speed } = data.wind;
      const { temp, humidity, pressure, feels_like } = data.main;
      const { description, main } = data.weather[0];

      
      console.log(main);
      // displayed data
      const img = document.getElementById("weatherIcon");
      img.src = `images/${main}.png`;
      document.getElementById("city").innerHTML = city.toUpperCase();
      document.getElementById("temperature").innerHTML = `${Math.trunc(
        temp
      )}°C`;
      document.getElementById("weatherCondition").innerHTML = description;
      document.getElementById("wind").innerHTML = `${speed} km/hour`;
      document.getElementById("humidity").innerHTML = `${humidity} %`;
      document.getElementById("pressure").innerHTML = `${pressure} hpa`;
      document.getElementById(
        "airQuality"
      ).innerHTML = `Feels like ${feels_like}`;
    })
    .catch((error) => {
      alert("Enter valid city name!");
    });
}




// for the current location data 
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  const { latitude, longitude } = position.coords;
  currentLocation(latitude, longitude);
});

// current location
async function currentLocation(lat, lon) {
  try {
    const apiKey = "f35fc0f539e9906213379c14fb9a3327";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);

    // store data
    const name=data.name;
    const  temp  = data.main.temp;
    const humidity=data.main.humidity;
    const pressure=data.main.pressure;
    const feels_like=data.main.feels_like;
    const speed  = data.wind.speed;
    const description = data.weather[0].description;
    const main = data.weather[0].main;
    console.log(main);
    


    // displayed data
    const img = document.getElementById("weatherIcon");
    img.src = `images/${main}.png`;
    document.getElementById("city").innerHTML = name.toUpperCase();
    document.getElementById("temperature").innerHTML = `${Math.trunc(temp)}°C`;
    document.getElementById("weatherCondition").innerHTML = description;
    document.getElementById("wind").innerHTML = `${speed} km/hour`;
    document.getElementById("humidity").innerHTML = `${humidity} %`;
    document.getElementById("pressure").innerHTML = `${pressure} hpa`;
    document.getElementById(
      "airQuality"
    ).innerHTML = `Feels like ${feels_like}`;
  } catch (error) {
    console.log("fetch not work correctly");
  }
}


// focus on input by press/ key 
addEventListener("keydown", (event) => {
  if (event.key == "/" || event.key == "?") {
    event.preventDefault();
    document.querySelector("#searchInput").focus();
  }
});


// on enter key 
window.addEventListener("keypress", (event) => {
  // console.log(event);
  if (event.key == "Enter") {
    getWeather();
  }
});
