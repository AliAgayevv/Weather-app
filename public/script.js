const submitButton = document.getElementById("submit");
const input = document.getElementById("input");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const errorMessage = document.getElementById('msg');
const form = document.getElementById('form');

var listOfAllCities = JSON.parse(localStorage.getItem("cities")) || [];

// Load cities from local storage when the page loads
window.addEventListener("load", () => {
  listOfAllCities.forEach(city => {
    addCityToScreen(city.name, city.temperature, city.countryName, city.desc, city.icon);
  });
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;

      // set variables from API data
      const temperature = Math.round(main.temp);
      const city = name;
      const countryName = sys.country;
      const desc = weather[0].description;
      const icon = weather[0].icon;

      if (!listOfAllCities.some(existingCity => existingCity.name === city)) {
        const cityData = { name: city, temperature, countryName, desc, icon };
        listOfAllCities.push(cityData);
        localStorage.setItem("cities", JSON.stringify(listOfAllCities)); // Save to local storage

        addCityToScreen(city, temperature, countryName, desc, icon);
      } else {
        errorMessage.innerText = `${city} is already on your screen`;
      }

      input.value = "";
    })
    .catch(() => {
      errorMessage.innerText = `Invalid city name`;
      input.value = "";
    });
});

function addCityToScreen(city, temperature, countryName, desc, icon) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const h2 = document.createElement("h2");
  const helperDiv = document.createElement("div");
  const buttonForDelete = document.createElement("button");
  const helperDiv2 = document.createElement("div")
  const helperDivIcon = document.createElement("img");
  const iconSource = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;
  const helperDivDescription = document.createElement("p");


  buttonForDelete.innerText = "Delete"
  h3.innerText = city;
  h2.innerText = temperature;
  helperDivIcon.src = iconSource;
  helperDivDescription.classList.add("text-custom-dark");
  helperDivDescription.innerText = desc;

  div.appendChild(h3);
  div.appendChild(h2);
  helperDiv2.appendChild(helperDivDescription)
  helperDiv2.append(buttonForDelete);
  helperDiv.append(helperDivIcon)
  helperDiv.appendChild(helperDiv2);
  div.appendChild(helperDiv);

  document.getElementById('api-section').appendChild(div);


  const classesForDiv = "card max-sm:ml-5 xl:w-card-w h-80 bg-white rounded-2xl";
  const classesForH3 = `card-city-name p-8 text-2xl text-custom-dark relative after:text-white after:text-xs after:font-bold after:rounded-full after:px-3 after:ml-1 after:bg-orange-500 after:absolute after:translate-y-1 after:content-['${countryName}']`;
  const classesForH2 = "card-temperature text-7xl font-bold ml-7 realtive after:content-['°C'] after:text-inherit after:text-4xl after:font-light after:absolute";
  const classesForHelperDiv = "city-status ml-7";

  classAdd(classesForDiv.split(" "), div);
  classAdd(classesForH3.split(" "), h3);
  classAdd(classesForH2.split(" "), h2);
  classAdd(classesForHelperDiv.split(" "), helperDiv);

  buttonForDelete.addEventListener("click", () => {
    div.remove();

    listOfAllCities = listOfAllCities.filter(storedCity => storedCity.name !== city);
    localStorage.setItem("cities", JSON.stringify(listOfAllCities));
  });
}

function classAdd(classesArray, whereToAdd) {
  classesArray.forEach(cls => whereToAdd.classList.add(cls));
}