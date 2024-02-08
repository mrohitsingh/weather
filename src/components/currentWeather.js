import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CurrentWeather = () => {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [input, setInput] = useState("");
  const [forcastData, setForcastData] = useState("");
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  const weather_url = process.env.REACT_APP_WEATHER_URL;
  const forecast_url = process.env.REACT_APP_FORECAST_URL;
  const key = process.env.REACT_APP_WEATHER_API;
  const icon = process.env.REACT_APP_WEATHER_ICON;

  const getForecast = async () => {
    try {
      let res = await axios.get(
        `${forecast_url}?q=${forcastData}&cnt=7&appid=${key}`
      );
      setForecast(res.data);
      setShowForecast(true);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setError(`Unable to find location: ${forcastData}`);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setForcastData("");
    }
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!input) return;

      try {
        const response = await axios.get(
          `${weather_url}?q=${input}&appid=${key}`
        );
        setWeather(response.data);
        setForcastData(input);
        setShowForecast(false);
        setInput("");
        console.log("Wea", response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(`Unable to find location: ${input}`);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 h-screen m-auto w-full">
      <div className="container m-4">
        <input
          type="text"
          placeholder="City Name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={search}
          className="border rounded-md border-2 border-gray-800 px-2 bg-gray-100"
        />
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div>
        {weather && (
          <div className="flex flex-col justify-center items-center w-1/2 lg:w-full mx-auto border border-black rounded p-4 text-gray-700 relative">
            <h2 className="text-center">
              {weather.name}, {weather.sys.country}
            </h2>
            <button
              className="right-0 top-0 bg-gray-600 text-gray-200 font-semibold hover:bg-gray-200 hover:text-gray-600 rounded py-2 px-3 absolute"
              onClick={getForecast}
            >
              Get Forecast
            </button>
            <div className="flex flex-row-reverse justify-center items-center  w-full my-6">
              <img
                src={`${icon}/${weather.weather[0].icon}.png`}
                alt=""
                className="w-[50px] h-[50px] bg-white shadow-lg rounded-full"
              />
              <p className="display-4 font-bold text-3xl pr-3">
                {Math.round(weather.main.temp - 273.15)}°C
              </p>
            </div>
            <p>{weather.weather[0].description.toUpperCase()}</p>
            <hr />
            <ul className="flex flax-wrap gap-6 text-sm font-medium">
              <li className="border rounded-lg text-center py-2 px-3 hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out">
                Humidity:
                <span className="ms-2 mx-auto">{weather.main.humidity}%</span>
              </li>
              <li className="border rounded-lg text-center py-2 px-3 hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out">
                Real Feel:
                <span className="ms-2 mx-auto">
                  {Math.round(weather.main.feels_like - 273.15)}%
                </span>
              </li>
              <li className="border rounded-lg text-center py-2 px-3 hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out">
                Wind Speed:
                <span className="ms-2 mx-auto">{weather.wind.speed} km/h</span>
              </li>
              <li className="border rounded-lg text-center py-2 px-3 hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out">
                Pressure :
                <span className="ms-2 mx-auto">
                  {weather.main.pressure} hPa
                </span>
              </li>
            </ul>
          </div>
        )}
        {error && (
          <p className="text-red-500 border border-red-500 rounded-3xl bg-red-200 py-3 px-2 md:top-5 md:right-5 top-0 right-0 absolute transition duration-200 ease-in-out">
            {error}
          </p>
        )}
        {showForecast && forecast && (
          <div className="border border-black rounded p-4 text-gray-700 mt-4 lg:w-auto w-72 mx-auto">
            <h3 className="text-center">7-Day Forecast</h3>
            <div className="flex gap-6 w-64 md:w-[80%] overflow-x-auto overscroll-contain mx-auto">
              {forecast.list.map((day) => (
                <div
                  key={day.dt}
                  className="flex flex-col justify-center items-center mt-4 border border-black rounded p-4 text-gray-700"
                >
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>{Math.round(day.main.temp - 273.15)}°C</p>
                  <img
                    src={`${icon}/${day.weather[0].icon}.png`}
                    alt=""
                    className="w-[50px] h-[50px] bg-white shadow-lg rounded-full"
                  />
                  <p>{day.weather[0].description.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CurrentWeather;
