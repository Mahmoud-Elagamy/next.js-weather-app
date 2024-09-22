import "server-only";

import { WeatherData } from "@/types/weatherData";

const fetchWeatherData = async (
  cityLocation: string = "cairo",
): Promise<WeatherData | null> => {
  const apiKey = process.env.WEATHER_API_KEY;
  const baseUrl = "https://api.weatherapi.com/v1";

  if (!apiKey || !baseUrl) {
    throw new Error("API key or base URL is missing");
  }

  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `${baseUrl}/forecast.json?key=${apiKey}&q=${cityLocation}&aqi=yes&days=3&alerts=yes`,
      { signal, next: { revalidate: 3600 } },
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: WeatherData = await res.json();

    const { current, forecast, location } = data;

    return { current, forecast, location };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
};

export default fetchWeatherData;