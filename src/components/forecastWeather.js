import React from "react";

const ForecastWeather = ({ input }) => {
  const [forecast, setForecast] = React.useState([]);
  console.log("input: ", input);
  // Fetch the weather forecast data for the given city and store it in the state

  const url = process.env.REACT_APP_FORECAST_URL;
  const key = process.env.REACT_APP_WEATHER_API;
  React.useEffect(() => {
    fetch(`${url}?q=${input}&units=metric&cnt=7&appid=${key}`)
      .then((response) => response.json())
      .then((data) => setForecast(data));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {!forecast.length ? (
        <p className="error-message">Loading...</p>
      ) : (
        <>
          <ul className="flex flex-col justify-center items-center border border-black rounded p-4 text-gray-700">
            {forecast.list.map((day) => (
              <li key={day.dt}>
                {new Date(day.dt * 1000).toLocaleDateString()}
                <img
                  src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt=""
                />
                <span>Temperature: {Math.round(day.main.temp)} &#8451;</span>
                <br />
                <span>
                  Feels Like: {Math.round(day.main.feels_like)} &#8451;
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
//   return (
//     <div >
//       <div>
//         <div ></div>
//       </div>
//     </div>
//   );
// };

export default ForecastWeather;
