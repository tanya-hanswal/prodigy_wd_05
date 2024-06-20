const API = "b38fb59b1c52f344e75d563c9f4bd1d6";

const dayEL = document.querySelector(".default_day");
const dateEL = document.querySelector(".default_date");
const btnEl = document.querySelector(".btn_search");
const inputEl = document.querySelector(".input_field");
const iconsContainer = document.querySelector(".icons");
const dayInfoEl = document.querySelector(".day_info");

const days = [
  "Sunday",
  "Monday",
  "Tuesady",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//display day
const day = new Date();
const dayName = days[day.getDay()];
dayEL.textContent = dayName;
//display date
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();
dateEL.textContent = date + " " + month + " " + year;

btnEl.addEventListener("click", (e) => {
  e.preventDefault();

  //ckeck input value
  if (inputEl.value !== "") {
    const Search = inputEl.value;
    inputEl.value = "";

    findLocation(Search);
  } else {
    console.log("please enter");
  }
});

async function findLocation(name) {
  iconsContainer.innerHTML = "";
  dayInfoEl.innerHTML = "";
  const API_URL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}`
  );
  const result = await API_URL.json();
  console.log(result);

  if (result.cod !== "404") {
    //display left content
    const weatherContent = displayContent(result);

    //display right content
    const rightSide = rightSideContent(result);

    setTimeout(() => {
      iconsContainer.insertAdjacentHTML("afterbegin", weatherContent);
      dayInfoEl.insertAdjacentHTML("afterbegin", rightSide);
    }, 1500);
  } else {
    const message = ` <h2 class="temp">${result.cod}</h2>
              <h3 class="cloudtext">${result.message}</h3>`;
    iconsContainer.insertAdjacentHTML("afterbegin", message);
  }
}

function displayContent(result) {
  return `<img src=" https://openweathermap.org/img/wn/${
    result.weather[0].icon
  }@4x.png" alt="" />
  <h2 class="temp">${Math.round(result.main.temp - 275.15)}°C</h2>
          <h3 class="cloudtext">${result.weather[0].description}</h3>`;
}

//display of right content
function rightSideContent(result) {
  return `<div class="content">
              <p class="title">Name</p>
              <span class="value">${result.name}</span>
            </div>
            <div class="content">
              <p class="title">Temp</p>
              <span class="value">${Math.round(
                result.main.temp - 275.15
              )}°C</span>
            </div>
            <div class="content">
              <p class="title">Humidity</p>
              <span class="value">${result.main.humidity}</span>
            </div>
            <div class="content">
              <p class="title">Wind Speed</p>
              <span class="value">${result.wind.speed} km/h</span>
            </div>
        `;
}
