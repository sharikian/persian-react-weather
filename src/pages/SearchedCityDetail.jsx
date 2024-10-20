import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Await, defer, useLoaderData } from "react-router-dom";
import { locationSliceActions } from "../store/location/location-slice";
import Spinner from "../components/Spinner";
import Root from "../components/Root";
import fetchData from "../utils/fetchData";
import { getCurrentCity } from "../utils/getCities";

const SearchedCityDetailPage = () => {
  const { weather } = useLoaderData();
  const dispatch = useDispatch();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={weather}>
        {(weather) => {
          const { daily, daily_units, hourly, current_weather } = weather.data;
          const { city } = weather;

          const {
            weathercode: hourlyWeatherCodes,
            time: hourlyTimes,
            temperature_2m: hourlyTemperatures
          } = hourly;

          const {
            temperature_2m_max: temperature_unit,
            windspeed_10m_max: windspeed_unit
          } = daily_units;

          dispatch(locationSliceActions.locate(city));

          return (
            <Root
              daily={daily}
              units={{ temperature_unit, windspeed_unit }}
              current_weather={current_weather}
              hourly={{
                hourlyWeatherCodes,
                hourlyTimes,
                hourlyTemperatures
              }}
              searched={true}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};

export default SearchedCityDetailPage;

const searchedCityLoader = async (params) => {
  const { searchedCityDetail } = params;
  // alert(searchedCityDetail);
  var city = searchedCityDetail.split("&").at(1).split("=").at(1);
  var latitude, longitude;
  if (
    searchedCityDetail.includes("latitude") ||
    searchedCityDetail.includes("longitude")
  ) {
    [latitude, longitude] = [
      Number(searchedCityDetail.split("&").at(2).split("=").at(1)),
      Number(searchedCityDetail.split("&").at(3).split("=").at(1))
    ];
  } else {
    let searched = await fetchData(
      `https://geocoding-api.open-meteo.com/v1/search?name=${getCurrentCity(
        city.toLowerCase()
      )}&country=IR`
    );
    [latitude, longitude] = [
      searched.results[0].latitude,
      searched.results[0].longitude
    ];
  }

  var data = await fetchData(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windspeed_10m_min&current_weather=true&timezone=auto`
  );

  return { data, city };
};

export const loader = ({ params }) =>
  defer({ weather: searchedCityLoader(params) });
