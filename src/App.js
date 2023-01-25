import Citybar from "./Citybar";
import { useEffect, useState } from "react";

//*Helsinki cordinates
const HEL_NO = 60.17;
const HEL_EA = 24.95;
//*Turku cordinates
const TU_NO = 60.45;
const TU_EA = 22.28;
//*Tampere cordinates
const TA_NO = 61.50;
const TA_EA = 23.80;

//!tehtävä torstaina!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//TODO kuinka saada seuraava päivä, tarvitaan näyttämään muiden päivien päivämäärät
//TODO var tomorrow = new Date();
//TODO tomorrow.setDate(tomorrow.getDate()+1);
//TODO seuraavien päivien data saadaan, kun lisätään hour + 24 tai 48

//TODO returniin ehdollinen renderöinti, jos multiple == true, renderöidään kolmen päivän data + päivämäärät

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function App() {
  const [ city, setCity ] = useState("turku");
  const [ tempData, setTempData ] = useState([]);
  const [ north, setNorth ] = useState(TU_NO);
  const [ east, setEast ] = useState(TU_EA);
  const [ rain, setRain ] = useState([]);
  const [ snow, setSnow ] = useState([]);
  const [ cloud, setCloud ] = useState([]);
  const [ wind, setWind ] = useState([]);
  const [ multiple, setMultiple ] = useState(false);


  //*current date
  let timeNow = new Date();
  //*format the Date object for presentation
  let testdate = timeNow.toISOString().slice(0, 10);
  //*get current hour value from the Date object
  let hour = timeNow.getHours();

  

  //console.log(day);
  console.log("kellonaika", hour);

  //! API SETUP: Hourly weather: temperature (2m), rain, snowfall, cloudcover mid, wind speed 120
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${north}&longitude=${east}&hourly=temperature_2m,rain,snowfall,cloudcover_mid,windspeed_120m&current_weather=true`;

  useEffect(() => {
    console.log("effect");
    async function getData() {
      const response = await fetch(url);
      const data = await response.json();
      setTempData(data.hourly.temperature_2m);
      setRain(data.hourly.rain);
      setSnow(data.hourly.snowfall);
      setCloud(data.hourly.cloudcover_mid);
      setWind(data.hourly.windspeed_120m);

      console.log(data);
    }

    console.log("seuraavaksi kutsutaan getdata");
    getData();
  }, [city, north, east]);


  //console.log("render city", city, "render timeNtemp", data);
  const temperature = tempData[hour]
  console.log("lämpötila", temperature);

  const sateenMaara = rain[hour];
  console.log("sadetta", sateenMaara);
  
  const lumenMaara = snow[hour];
  console.log("lunta", lumenMaara);

  const pilvienMaara = cloud[hour];
  console.log("pilviä", pilvienMaara);

  const tuulenMaara = wind[hour];
  console.log("tuulta", tuulenMaara);

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
        <h5>{ testdate }</h5>
        
        <p>{ tempData[hour] }℃</p>

        <p>{ rain[hour] >= 1
            ? "sateista"
            : "ei sadetta" }</p>

        <p>{ snow[hour] >= 1
            ? "lumista"
            : "ei lumisadetta"}</p>

        <p>{ cloud[hour] >= 50
            ? "pilvistä"
            : "ei pilvistä" }</p>

        <p>{ wind[hour] >= 20
            ? "tuulista"
            : "ei tuulista"}</p>

      </div>
    </div>
  );
}

export default App;
