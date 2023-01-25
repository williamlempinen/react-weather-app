import Citybar from "./Citybar";
import { useEffect, useState } from "react";

//Helsingin koordinaatit
const HEL_NO = 60.17;
const HEL_EA = 24.95;
//Turun koordinaatit
const TU_NO = 60.45;
const TU_EA = 22.28;
//Tampereen koordinaatit
const TA_NO = 61.50;
const TA_EA = 23.80;



function App() {
  const [ city, setCity ] = useState("turku");
  const [ tempData, setTempData ] = useState([]);
  const [ north, setNorth ] = useState(TU_NO);
  const [ east, setEast ] = useState(TU_EA);
  const [ rain, setRain ] = useState([]);
  const [ snow, setSnow ] = useState([]);
  const [ cloud, setCloud ] = useState([]);
  const [ wind, setWind ] = useState([]);

  let timeNow = new Date();
  //let day = timeNow.getDate();
  let hour = timeNow.getHours();

  //console.log(day);
  console.log("kellonaika", hour);


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




  
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Citybar setCity={ changeCity }/>
      <div className="content">
        <h3>{ city.toLocaleUpperCase() }</h3>
        <p>{ tempData[hour] }</p>
        <p>{ rain[hour] }</p>
        <p>{ snow[hour] }</p>
        <p>{ cloud[hour] }</p>
        <p>{ wind[hour] }</p>
      </div>
    </div>
  );
}

export default App;
