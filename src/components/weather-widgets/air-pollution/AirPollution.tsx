import fetchWeatherData from "@/utils/fetchWeatherData";
import { ThermometerSnowflake } from "lucide-react";
import { Progress } from "../../ui/progress";
import airQualityLevels from "@/utils/levels/airQualityLevels";
import ErrorMessage from "../../ui/error-message";
import getCurrentLevel from "@/utils/getCurrentLevel";
import { WeatherFlags } from "@/types/WeatherFlags";

const AirPollution = async () => {
  const weatherData: WeatherFlags | null = await fetchWeatherData();

  const { current } = weatherData ?? {};

  const airQualityIndex = current?.air_quality?.pm2_5 ?? 0;

  const { description, color, level } = getCurrentLevel(
    airQualityIndex,
    airQualityLevels,
  );

  return (
    <article className="container-style air-pollution">
      <div className="flex items-center gap-1">
        <h2 className="title">
          <ThermometerSnowflake size={16} />
          Air Pollution
        </h2>
      </div>

      {!weatherData && <ErrorMessage error="Air pollution" />}

      {weatherData && (
        <>
          <h3 style={{ color: color }}>{level}</h3>
          <Progress
            value={airQualityIndex}
            max={250.4}
            className="progress-bar"
            title="Air Quality Index"
          />
          <p className="text-sm md:text-base">{description}</p>
        </>
      )}
    </article>
  );
};
export default AirPollution;