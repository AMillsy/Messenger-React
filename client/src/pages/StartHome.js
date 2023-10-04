//This is the page that will be presented if the user is not logged in.
import { Link } from "react-router-dom";
import "../styles/StartHome.css";
import HomeShowcase from "../components/HomeShowcase";

const StartHome = () => {
  return (
    <div className="startMain">
      <div className="startTop">
        <h2>Come to a world</h2>
        <h3>Where messaging is so easy</h3>
        <h3>And adding and finding friends is even easier</h3>
      </div>
      <div className="signInSection">
        <h3>Create your own Journey</h3>
        <div className="startLinks">
          <Link className="linkBtn startLogin" to={"/login"}>
            Login to an Account
          </Link>
          <Link className="linkBtn startSignup" to={"/signup"}>
            Create a new Account
          </Link>
        </div>
      </div>
      <div className="startShowcase">
        <HomeShowcase />
        <HomeShowcase />
        <HomeShowcase />
      </div>
    </div>
  );
};

export default StartHome;
