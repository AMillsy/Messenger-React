import { Link } from "react-router-dom";
import "../styles/Home.css";
import Stack from "@mui/material/Stack";
import AService from "../utils/Avatar";
import { Avatar, TextField } from "@mui/material";
import messageData from "./userMessage.json";

const Home = () => {
  const formatMessage = (message, user) => {
    if (user._id === 1) {
      return (
        <div className="message you" style={{ marginLeft: "auto" }}>
          <p>{message}</p>
          <p className="userMessage">{user._id}</p>
        </div>
      );
    }

    return (
      <div className="message they" style={{ marginRight: "auto" }}>
        <p>{message}</p>
        <p className="userMessage">{user._id}</p>
      </div>
    );
  };

  const displayMessages = () => {
    const messageRows = [];
    for (const { message, user } of messageData) {
      const jsx = formatMessage(message, user);
      messageRows.unshift(jsx);
    }

    return messageRows;
  };
  return (
    <div className="main">
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
        <Stack
          sx={{ width: "95%", alignSelf: "center", marginBottom: "10px" }}
          spacing={2}
        >
          {displayMessages()}
        </Stack>

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
