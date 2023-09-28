import { Link } from "react-router-dom";
import "../styles/Home.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import AService from "../utils/Avatar";
import { Avatar, TextField } from "@mui/material";

const Home = () => {
  return (
    <div className="main">
      {/* For variant="text", adjust the height via font-size */}
      <div className="userInfo">
        <Avatar
          alt="User icon"
          sx={{
            width: 45,
            height: 45,
            bgcolor: AService.stringToColor("Jake"),
          }}
          className="userIcon"
        >
          {AService.stringAvatar("Jake Bummer")}
        </Avatar>
        <p>Jake Bummer</p>
      </div>

      <div className="messenger">
        {/* For other variants, adjust the size with `width` and `height` */}
        <div className="textFieldCon">
          <TextField
            id="filled-text"
            label="Messenge"
            variant="filled"
            maxRows={3}
            sx={{ width: "90%", background: "#212121" }}
            color="secondary"
            autoComplete="on"
            multiline
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
