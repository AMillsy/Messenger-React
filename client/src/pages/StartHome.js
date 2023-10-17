//This is the page that will be presented if the user is not logged in.
import { Link } from "react-router-dom";
import "../styles/StartHome.css";
import HomeShowcase from "../components/HomeShowcase";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MessageIcon from "@mui/icons-material/Message";
import Groups2Icon from "@mui/icons-material/Groups2";
import wave from "../images/wave-haikei.svg";
const StartHome = () => {
  return (
    <div className="startMain">
      <section className="wave-con">
        <h1 className="homeTitle">TalkTide</h1>
        <p>Message easily and create groups to find new people</p>
        <p>Create or find place to belong</p>

        <img src={wave} className="waveHomeImage"></img>
      </section>
      <div className="homeLinks">
        <Link to="/login" className="linkBtn">
          Login
        </Link>
        <Link to="/signup" className="linkBtn signupBtn">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default StartHome;
