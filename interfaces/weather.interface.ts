import { City } from "@/api";

export interface IWeather {
  city: City;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  sunrise: Date;
  sunset: Date;
  hourly: ForecastItem[];
  daily: ForecastItem[];
}

export interface ForecastItem {
  time: Date;
  temperature: number;
  description: string;
}
