import { useState, useEffect } from "react";
import axios from "axios";

const FetchWeatherData = ({ input }) => {
  const [weather, setWeather] = useState([]);

  const url = process.env.REACT_APP_WEATHER_URL;
  const key = process.env.REACT_APP_WEATHER_API;

  useEffect(() => {
    search();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      if (!input) return;

      try {
        const response = await axios.get(`${url}?q=${input}&appid=${key}`);
        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return weather;
};

export default FetchWeatherData;
