import Citybar from "./Citybar";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  
  const [ city, setCity ] = useState("turku");
  const [ data, setData ] = useState({});

  //tämän päivän päivämäärään lisätään tunnit -> löydetään indeksi säälle

  let timeNow = new Date();
  let day = timeNow.getDate();
  let hours = timeNow.getHours();


  console.log(timeNow);
  console.log(day);
  console.log(hours);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=60.45&longitude=22.27&hourly=temperature_2m`;

  useEffect(() => {
    axios
    .get(url)
    .then(res => {
      console.log(res.data.hourly.temperature_2m[10]);
      setData(res.data);
    });
  }, [city]);
  console.log(data);
  

  const changeCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    console.log(city);
  }
  
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Citybar setCity={ changeCity }/>
    </div>
  );
}

export default App;
