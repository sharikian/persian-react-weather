import { useSelector } from "react-redux";
import { Col, Row, Modal, Offcanvas, Card, Table } from "react-bootstrap";
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faTemperatureHalf,
  faWind,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import getWeatherData from "../utils/getWeatherData";
import { SlotGroup } from "./SlotGroup";
import { useEffect, useState } from "react";

const CustomTooltip = ({ active, payload, unit }) => {
  if (active && payload && payload.length) {
    const { code, hour, temperature } = payload.at(0).payload;

    return (
      <Card className="shadow">
        <Card.Header className="pb-0">
          <Card.Title className="fs-6">{hour}</Card.Title>
        </Card.Header>
        <Card.Body className="d-flex align-items-center pt-0">
          <img
            src={getWeatherData(code).icon.day}
            width={24}
            alt="Tooltip Icon"
          />
          <span className="ms-1">
            {getWeatherData(code).forecast_short}, {Math.round(temperature)}
            <sup>{unit}</sup>
          </span>
        </Card.Body>
      </Card>
    );
  }

  return null;
};

const RenderSwitch = ({ orderNumber, data, handleModal, temperature_unit }) => {
  console.log(data);
  switch (orderNumber) {
    case 1:
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width="100%"
            height={200}
            data={data}
            style={{ cursor: "pointer" }}
            onClick={handleModal}
          >
            <defs>
              <linearGradient id="linear-gradient" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#F5BC00" stopOpacity={1} />
                <stop offset="100%" stopColor="#1f63ee" stopOpacity={0.35} />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
              unit={temperature_unit}
              animationEasing="ease-out"
              animationDuration={1000}
            />
            <Bar
              // fill="#8884d8"
              type="monotone"
              dataKey="temperature"
              fillOpacity={1}
              fill="url(#linear-gradient)"
              stroke="#1f63ee"
            />
          </BarChart>
        </ResponsiveContainer>
      );
    case 2:
      return (
        <ResponsiveContainer width="100%" height={150}>
          <Table
            striped
            bordered
            hover
            style={{ cursor: 'pointer' }}
            onClick={handleModal}
          >
            <tbody>
              <tr>
                <td>ساعت</td>
                {data.map((item) => (
                  <td>{item.hour}</td>
                ))}
              </tr>
              <tr>
                <td>دما</td>
                {data.map((item) => (
                  <td>{item.temperature}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </ResponsiveContainer>
      );
    default:
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width="100%"
            height={200}
            data={data}
            style={{ cursor: "pointer" }}
            onClick={handleModal}
          >
            <defs>
              <linearGradient id="linear-gradient" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#F5BC00" stopOpacity={1} />
                <stop offset="100%" stopColor="#1f63ee" stopOpacity={0.35} />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
              unit={temperature_unit}
              animationEasing="ease-out"
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              fillOpacity={1}
              fill="url(#linear-gradient)"
              stroke="#1f63ee"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
  }
};

const Weather = ({ weather, units, date, hourlyWeathers }) => {
  const [modal, setModal] = useState(false);
  const [chartModel, setChartModel] = useState(0);

  const handleModal = () => setModal(!modal);
  const animationState = useSelector((state) => state.animation);
  const { floating } = animationState;

  const { temperature, weathercode, windspeed } = weather;
  const { temperature_unit, windspeed_unit } = units;

  const { icon, forecast } = getWeatherData(weathercode);
  useEffect(() => {
    document.querySelector("#root").style.opacity = 1;
  });

  const { codes, hours, temperatures } = hourlyWeathers;

  const data = hours.map((hour, index) => {
    return {
      code: codes[index],
      hour: hour.split("T").at(1),
      temperature: temperatures[index]
    };
  });

  return (
    <>
      <h6 className="fs-1">{date}</h6>
      <span className="d-block my-2">{forecast}</span>
      <Row className="align-items-center my-5" style={{ overflow: "hidden" }}>
        <Col xs="3" className="text-start">
          <FontAwesomeIcon icon={faWind} className="mx-1" size="lg" />
          {windspeed.hasOwnProperty("max") ? (
            <span className="fs-4">
              {Math.round(
                (Math.round(windspeed.max) - Math.round(windspeed.min)) / 2
              )}
            </span>
          ) : (
            <span className="fs-4">{Math.round(windspeed)}</span>
          )}
          <br />
          <span className="fs-6">{windspeed_unit}</span>
        </Col>

        <Col xs="6">
          <motion.img
            src={icon.day}
            width={192}
            alt="Weather Icon"
            animate={floating}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="weather-icon img-fluid"
            loading="lazy"
          />
        </Col>
        <Col xs="3" className="text-end">
          {temperature.hasOwnProperty("max") ? (
            <>
              <FontAwesomeIcon icon={faSun} />
              <span className="fs-4 mx-1">{Math.round(temperature.max)}</span>
              <sup className="fs-6">{temperature_unit}</sup>
              <br />
              <FontAwesomeIcon icon={faMoon} />
              <span className="fs-4 mx-1">{Math.round(temperature.min)}</span>
              <sup className="fs-6">{temperature_unit}</sup>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faTemperatureHalf}
                size="lg"
                className="me-1"
              />
              <span className="fs-4">{Math.round(temperature)}</span>
              <br />
              <span className="fs-6">{temperature_unit}</span>
            </>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center my-3" style={{ height: "200px" }}>
        <Col md="10" className="text-center">
          <RenderSwitch
            orderNumber={chartModel}
            data={data}
            handleModal={handleModal}
            temperature_unit={temperature_unit}
          />
        </Col>
      </Row>
      {/* Modal of all Categories */}
      {window.matchMedia("(max-width: 768px").matches ? (
        <Offcanvas show={modal} onHide={handleModal} placement="bottom">
          <Offcanvas.Header className="d-block p-4">
            <div
              className="d-flex mb-3"
              style={{ justifyContent: "space-between" }}
            >
              <span className="h4">نوع نمایشی خود را انتخاب کنید :</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              />
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h1>TODO: do it in html file</h1>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Modal
          show={modal}
          onHide={handleModal}
          fullscreen="md-down"
          centered
          scrollable
        >
          <Modal.Header className="d-block">
            <div className="d-flex mb-3">
              <span className="h4">نوع نمایشی را انتخاب کنید :</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                style={{ cursor: "pointer", marginRight: "10rem" }}
                onClick={handleModal}
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            {/* style={city === "" ? undefined : { height: "300px" }}> */}
            <SlotGroup setChartModel={setChartModel} onClose={handleModal} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Weather;
