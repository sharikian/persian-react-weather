import { Link } from "react-router-dom";
import logo from "../static/svg/logo.svg";

const Brand = ({ onClick }) => {
  return (
    <Link
      to="/"
      className="d-flex navbar-brand align-items-center align-self-center text-center"
      style={{
        position: "sticky",
        top: "10px",
        zIndex: 2,
        backgroundColor: "darkslategrey",
        width: "inherit",
        justifyContent: "center",
        borderRadius: "1rem",
        boxShadow: "0rem 0.3rem #2f2f44",
        padding: "0.5rem"
      }}
      onClick={onClick}
    >
      <img src={logo} width={32} alt="App logo" />
      <h1 className="fs-2 mx-2">آب و هوا</h1>
    </Link>
  );
};

export default Brand;
