export function useGetDailyForecast(forecast) {
  const today = new Date();
  const currentDate = today.getDate();
  const dailyForecast = {
    date: [],
    today: [],
    tomorrow: [],
    intwodays: [],
    inthreedays: [],
    infourdays: [],
    infivedays: [],
  };

  if (forecast) {
    forecast.list.forEach((forecast) => {
      let forecastDate = new Date(forecast.dt_txt);
      let forecastDay = new Date(forecast.dt_txt)
        .toDateString()
        .split(",")[0]
        .split(" ")
        .splice(0, 3)
        .join(" ");
      let temperature = forecast.main.temp.toFixed(1);
      if (forecastDate.getDate() === currentDate) {
        dailyForecast.today.push(forecast);
      } else if (forecastDate.getDate() === currentDate + 1) {
        dailyForecast.date.push(forecastDay);
        dailyForecast.tomorrow.push(temperature);
      } else if (forecastDate.getDate() === currentDate + 2) {
        dailyForecast.date.push(forecastDay);
        dailyForecast.intwodays.push(temperature);
      } else if (forecastDate.getDate() === currentDate + 3) {
        dailyForecast.date.push(forecastDay);
        dailyForecast.inthreedays.push(temperature);
      } else if (forecastDate.getDate() === currentDate + 4) {
        dailyForecast.date.push(forecastDay);
        dailyForecast.infourdays.push(temperature);
      } else if (forecastDate.getDate() === currentDate + 5) {
        dailyForecast.date.push(forecastDay);
        dailyForecast.infivedays.push(temperature);
      }
    });
  }

  dailyForecast.date = Array.from(new Set(dailyForecast.date));

  return dailyForecast;
}
