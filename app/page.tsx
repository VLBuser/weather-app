"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import WeatherCard from "@/components/WeatherCard";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";

import { CityType, findWeatherByCoords } from "@/api";

import { IWeather } from "@/interfaces";

import { addCity, getAddedCities, removeCity, replaceCity } from "@/utils";

import sunny from "../public/clear-sky.png";

export default function Home() {
  const [cities, setCities] = useState<IWeather[]>([]);
  const addedCities = getAddedCities();

  useEffect(() => {
    if (Array.isArray(addedCities) && addedCities.length > 0) {
      setCities(addedCities);
    }
  }, []);

  const onSelectCity = async (city: CityType) => {
    const weatherData = await findWeatherByCoords(city.lat, city.lon);

    addCity(weatherData);

    const exists = addedCities.some(
      (c) => c.city.name === city.name && c.city.country === city.country
    );

    if (exists) {
      toast.error("City already added");
      return;
    }

    setCities((prev) => [...prev, weatherData]);
  };

  const onRemoveCity = (city: IWeather["city"]) => {
    removeCity(city);

    setCities((prev) =>
      prev.filter(
        (c) => c.city.name !== city.name || c.city.country !== city.country
      )
    );

    toast.success("City removed");
  };

  const refetchWeather = async (
    lat: IWeather["city"]["coord"]["lat"],
    lon: IWeather["city"]["coord"]["lon"]
  ) => {
    const weatherData = await findWeatherByCoords(lat, lon);

    replaceCity(weatherData);

    setCities((prev) =>
      prev.map((c) => (c.city.name === weatherData.city.name ? weatherData : c))
    );
  };

  return (
    <main className="bg-background text-foreground py-[5%] px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={sunny}
          className="absolute -right-[30%] -top-[35%] w-[150%] sm:w-[100%] md:w-[80%] z-10 -rotate-[164deg] opacity-40 sm:opacity-60 md:opacity-100"
          alt="sunny"
        />
      </div>

      <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-0 sm:px-6 md:px-8 z-50">
        <h1 className="font-geologica font-[200] text-3xl sm:text-4xl md:text-5xl leading-[110%]">
          Weather Forecast
        </h1>
        <AutoSuggestSearch onSelect={(city: CityType) => onSelectCity(city)} />
      </header>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 bg-[#1F1F1F] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 mt-6 sm:mt-8 z-20">
        {cities.map((weather) => (
          <WeatherCard
            key={weather.city.id}
            weather={weather}
            removeCity={(city: IWeather["city"]) => onRemoveCity(city)}
            refetchWeather={(
              lat: IWeather["city"]["coord"]["lat"],
              lon: IWeather["city"]["coord"]["lon"]
            ) => refetchWeather(lat, lon)}
          />
        ))}
      </div>
    </main>
  );
}
