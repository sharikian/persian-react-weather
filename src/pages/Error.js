import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useRouteError } from "react-router-dom";
import Header from "../components/Header";

const geoLocationPermission = () =>
  new Promise((res, rej) =>
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => res(permissionStatus))
      .catch((permissionStatus) => rej(permissionStatus))
  );

const ErrorPage = () => {
  const [isGeoLocationAllowed, setIsGeoLocationAllowed] = useState(false);

  const error = useRouteError();
  const navigate = useNavigate();

  geoLocationPermission().then(
    (permissionStatus) =>
      (permissionStatus.onchange = (e) =>
        setIsGeoLocationAllowed(
          e.currentTarget.state === "granted" ? true : false
        ))
  );

  useEffect(() => {
    isGeoLocationAllowed && navigate("/");
  }, [isGeoLocationAllowed, navigate]);

  let message = "یک مشکلی پیش اومده";

  if (error.status === 404) message = "(404) صفحه پیدا نشد 🙁 !";

  if (error.code === 1)
    message =
      "پدسگ, قبل استفاده از برنامه مطمئن باش دسترسی مکان دادی";

  if (error.code === 2) message = "لطفا اتصال اینترنت خود را برسی کنید !";

  return (
    <>
      <Container className="px-3">
        <Header />
      </Container>
      <Container
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <img
          src={require("../static/sad-cloud.png")}
          alt="Error Page Icon"
          loading="lazy"
        />
        <div className="text-center" style={{ marginTop: "-60px" }}>
          <span className="fw-bolder" style={{ fontSize: "96px" }}>
            اوپس
          </span>
          <p className="text-muted" style={{ fontSize: "20px" }}>
            {message}
          </p>
          <Button
            type="button"
            variant="primary"
            className="d-flex align-items-center shadow mx-auto my-4"
            onClick={() => {
              geoLocationPermission().then((permissionStatus) => {
                if (permissionStatus.state === "granted")
                  window.location.reload();
                else alert("لطفا از روشن بودن مکان خود اطمینان حاصل کنید.");
              });

              navigate("/");
            }}
          >
            <span className="me-2 mx-2">نمایش آب و هوا</span>
            <img
              src={require("../static/partly-cloudy-day--v1-small.png")}
              alt="Button Icon"
            />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ErrorPage;
