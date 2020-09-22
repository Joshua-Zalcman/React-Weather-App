import React from "react";
import { useAxiosRequest } from "../hooks/AxiosRequest";
import Loader from "./Loader";
import { useGetDailyForecast } from "../hooks/GetDailyForecast";
import { Link } from "react-router-dom";

function WeatherForecast({ location }) {
  const url = `https://api.openweathermap.org/data/2.5/forecast/?q=${location}&units=metric&appid=9624566aa487525d684f4522c3a677d7`;

  const forecast = useAxiosRequest(url);

  const {
    date,
    today,
    tomorrow,
    intwodays,
    inthreedays,
    infourdays,
    infivedays,
  } = useGetDailyForecast(forecast.data);

  if (forecast.error) {
    return (
      <div className="forecast">{location} is not a valid search option</div>
    );
  }

  return (
    <div>
      {forecast.loading === true ? (
        <Loader />
      ) : (
        <div>
          <div className="forecast current-forecast">
            It's currently{" "}
            <span className="highlight">
              {forecast.data.list[0].main.temp.toFixed(1)}°C{" "}
            </span>
            with {forecast.data.list[0].weather[0].description} in{" "}
            <span className="highlight">{forecast.data.city.name}</span>
          </div>
          <div className="forecast">
            <h4>Rest of the day:</h4>
            <div>
              {today.map((hour) => (
                <div className="hour" key={hour.dt}>
                  {new Date(hour.dt_txt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  :{hour.main.temp.toFixed(1)}°C{" "}
                  <img
                    src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt={hour.weather.description}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="forecast">
            <h4 className="five-day-forecast">5 Day Forecast:</h4>
            <div className="five-day">
              <Link to={`/hourly/${date[0]}`}>
                <div className="five-day-row">{date[0]}</div>
                <div>
                  {" "}
                  {Math.max(...tomorrow)}°C - {Math.min(...tomorrow)}°C
                </div>
              </Link>
              <Link to={`/hourly/${date[1]}`}>
                <div className="five-day-row">{date[1]}</div>{" "}
                <div>
                  {Math.max(...intwodays)}°C - {Math.min(...intwodays)}°C
                </div>
              </Link>
              <Link to={`/hourly/${date[2]}`}>
                <div className="five-day-row">{date[2]}</div>
                <div>
                  {" "}
                  {Math.max(...inthreedays)}°C - {Math.min(...inthreedays)}°C
                </div>
              </Link>
              <Link to={`/hourly/${date[3]}`}>
                <div className="five-day-row">{date[3]}</div>{" "}
                <div>
                  {Math.max(...infourdays)}°C - {Math.min(...infourdays)}°C
                </div>
              </Link>
              <Link to={`/hourly/${date[4]}`}>
                <div className="five-day-row">{date[4]}</div>{" "}
                <div>
                  {Math.max(...infivedays)}°C - {Math.min(...infivedays)}°C
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
