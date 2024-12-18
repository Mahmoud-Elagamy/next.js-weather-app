export type HourData = {
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: boolean | undefined;
  condition: {
    text: string;
  };
  humidity: number;
  chance_of_rain: number;
};

export type DayData = {
  maxtemp_c: number;
  mintemp_c: number;
  maxtemp_f: number;
  mintemp_f: number;
  uv?: number;
  condition: {
    text: string;
  };
  daily_chance_of_rain?: number;
};

export type Location = {
  city: string;
  lat: number | string;
  lon: number | string;
  id: number;
  name: string;
  country: string;
  tz_id: string;
  localtime: string;
  timestamp: number;
};

export type Current = {
  localtime: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
  };
  air_quality: {
    pm2_5: number;
  };
  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  uv: number;
  feelslike_c: number;
  feelslike_f: number;
  is_day: boolean;
  humidity: number;
  vis_km: number;
  vis_miles: number;
};

type ForecastDay = {
  date: string;
  day: DayData;
  astro?: {
    sunrise: string;
    sunset: string;
    is_sun_up: boolean;
  };
  hour: HourData[];
};

export type WeatherFlags = {
  location?: Location;

  current?: Current;

  forecast?: {
    forecastday: ForecastDay[];
  };

  history?: ForecastDay[];

  alerts?: WeatherAlert;
};

export type WeatherAlert = {
  alert: {
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    certainty: string;
    event: string;
    note: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string;
  }[];
};
