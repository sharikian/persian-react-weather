import { useCallback, useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CircleFlag } from "react-circle-flags";
import { getCurrentCity } from "../utils/getCities";

const SearchedCityPage = ({ city }) => {
  const [searchedCity, setSearchedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${getCurrentCity(city.toLowerCase())}&country=IR`
      );

      if (!response.ok) throw new Error("اطلاعات پیدا نشد !");

      const data = await response.json();

      if (!data.results) {
        setError(true);
        setErrorMessage(`شهر (${city}) پیدا نشد !`);
        return;
      }

      setSearchedCity(data);
      console.log(searchedCity)
      setIsLoading(false);
      setError(false);
    } catch (eror) {
      setError(true);
      setErrorMessage(`شهر (${city}) پیدا نشد !`);
      setIsLoading(false);
    }
    setIsLoading(false);
    setError(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      city !== "" && fetchData();
    }, 500);

    return () => clearTimeout(identifier);
  }, [fetchData, city]);

  return (
    <>
      {isLoading && !error && (
        <center>
          <Spinner variant="primary" />
        </center>
      )}
      {error && city !== "" && city.length >= 2 && <p>{errorMessage}</p>}
      {!isLoading &&
        !error &&
        searchedCity &&
        searchedCity.results !== undefined &&
        searchedCity.results.map((result, index) => (
          <Link
            to={`/search/country=${result.country_code}&cityname=${result.name}&latitude=${result.latitude}&longitude=${result.longitude}`}
            className="mb-2"
            key={index}
          >
            <motion.div
              animate={{ opacity: [0, 1], y: [-10, 0] }}
              whileHover={{
                x: 10,
                transition: { ease: "easeOut", duration: 0.35 },
              }}
              transition={{ ease: "easeInOut", duration: 0.5, delay: 0.35 }}
            >
              <ListGroup.Item className="d-flex align-items-center">
                <CircleFlag
                  countryCode={result.country_code.toLowerCase()}
                  height={24}
                />
                <span className="ms-2">{result.name}</span>
              </ListGroup.Item>
            </motion.div>
          </Link>
        ))}
    </>
  );
};

export default SearchedCityPage;
