import { useEffect, useState } from "react";
import axios from "axios";
import Citys from "./components/Citys";
import Footer from "./components/Footer";
import {
        setAVGToday,
        setAVGTomorrow,
        setAVGDayAfterTomorrow,
        findIndex
        } from "./components/Functions";

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

//*wanted to be an object, didn't get to work so list
const listOfIcons = [
  <i className="sun fa-solid fa-sun"></i>, //*0, clear sky
  <i className="cloud fa-solid fa-cloud-sun"></i>, //*1-3, mainly clear
  <i className="cloud fa-solid fa-cloud"></i>, //*45-48, cloudy
  <i className="rain fa-solid fa-cloud-rain"></i>, //*51-67, rain
  <i className="snow fa-solid fa-snowflake"></i>, //* 71-77, snow
  <i className="rain fa-solid fa-cloud-showers-water"></i>, //* 80-86, rain showers
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
          <h2 className="three-date">{ todaydate }</h2>
          <p className="avg-temp">Average temperature { Math.round(setAVGToday(tempData)) }℃</p>
          <p className="three-icon">{ listOfIcons[findIndex(weatherKey1)] }</p>
          <p className="description-three">{ listOfDescriptions[findIndex(weatherKey1)] }</p>

          <h2 className="three-date">{ tomorrowdate }</h2>
          <p className="avg-temp">Average temperature { Math.round(setAVGTomorrow(tempData)) }℃</p>
          <p className="three-icon">{ listOfIcons[findIndex(weatherKey2)] }</p>
          <p className="description-three">{ listOfDescriptions[findIndex(weatherKey2)] }</p>

          <h2 className="three-date">{ dayAfterTomorrowdate }</h2>
          <p className="avg-temp">Average temperature { Math.round(setAVGDayAfterTomorrow(tempData)) }℃</p>
          <p className="three-icon">{ listOfIcons[findIndex(weatherKey3)] }</p>
          <p className="description-three">{ listOfDescriptions[findIndex(weatherKey3)] }</p>
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
