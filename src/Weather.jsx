import React, { useState } from "react";
import "./Weather.css";
import search_icon from "./component/Assets/search.png";
import clear_icon from "./component/Assets/clear.png";
import cloud_icon from "./component/Assets/cloud.png";
import drizzle_icon from "./component/Assets/drizzle.png";
import rain_icon from "./component/Assets/rain.png";
import snow_icon from "./component/Assets/snow.png";
import wind_icon from "./component/Assets/wind.png";
import humidity_icon from "./component/Assets/humidity.png";

const Weather = () => {
  let api_key = "256156d28a4575e841a3cce2fdfc060b";
  const [wicon, setWicon] = useState(cloud_icon);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value == "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=256156d28a4575e841a3cce2fdfc060b`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/hr";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
    element[0].value="";
    
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" 
        onKeyDown={((event) => {
          if (event.key === "Enter") {
            search();
          }})}/>
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search icon" />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24&#x2103; </div>
      <div className="weather-location">Jhansi</div>
      <div className="data-container">
        <div className="element">
          <img alt="" className="icon" src={humidity_icon} />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} className="icon" alt="" />
          <div className="data">
            <div className="wind-rate">18 km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
