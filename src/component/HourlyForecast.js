import React from "react";
import { useAxiosRequest } from "../hooks/AxiosRequest";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";

function HourlyForecast({ location }) {
  const { id } = useParams();

  const url = `http://api.openweathermap.org/data/2.5/forecast/?q=${location}&units=metric&appid=9624566aa487525d684f4522c3a677d7`;

  const forecast = useAxiosRequest(url);

  if (forecast.error) {
    return (
      <div className="forecast">{location} is not a valid search option</div>
    );
  }
  if (forecast.loading) {
    return <Loader />;
  }

  if (forecast.data) {
    const hourlyForecast = forecast.data.list.filter(
      (date) =>
        new Date(date.dt_txt)
          .toDateString()
          .split(" ")
          .splice(0, 3)
          .join(" ") === id
    );

    return (
      <div>
        <Link to={`/`}>
          <div className="forecast">&#8656; Back to Current Forecast</div>
        </Link>
        <div className="forecast">
          <h4>3-Hour Forecast for {id}:</h4>
          <div className="hourly">
            {hourlyForecast.map((hour) => (
              <div key={hour.dt} className="hour">
                <div>
                  {" "}
                  {new Date(hour.dt_txt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </div>
                <div>{hour.main.temp.toFixed(1)}°C</div>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default HourlyForecast;
