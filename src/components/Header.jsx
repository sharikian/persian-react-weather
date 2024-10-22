import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faMapSigns,
  faLocationDot,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import useInput from "../hooks/use-input";
import SearchedCityPage from "../pages/SearchedCity";
import Map from "../map/Map";

const Header = ({ searched }) => {
  const [modal, setModal] = useState(false);
  const [offcanvas, setOffcanvas] = useState(false);
  // const [collapse, setCollapse] = useState(false);

  const locationsState = useSelector((state) => state.location);
  const { location } = locationsState;

  const {
    state: { input: city },
    handleOnChange: handleCityOnChange,
  } = useInput();

  const handleModal = () => setModal(!modal);
  const handleOffcanvas = () => setOffcanvas(!offcanvas);
  // const handleCollapse = () => setCollapse(!collapse);

  return (
    <>
      <header className="App-header py-3">
        <Container>
          <Row className="align-items-center">
            <Col xs="2">
              {searched ? (
                <Link to="..">
                  <FontAwesomeIcon icon={faAngleLeft} size="xl" />
                </Link>
              ) : (
                <FontAwesomeIcon
                  // className="d-md-none"
                  icon={faMapSigns}
                  size="xl"
                  style={{ cursor: "pointer" }}
                  onClick={handleOffcanvas}
                />
              )}
            </Col>
            <Col xs="8">
              {location !== null && (
                <span className="h4">
                  <span className="ms-2">{location}</span>
                  <FontAwesomeIcon icon={faLocationDot} color="#324354" />
                </span>
              )}
            </Col>
            <Col xs="2">
              {!searched && (
                <FontAwesomeIcon
                  icon={faSearch}
                  size="xl"
                  style={{ cursor: "pointer" }}
                  onClick={handleModal}
                />
              )}
            </Col>
          </Row>
        </Container>
      </header>
      {window.matchMedia("(max-width: 768px").matches ? (
        <Offcanvas show={modal} onHide={handleModal} placement="bottom">
          <Offcanvas.Header className="d-block p-4">
            <div className="d-flex mb-3" style={{justifyContent: 'space-between'}}>
              <span className="h4">جست و جوی شهر</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                style={{ cursor: "pointer"}}
                onClick={handleModal}
                
              />
            </div>
            <FloatingLabel label="جست و جوی شهر">
              <Form.Control
                type="text"
                name="city"
                placeholder="مشهد, ایتالیا و..."
                value={city}
                onChange={handleCityOnChange}
                autoComplete="off"
              />
            </FloatingLabel>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              <SearchedCityPage city={city} />
            </ListGroup>
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
              <span className="h4">جست و جوی شهر یا کشور</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                style={{ cursor: "pointer", marginRight: "10rem" }}
                onClick={handleModal}
              />
            </div>
            <FloatingLabel label="جست و جوی شهر">
              <Form.Control
                type="text"
                name="city"
                placeholder="مشهد, ایتالیا و..."
                value={city}
                onChange={handleCityOnChange}
                autoComplete="off"
              />
            </FloatingLabel>
          </Modal.Header>
          <Modal.Body style={city === "" ? undefined : { height: "300px" }}>
            <ListGroup>
              <SearchedCityPage city={city} />
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
      {/* map show in carosel */}
      {window.matchMedia("(max-width: 2768px").matches ? ( // change 768 to 2768
        <Offcanvas show={offcanvas} onHide={handleOffcanvas} placement="bottom">
          <Offcanvas.Header className="d-block p-4">
            <div className="d-flex align-items-end mb-3" style={{justifyContent: 'space-between'}}>
              <span className="h4">نقشه ایران</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                style={{ cursor: "pointer", zIndex: 9999}}
                onClick={handleOffcanvas}
              />
            </div>
            {/* <iframe
              src="/map"
              title="Iran Map"
              width="100%"
              height="290%"
              scrolling="no"
            ></iframe> */}
            <Map />
          </Offcanvas.Header>
        </Offcanvas>
      ) : (
        <Modal
          show={offcanvas}
          onHide={handleOffcanvas}
          fullscreen="md-down"
          centered
          scrollable
        >
          <Modal.Header className="d-block">
            <div className="d-flex mb-3" style={{justifyContent: 'space-between'}}>
              <span className="h4">جست و جوی شهر یا کشور</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                style={{ cursor: "pointer", zIndex: 9999 }}
                onClick={handleOffcanvas}
              />
            </div>
            <Map/>
          </Modal.Header>
          <Modal.Body style={city === "" ? undefined : { height: "300px" }}>
            <ListGroup>
              <SearchedCityPage city={city} />
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Header;
