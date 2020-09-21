import { useState, useEffect } from "react";
import axios from "axios";

export function useAxiosRequest(url) {
  const [forecastRequest, setForecastRequest] = useState({
    loading: true,
    data: null,
    error: false,
  });

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const result = await axios(url);
        setForecastRequest({
          loading: false,
          data: result.data,
          error: false,
        });
      } catch {
        setForecastRequest({
          loading: true,
          data: null,
          error: true,
        });
      }
    };
    fetchForecast();
  }, [url]);

  return forecastRequest;
}
