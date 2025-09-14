import { WeatherResponse } from "@/api/types/weatherType.t";

import { IWeather } from "@/interfaces";

function transformForecast(hourly: WeatherResponse["list"]) {
  const groupedByDay: Record<string, WeatherResponse["list"]> = {};

  hourly.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split("T")[0];

    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = [];
    }
    groupedByDay[dayKey].push(item);
  });

  const result = Object.entries(groupedByDay).map(([time, values]) => {
    const midday = values.reduce((prev, curr) => {
      const hour = new Date(curr.dt * 1000).getHours();
      return Math.abs(hour - 12) <
        Math.abs(new Date(prev.dt * 1000).getHours() - 12)
        ? curr
        : prev;
    });

    return {
      time: new Date(time),
      temperature: Math.round(midday.main.temp_max),
      description: midday.weather[0].description,
    };
  });

  return result;
}

export const normalizeWeather = (raw: WeatherResponse): IWeather => {
  const hourly = raw.list.slice(0, 9).map((item) => {
    return {
      time: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      description: raw.list[0].weather?.[0]?.description,
    };
  });

  const daily = transformForecast(raw.list);

  const weather = {
    city: raw.city,
    temperature: Math.round(raw.list[0].main.temp),
    feelsLike: Math.round(raw.list[0].main.feels_like),
    description: raw.list[0].weather?.[0]?.description,
    humidity: raw.list[0].main.humidity,
    windSpeed: raw.list[0].wind.speed,
    sunrise: new Date(raw.city.sunrise * 1000),
    sunset: new Date(raw.city.sunset * 1000),
    hourly,
    daily,
  };

  return weather;
};
