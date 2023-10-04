//This is the page that will be presented if the user is not logged in.
import { Link } from "react-router-dom";
import "../styles/StartHome.css";
import HomeShowcase from "../components/HomeShowcase";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MessageIcon from "@mui/icons-material/Message";
import Groups2Icon from "@mui/icons-material/Groups2";
const StartHome = () => {
  return (
    <div className="startMain">
      <div className="startTop">
        <h2>Come to a world</h2>
        <h3>Where messaging is so easy</h3>
        <h3>And finding and adding friends is even easier</h3>
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
        <HomeShowcase
          svgIcon={<GroupAddIcon className="svgIcon" />}
          text={"Add friends..."}
          num={1}
        />
        <HomeShowcase
          svgIcon={<MessageIcon className="svgIcon" />}
          text={"Message to your hearts content..."}
          num={2}
        />
        <HomeShowcase
          svgIcon={<Groups2Icon className="svgIcon" />}
          text={"Create groups!"}
          num={3}
        />
      </div>
    </div>
  );
};

export default StartHome;
