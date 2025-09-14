import axios from "axios";

import { CityType } from "./types";
import { IWeather } from "@/interfaces";

import { normalizeWeather } from "@/utils/normalizeData";

export const findCityByName = async (prompt: string): Promise<CityType[]> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${prompt}&limit=10&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    throw error;
  }
};

export const findWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<IWeather> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );

    return normalizeWeather(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
