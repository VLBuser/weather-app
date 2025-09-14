"use client";

import Link from "next/link";
import Image from "next/image";

import { RefreshCw, X } from "lucide-react";

import { IWeather } from "@/interfaces";

import { getImageByWeather } from "@/utils";

interface WeatherCardProps {
  weather: IWeather;
  removeCity: (city: IWeather["city"]) => void;
  refetchWeather: (
    lat: IWeather["city"]["coord"]["lat"],
    lon: IWeather["city"]["coord"]["lon"]
  ) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  removeCity,
  refetchWeather,
}) => {
  const imageUrl = getImageByWeather(weather.description);

  return (
    <Link
      href={`/weather/${weather.city.name.toLowerCase()}`}
      className="relative bg-background p-4 rounded-[12px] border border-white/10 overflow-hidden max-h-36 transition-transform delay-50 hover:scale-[1.02]"
    >
      <div className="absolute -top-[30%] right-[5%] w-fit h-fit">
        <Image
          src={imageUrl}
          alt={weather.description}
          height={162}
          width={280}
        />
      </div>
      <div className="absolute w-[24%] h-[73%] bg-white/5 rounded-full -right-[11%] -top-1/3 ">
        <X
          className="absolute bottom-[20%] left-[20%] transition-transform duration-50 ease-linear hover:scale-150 hover:text-red-400 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeCity(weather.city);
          }}
        />
      </div>
      <div className="absolute w-[24%] h-[73%] bg-white/5 rounded-full -right-[11%] -bottom-1/3 ">
        <RefreshCw
          className="absolute top-[20%] left-[20%] transition-transform duration-300 ease-linear hover:rotate-180 hover:opacity-85 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            refetchWeather(weather.city.coord.lat, weather.city.coord.lon);
          }}
        />
      </div>
      <h2 className="font-geologica font-[300] sm:text-[20px] text-[14px] leading-[100%]">
        {weather.city.name}
      </h2>
      <p className="font-geologica font-[300] sm:text-[48px] text-[32px] leading-[100%] relative mt-2.5">
        {weather.temperature}{" "}
        <sup className="font-[500] text-[12px] sm:text-[16px] absolute top-3">
          °C
        </sup>
      </p>
      <div className="font-inter font-[400] sm:text-[14px] text-[10px] leading-[100%] mt-2.5 flex flex-row gap-3.5">
        <p>
          Wind now <span className="font-[600]">{weather.windSpeed} m/s</span>
        </p>
        <p>
          Humidity <span className="font-[600]">{weather.humidity} %</span>
        </p>
        <p>
          Real feel <span className="font-[600]">{weather.feelsLike} °C</span>
        </p>
      </div>
    </Link>
  );
};

export default WeatherCard;
