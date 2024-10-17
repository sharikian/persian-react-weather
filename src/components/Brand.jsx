import { Link } from "react-router-dom";
import logo from "../static/svg/logo.svg";

const Brand = ({ onClick }) => {
  return (
    <Link
      to="/"
      className="d-flex navbar-brand align-items-center align-self-start text-center"
      onClick={onClick}
    >
      <img src={logo} width={32} alt="App logo" />
      <h1 className="fs-2 mx-2">آب و هوا</h1>
    </Link>
  );
};

export default Brand;
