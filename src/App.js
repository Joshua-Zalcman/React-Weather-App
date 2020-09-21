import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherForecast from "./component/WeatherForecast";
import HourlyForecast from "./component/HourlyForecast";
import Footer from "./component/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [location, setLocation] = useState("London");
  const [value, setValue] = useState("");
  const [background, setBackground] = useState({ backgroundImage: "" });
  const [hotlink, setHotlink] = useState("");

  useEffect(() => {
    const fetchBackground = async () => {
      const result = await axios(
        `https://api.unsplash.com/search/photos?per_page=5&orientation=portrait&query=${location}&client_id=Ja-tGZ1OqFohvTmYGTBd3Tm78hQ7WgsihxA9I0r_6MQ`
      );
      try {
        const num = Math.floor(Math.random() * 5);
        setBackground({
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.7)
          ), url(${result.data.results[num].urls.regular})`,
        });
        setHotlink(result.data.results[num]);
      } catch {
        //set background to default in case of error
        setBackground({
          backgroundImage: ` linear-gradient(
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.6)
          ), url(https://images.unsplash.com/photo-1591804227855-d6fe0b648d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=622&q=80)`,
        });
      }
    };
    fetchBackground();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(value);
  };

  return (
    <div className="container" style={background}>
      <Router>
        <div className="App">
          <h1 className="header">Weather Forecast</h1>
          <input
            type="text"
            className="location-input"
            placeholder="Enter Location"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Get Forecast</button>
          <Switch>
            <Route exact path="/">
              <WeatherForecast location={location} />
            </Route>
            <Route path="/hourly/:id">
              <HourlyForecast location={location} />
            </Route>
          </Switch>
        </div>
        <Footer hotlink={hotlink} />
      </Router>
    </div>
  );
}

export default App;
