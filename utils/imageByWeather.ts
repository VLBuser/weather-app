export const getImageByWeather = (weather: string): string => {
  switch (weather) {
    case "clear sky":
      return "/clear-sky.png";
    case "few clouds":
    case "broken clouds":
      return "/few-clouds.png";
    case "rain":
    case "light rain":
    case "moderate rain":
      return "/rain.png";
    case "snow":
      return "/snow.png";
    case "thunderstorm":
      return "/thunderstorm.png";
    case "shower rain":
      return "/shower-rain.png";
    case "mist":
    case "dust":
    case "fog":
      return "/mist-dust-fog.png";
    case "overcast clouds":
      return "/overcast-clouds.png";
    case "scattered clouds":
      return "/scattered-clouds.png";
    default:
      return "/clear-sky.png";
  }
};

export const getSmallImageByWeather = (weather: string): string => {
  switch (weather) {
    case "clear sky":
      return "/smallicons/clear-sky.png";
    case "few clouds":
    case "broken clouds":
      return "/smallicons/few-clouds.png";
    case "rain":
    case "light rain":
    case "moderate rain":
      return "/smallicons/rain.png";
    case "snow":
      return "/smallicons/snow.png";
    case "thunderstorm":
      return "/smallicons/thunderstorm.png";
    case "shower rain":
      return "/smallicons/shower-rain.png";
    case "mist":
    case "dust":
    case "fog":
      return "/smallicons/mist-dust-fog.png";
    case "overcast clouds":
      return "/smallicons/overcast-clouds.png";
    case "scattered clouds":
      return "/smallicons/scattered-clouds.png";
    default:
      return "/smallicons/clear-sky.png";
  }
};
