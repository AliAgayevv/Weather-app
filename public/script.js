{
  /* <div class="card w-card-w h-80 bg-white rounded-2xl">
                    <h3 class="card-city-name p-8 text-2xl text-custom-dark relative
                    after:content-['AZ'] after:text-white after:text-xs after:font-bold after:rounded-full after:px-2 after:ml-1 after:bg-orange-500 after:absolute after:translate-y-1">
                        Baku
                    </h3>
                    <h2 class="card-temperature
                    text-7xl font-bold ml-7 realtive
                    after:content-['°C'] after:text-inherit after:text-4xl after:font-light after:absolute
                    ">18</h2>
                    
                    <div class="city-status ml-7">
                        <i class="fa-solid fa-cloud text-6xl mb-6 mt-5"></i>
                        <p class="text-custom-dark">SCATTERED CLOUDS</p>
                    </div>
                </div>
             */
}

const submitButton = document.getElementById("submit");
const input = document.getElementById("input");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const errorMessage = document.getElementById('msg');
const form = document.getElementById('form')

var listOfAllCities=[];

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = input.value;

  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;



  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;


      
      
      

      
      
      
      // set variable from api data
      const temperature = Math.round(main.temp);
      const city = name;
      const countyName = sys.country;
      const desc = weather[0].description;
      const icon = weather[0].icon;
      
      


      if(listOfAllCities.indexOf(city) === -1)
      {
        listOfAllCities.push(city);

        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const h2 = document.createElement("h2");
        const helperDiv = document.createElement("div");
        const helperDivIcon = document.createElement("img");
        const iconSource = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
        const helperDivDescription = document.createElement("p");
  
        h3.innerText = city;
        h2.innerText = temperature;
  
        helperDivIcon.src = iconSource;
  
        helperDivDescription.classList.add("text-custom-dark");
        helperDivDescription.innerText = desc;
  
        div.appendChild(h3);
        div.appendChild(h2);
        helperDiv.appendChild(helperDivIcon);
        helperDiv.appendChild(helperDivDescription);
  
        div.appendChild(helperDiv);
  
        document.getElementById('api-section').appendChild(div);
  
  
        const classesForDiv = "card w-card-w h-80 bg-white rounded-2xl";
        const classesForH3 = `card-city-name p-8 text-2xl text-custom-dark relative after:content-['${countyName}'] after:text-white after:text-xs after:font-bold after:rounded-full after:px-2 after:ml-1 after:bg-orange-500 after:absolute after:translate-y-1`;
        const classesForH2 =
          "card-temperature text-7xl font-bold ml-7 realtive after:content-['°C'] after:text-inherit after:text-4xl after:font-light after:absolute";
        const classesForHelperDiv = "city-status ml-7";
  
        let tempArr = [];
  
        tempArr = classesForDiv.split(" ");
        classAdd(tempArr, div);
  
        tempArr = classesForH3.split(" ");
        classAdd(tempArr, h3);
  
        tempArr = classesForH2.split(" ");
        classAdd(tempArr, h2);
  
        tempArr = classesForHelperDiv.split(" ");
        classAdd(tempArr, helperDiv);
  

        
      }

      else
      {
        errorMessage.innerText = `${city} already have on your screen`;
      }
      
      input.value = "";





     

    })
    .catch(() => {
      errorMessage.innerText = `Wrong city name`
      input.value = "";
    });
});


function classAdd(classesArray, whereToAdd) {
  for (i of classesArray) {
    whereToAdd.classList.add(i);
  }
}
