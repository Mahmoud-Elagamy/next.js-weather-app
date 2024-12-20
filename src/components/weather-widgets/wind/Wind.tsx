import Image from "next/image";
import { Wind as WindIcon } from "lucide-react";

import { WeatherFlags, type Location } from "@/types/WeatherFlags";
import ErrorMessage from "../../ui/error-message";
import convertWindDirection from "@/components/weather-widgets/wind/convertWindDirection";
import WindSpeed from "./WindSpeed";
import getForecastWeather from "@/utils/getForecastWeather";

const Wind = async ({ city, lat, lon }: Partial<Location>) => {
  const weatherData: WeatherFlags | null = await getForecastWeather(
    city,
    lat,
    lon,
  );

  const { current } = weatherData ?? {};

  const {
    wind_kph: windSpeedKph,
    wind_mph: windSpeedMph,
    wind_degree,
    wind_dir,
  } = current ?? {};

  const convertedWindDirection = convertWindDirection(wind_dir);

  return (
    <article className="container-style wind">
      <div className="relative flex items-center">
        <h2 className="title">
          <WindIcon size={16} /> Wind
        </h2>

        {current && (
          <WindSpeed
            windSpeedKph={windSpeedKph}
            windSpeedMph={windSpeedMph}
            convertedWindDirection={convertedWindDirection}
          />
        )}
      </div>

      {!current && <ErrorMessage error="Wind" />}

      {current && (
        <div className="relative">
          <Image
            src="./../../images/compass_body.svg"
            alt="Wind compass body"
            width={100}
            height={99}
            priority
            className="mx-auto"
          />
          <Image
            src="./../../images/compass_arrow.svg"
            alt="Wind compass arrow"
            width={10.2}
            height={135}
            priority
            className={`absolute left-1/2 top-1/2 transition-transform duration-500 ease-in-out will-change-transform`}
            style={{
              transform: `translateX(-50%) translateY(-50%) rotate(${wind_degree}deg)`,
            }}
          />
          <WindSpeed
            windSpeedKph={windSpeedKph}
            windSpeedMph={windSpeedMph}
            convertedWindDirection={convertedWindDirection}
            speedOnCompass
          />
        </div>
      )}
    </article>
  );
};
export default Wind;
