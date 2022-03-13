import { Fragment } from "react";
import { Link } from "react-router-dom";
import "../scss/Home.scss";
const Home = () => {
  return <Fragment>
    <Link className="linkbutton" to='phone-auth'>Start!</Link>
  </Fragment>;
}
export default Home;