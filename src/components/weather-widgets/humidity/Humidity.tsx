import { Droplets, Percent } from "lucide-react";

import { WeatherFlags, type Location } from "@/types/WeatherFlags";
import humidityLevels from "@/components/weather-widgets/humidity/humidityLevels";
import WarningMessage from "./WarningMessage";
import ErrorMessage from "../../ui/error-message";
import getCurrentLevel from "@/utils/getCurrentLevel";
import getForecastWeather from "@/utils/getForecastWeather";

const Humidity = async ({ city, lat, lon }: Partial<Location>) => {
  const weatherData: WeatherFlags | null = await getForecastWeather(
    city,
    lat,
    lon,
  );

  const { current, forecast } = weatherData ?? {};

  const humidity = current?.humidity ?? 0;

  const avgHumidity = forecast?.forecastday[0]?.day?.avghumidity ?? 0;

  const { description } = getCurrentLevel(humidity, humidityLevels);

  // Show warning if average humidity differs by more than 10% from current humidity and is higher than the current humidity,
  // to avoid displaying a lower humidity in the tooltip than in the box.
  const shouldDisplayWarningIcon =
    Math.abs(humidity - avgHumidity) > 10 && humidity < avgHumidity;

  return (
    <article className="container-style humidity">
      <div className="flex items-center gap-1">
        <h2 className="title">
          <Droplets size={16} />
          Humidity
        </h2>

        {shouldDisplayWarningIcon && (
          <WarningMessage avgHumidity={avgHumidity} />
        )}
      </div>

      {!humidity && <ErrorMessage error="Humidity" />}

      {!!humidity && (
        <>
          <p className="flex items-center gap-1 text-2xl font-semibold">
            <span>
              {humidity}
              <Percent size={18} className="inline-block" />
            </span>
          </p>
          <p className="text-sm">{description}</p>
        </>
      )}
    </article>
  );
};
export default Humidity;
