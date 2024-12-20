import AirPollution from "@/components/weather-widgets/air-quality/AirQuality";
import CurrentTemperature from "@/components/weather-widgets/current-temperature/CurrentTemperature";
import FeelsLikeTemp from "@/components/weather-widgets/feels-like-temperature/FeelsLikeTemp";
import Header from "@/components/header/Header";
import Humidity from "@/components/weather-widgets/humidity/Humidity";
import SunRiseSet from "@/components/weather-widgets/sunrise-sunset/SunRiseSet";
import Ultraviolet from "@/components/weather-widgets/uv-index/Ultraviolet";
import Wind from "@/components/weather-widgets/wind/Wind";
import HourlyForecast from "@/components/weather-widgets/hourly-forecast/HourlyForecast";
import Visibility from "@/components/weather-widgets/visibility/Visibility";
import DaysForecast from "@/components/weather-widgets/days-forecast/DaysForecast";
import LocationDetector from "@/components/LocationDetector";
import Preloader from "@/components/ui/loading-indicators/Preloader";
import WeatherTheme from "@/components/WeatherTheme";
import type { Metadata } from "next";

// Types
type SearchParams = Promise<{
  city: string;
  lat: string;
  lon: string;
}>;

// Metadata tags
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { city } = await searchParams;

  const title = city ? `Climatic | Weather in ${city}` : "Climatic";

  return {
    title: title,
    description:
      "Climatic provides accurate, real-time weather updates for cities worldwide. Check current conditions, detailed forecasts, and more for your location.",
    keywords:
      "weather app, real-time weather updates, city weather, weather forecast, air quality, weather by city, climate tracker",
    authors: [{ name: "Mahmoud Elagamy", url: "https://agamy.netlify.app/" }],
    creator: "Mahmoud Elagamy",
    openGraph: {
      title: title,
      description:
        "Get accurate and real-time weather updates for your city. Check the current temperature, forecasts, and more.",
      url: "https://climatic-app.netlify.app/",
      siteName: "Climatic",
      type: "website",
    },
  };
}

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: SearchParams;
}>) {
  const { city, lat, lon } = await searchParams;

  const shouldDetectLocation = !city && !lat && !lon;

  return (
    <>
      <div
        className={`${!lat && !lon && !city ? "pointer-events-none opacity-50" : ""} relative z-[1]`}
      >
        <Header />
      </div>
      {shouldDetectLocation && <LocationDetector />}
      {lat || lon || city ? (
        <main className="flex flex-col gap-2 md:flex-row md:gap-4">
          <WeatherTheme city={city} lat={lat} lon={lon} />
          <section className="flex w-full min-w-[18rem] flex-col gap-2 md:w-[144px] md:gap-4">
            <CurrentTemperature city={city} lat={lat} lon={lon} />
            <DaysForecast city={city} lat={lat} lon={lon} />
          </section>
          <section className="grid h-full grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <FeelsLikeTemp city={city} lat={lat} lon={lon} />
            <Humidity city={city} lat={lat} lon={lon} />
            <Wind city={city} lat={lat} lon={lon} />
            <Visibility city={city} lat={lat} lon={lon} />
            <Ultraviolet city={city} lat={lat} lon={lon} />
            <AirPollution city={city} lat={lat} lon={lon} />
            <SunRiseSet city={city} lat={lat} lon={lon} />
            <HourlyForecast city={city} lat={lat} lon={lon} />
          </section>
        </main>
      ) : (
        <Preloader city={city} lat={lat} lon={lon} />
      )}
    </>
  );
}
