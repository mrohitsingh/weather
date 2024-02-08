import { lazy, Suspense } from "react";
import "./App.css";
const CurrentWeather = lazy(() => import("./components/currentWeather"));

function App() {
  return (
    <div className="App">
      <CurrentWeather />
    </div>
  );
}

export default App;
