import Citybar from "./Citybar";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import axios from "axios";

//*Helsinki cordinates
const HEL_NO = 60.17;
const HEL_EA = 24.95;
//*Turku cordinates
const TU_NO = 60.45;
const TU_EA = 22.28;
//*Tampere cordinates
const TA_NO = 61.50;
const TA_EA = 23.80;

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

//!tehtävä torstaina!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//TODO googleFontsien lisääminen

//TODO tarkista herokuun pushaamminen

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

  //! API SETUP: Hourly weather variables: [temperature (2m)], Daily weather variables: [weathercode], Settings: timezone == europe/berlin. Else is default
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${north}&longitude=${east}&hourly=temperature_2m&daily=weathercode&timezone=Europe%2FBerlin`;





  //*useEffect for fetching data
  //?not working correctly
  useEffect(() => {
    console.log("effect");
    async function getData() {
      const response = await fetch(URL);
      const data = await response.json();

      setTempData(data.hourly.temperature_2m);
      setWeathercode(data.daily.weathercode);

      console.log(data);
      console.log(weathercode[0]);
    }

    console.log("seuraavaksi kutsutaan getdata");
    getData();
  }, [city, north, east, URL, multiple]);


  
//*on button click, change state
//?not working correctly, button needs to be pressed twice to change displayed data
  const changeCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    if (city === "turku") {
      setNorth(TU_NO);
      setEast(TU_EA);
    } else if (city === "tampere") {
      setNorth(TA_NO);
      setEast(TA_EA);
    } else {
      setNorth(HEL_NO);
      setEast(HEL_EA);
    }
    console.log(north, east);
    console.log(city);
    console.log(weathercode[0]);
  }

  console.log(multiple);


  //*LONG return
  return (
    <div className="App">
      <h1>Weather App</h1>

      <Citybar 
      setCity={ changeCity }
      setContent={() => !multiple ? setMultiple(true) : setMultiple(false) }/>

      <div className="content">
        <h3>{ city.toLocaleUpperCase() }</h3>
        
        {/*conditional rendering, one-day display or three-day display*/}
        {multiple
        ?
        <div className="three-days">
          <h2>{ todaydate }</h2>
          <p>Average temperature { Math.round(setAVGToday(tempData)) }℃</p>
          <p>{ weathercode[0] }</p>

          <h2>{ tomorrowdate }</h2>
          <p>Average temperature { Math.round(setAVGTomorrow(tempData)) }℃</p>
          <p>{ weathercode[1] }</p>

          <h2>{ dayAfterTomorrowdate }</h2>
          <p>Average temperature { Math.round(setAVGDayAfterTomorrow(tempData)) }℃</p>
          <p>{ weathercode[2] }</p>
        </div>
        :
        <div>
          <h5>{ todaydate }</h5>
          <div className="one-day">
            <p>{ weathercode[0] }</p>
            
            <Icon code={ weathercode } />
            
            <p>{ Math.round(tempData[hour]) }℃</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
