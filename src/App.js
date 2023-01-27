import { useEffect, useState } from "react";
import axios from "axios";
import Citys from "./Citys";
import Footer from "./Footer";

//*Helsinki cordinates
const HEL_EA = 60.17;
const HEL_NO = 24.95;
//*Turku cordinates
const TU_EA = 60.45;
const TU_NO = 22.28;
//*Tampere cordinates
const TA_EA = 61.50;
const TA_NO = 23.80;

//*current date
let today = new Date();
let tomorrow = new Date(today);
let dayAfterTomorrow = new Date(today);
//*format the Date object for presentation
let todaydate = today.toISOString().slice(0, 10);
//*tomorrow date
tomorrow.setDate(tomorrow.getDate() + 1);
let tomorrowdate = tomorrow.toISOString().slice(0, 10);
//*day after tomorrow
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
let dayAfterTomorrowdate = dayAfterTomorrow.toISOString().slice(0, 10);
//*get current hour value from the Date object
let hour = today.getHours();


//* functions to find the average temperature for three-day display
function setAVGToday(list) {
  let listt = list.slice(0, 24);
  console.log(listt);
  let sum = 0; 
  for (let i = 0; i < listt.length; i++) {
    sum += listt[i];
  }
  return sum/listt.length;
}
function setAVGTomorrow(list) {
  let listS = list.slice(24,48);
  console.log(listS);
  let sum = 0; 
  for (let i = 0; i < listS.length; i++) {
    sum += listS[i];
  }
  return sum/listS.length;
}
function setAVGDayAfterTomorrow(list) {
  let lista = list.slice(48,72);
  console.log(lista);
  let sum = 0; 
  for (let i = 0; i < lista.length; i++) {
    sum += lista[i];
  }
  return sum/lista.length;
}

//*wanted to be an object, didn't get to work
const listOfIcons = [
  <i className="fa-solid fa-sun"></i>, //*0, clear sky
  <i className="fa-solid fa-cloud-sun"></i>, //*1-3, mainly clear
  <i className="fa-solid fa-cloud"></i>, //*45-48, cloudy
  <i className="fa-solid fa-cloud-rain"></i>, //*51-67, rain
  <i className="fa-solid fa-snowflake"></i>, //* 71-77, snow
  <i className="fa-solid fa-cloud-showers-water"></i>, //* 80-86, rain showers
  <i className="fa-solid fa-cloud-bolt"></i>, //*95-99, thunderstorm
];

//*list of descriptions to display
const listOfDescriptions = [
  "Clear sky",
  "Mainly clear",
  "Cloudy",
  "Rain",
  "Snow",
  "Rain showers",
  "Thunderstrom"
];

//*function to find correct icon and description
let listIndex;
function findIndex(key) {
  if ( key === 0 ) {
    listIndex = 0;
  } else if ( key <= 5 && key > 0 ) {
    listIndex = 1;
  } else if ( key >= 45 && key <= 48 ) {
    listIndex = 2;
  } else if ( key >= 51 && key <= 67 ) {
    listIndex = 3;
  } else if ( key >= 71 && key <= 77 ) {
    listIndex = 4;
  } else if ( key >= 80 && key <= 86 ) {
    listIndex = 5;
  } else if ( key >= 95 && key <= 99 ) {
    listIndex = 6;
  }
  return listIndex;
}


//!tehtävä perjantaina!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//TODO tarkista herokuun pushaamminen

//TODO yritä korjata useEffect

//TODO kokeile jakaa appi pienempiin paloihin

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO herokuun pushaaminen + spostin lähetys viim. klo 16
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




function App() {
  const [ city, setCity ] = useState("turku");
  const [ tempData, setTempData ] = useState([]);
  const [ weathercode, setWeathercode ] = useState([]);
  const [ north, setNorth ] = useState(TU_NO);
  const [ east, setEast ] = useState(TU_EA);
  const [ multiple, setMultiple ] = useState(false);


  //console.log(day);
  console.log("kellonaika", hour);
  console.log(weathercode);


  //* weatherKey is used to get the right icon from the listOfIcons array
  //*weatherKey1 for the current day
  //*weatherKey2 for tomorrow
  //*weatherKey3 for day after tomorrow
  const weatherKey1 = weathercode[0];
  const weatherKey2 = weathercode[1];
  const weatherKey3 = weathercode[2];
  console.log(weatherKey1, weatherKey2, weatherKey3);

  console.log(listIndex);


  //! API SETUP: Hourly weather variables: [temperature (2m)], Daily weather variables: [weathercode], Settings: timezone == europe/berlin. Else is default
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${east}&longitude=${north}&hourly=temperature_2m&daily=weathercode&timezone=Europe%2FBerlin`;

  //*useEffect for fetching data
  //?not working correctly
  useEffect(() => {
    console.log("kerran renderöity, nyt useEffect");
    axios
    .get(URL)
    .then(response => {
      setTempData(response.data.hourly.temperature_2m);
      setWeathercode(response.data.daily.weathercode);
    })
    .catch(error => {
      console.error(error);
    })
  }, [city, north, east, URL, multiple]);


//*on button click, change city value
//?not working correctly, button needs to be pressed twice to change displayed data
  const changeCity = (e) => {
    setCity(e.target.value);
    if (city === "turku") {
      setNorth(TU_NO);
      setEast(TU_EA);
    } else if (city === "tampere") {
      setNorth(TA_NO);
      setEast(TA_EA);
    } else if (city === "helsinki") {
      setNorth(HEL_NO);
      setEast(HEL_EA);
    }
    console.log(east, north);
    console.log(city);
  }

  console.log(multiple);

  //*return
  return (
    <div className="App">
      <h1>Weather App</h1>

      <Citys 
      setCity={ changeCity }
      setContent={() => !multiple ? setMultiple(true) : setMultiple(false) }
      multiple={ multiple }/>

      <div className="content">
        <h3>{ city.toLocaleUpperCase() }</h3>
        
        {/*conditional rendering, one-day display or three-day display*/}
        {multiple
        ?
        <div className="three-days">
          <h2>{ todaydate }</h2>
          <p>Average temperature { Math.round(setAVGToday(tempData)) }℃</p>
          <p>{ listOfIcons[findIndex(weatherKey1)] }</p>
          <p>{ listOfDescriptions[findIndex(weatherKey1)] }</p>

          <h2>{ tomorrowdate }</h2>
          <p>Average temperature { Math.round(setAVGTomorrow(tempData)) }℃</p>
          <p>{ listOfIcons[findIndex(weatherKey2)] }</p>
          <p>{ listOfDescriptions[findIndex(weatherKey2)] }</p>

          <h2>{ dayAfterTomorrowdate }</h2>
          <p>Average temperature { Math.round(setAVGDayAfterTomorrow(tempData)) }℃</p>
          <p>{ listOfIcons[findIndex(weatherKey3)] }</p>
          <p>{ listOfDescriptions[findIndex(weatherKey3)] }</p>
        </div>
        :
        <div>
          <h5>{ todaydate }</h5>
          <div className="one-day">
            <div>
              <p className="icon-one">{ listOfIcons[findIndex(weatherKey1)] }</p>
              <p className="description-one">{ listOfDescriptions[findIndex(weatherKey1)] }</p>
            </div>
            <p className="temperature">{ Math.round(tempData[hour]) }℃</p>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
