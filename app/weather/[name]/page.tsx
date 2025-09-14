"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { format, isSameDay } from "date-fns";
import { motion } from "framer-motion";

import LineWeatherChart from "@/components/LineWeatherChart";
import BackButton from "@/components/BackButton";

import { Loader2Icon } from "lucide-react";

import {
  capitalizeFirstLetter,
  getCityByName,
  getImageByWeather,
  getSmallImageByWeather,
} from "@/utils";

const Page = () => {
  const params = useParams();
  const rawName = typeof params.name === "string" ? params.name : "";
  const cityName = decodeURIComponent(rawName);

  const weather = typeof cityName === "string" ? getCityByName(cityName) : null;

  if (weather === null) {
    return (
      <div className="fixed inset-y-0 left-[50%] flex items-center justify-center">
        <Loader2Icon className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  const backgroundImageUrl = getImageByWeather(weather?.description);
  const MotionImage = motion(Image);

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col relative md:h-[calc(100vh-10vh)] md:w-[calc(100vw-5vw)] rounded-3xl bg-[#1F1F1F] overflow-hidden justify-between px-10"
      >
        <div>
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex md:flex-row md:gap-20 place-self-center md:p-8 p-4 gap-8 pl-8"
          >
            <p className="font-geologica font-[200] text-[16px] leading-[100%]">
              {weather.city.name}, {weather.city.country}
            </p>
            <p className="font-geologica font-[200] text-[16px] leading-[100%]">
              {format(weather.hourly[0].time, "EEE, dd MMMM")}
            </p>
          </motion.div>
        </div>

        <MotionImage
          src={backgroundImageUrl}
          alt="weather background"
          width={320}
          height={192}
          className="md:absolute md:right-1/7 md:top-0 md:w-[60%] z-10"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          priority
        />

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden absolute right-[5%] top-1/8 bg-[#222222]/45 rounded-[20px] border border-white/10 p-6 z-50 md:flex flex-col gap-5 w-[25%]"
        >
          {weather.daily.map((item, index) => {
            const imageUrl = getSmallImageByWeather(item.description);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src={imageUrl}
                    alt="day weather"
                    height={48}
                    width={48}
                  />
                  <div>
                    <p className="font-geologica font-[200] text-[20px] leading-[100%] pb-0.5">
                      {isSameDay(item.time, new Date())
                        ? "Today"
                        : format(item.time, "EEEE")}
                    </p>
                    <p className="font-geologica font-[200] text-[15px] leading-[100%]">
                      {capitalizeFirstLetter(item.description)}
                    </p>
                  </div>
                </div>
                <p className="font-geologica font-[200] text-[24px] leading-[100%]">
                  {item.temperature} °C
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-geologica font-[100] text-[128px] leading-[100%]">
            {weather.temperature}
            <sup className="font-[400] text-[48px] align-super">°C</sup>
          </h1>
          <h2 className="font-geologica font-[100] text-[40px] leading-[100%]">
            {capitalizeFirstLetter(weather.description)}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:flex md:flex-row gap-4 md:w-[50%] md:mb-0 md:mt-0 w-full grid grid-cols-2 grid-rows-3 place-items-center mb-6 mt-6"
        >
          <span className="font-geologica font-[100] text-[18px] leading-[150%] text-center">
            Temperature <br />
            {weather.temperature} °C
          </span>
          <span className="font-geologica font-[100] text-[18px] leading-[150%] text-center">
            Real feel <br />
            {weather.feelsLike} °C
          </span>
          <span className="font-geologica font-[100] text-[18px] leading-[150%] text-center">
            Wind <br />
            {weather.windSpeed} m/s
          </span>
          <span className="font-geologica font-[100] text-[18px] leading-[150%] text-center">
            Humidity <br />
            {weather.humidity} %
          </span>
          <span className="font-geologica font-[100] text-[18px] leading-[150%] text-center">
            Rise <br />
            {format(weather.sunrise, "HH:mm")}
          </span>
          <span className="font-geologica font-[100] text-[18px] leading-[150%] text-center">
            Set <br />
            {format(weather.sunset, "HH:mm")}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-[30%] flex items-center justify-center"
        >
          <LineWeatherChart hourly={weather.hourly} />
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Page;
