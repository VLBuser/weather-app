import { IWeather } from "@/interfaces";

export function getAddedCities(): IWeather[] {
  try {
    const raw = localStorage.getItem("addedCities");

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed.map((raw: IWeather) => ({
        city: raw.city,
        temperature: raw.temperature,
        feelsLike: raw.feelsLike,
        description: raw.description,
        humidity: raw.humidity,
        windSpeed: raw.windSpeed,
        sunrise: raw.sunrise,
        sunset: raw.sunset,
        hourly: raw.hourly,
        daily: raw.daily,
      }));
    }

    return [];
  } catch (error) {
    console.error("Something went wrong with addedCities:", error);
    return [];
  }
}

export function addCity(city: IWeather) {
  const cities = getAddedCities();

  const exists = cities.some((c) => c.city === city.city);

  if (exists) return;

  cities.push(city);
  localStorage.setItem("addedCities", JSON.stringify(cities));
}

export function removeCity(city: IWeather["city"]) {
  const cities = getAddedCities().filter((c) => c.city.name !== city.name);
  localStorage.setItem("addedCities", JSON.stringify(cities));
}

export function replaceCity(updatedCity: IWeather) {
  const cities = getAddedCities().map((c) =>
    c.city.name === updatedCity.city.name ? updatedCity : c
  );
  localStorage.setItem("addedCities", JSON.stringify(cities));
}

export function getCityByName(cityName: string): IWeather | null {
  const cities = getAddedCities();
  const city = cities.find(
    (c) => c.city.name.toLowerCase() === cityName.toLowerCase()
  );
  return city || null;
}
