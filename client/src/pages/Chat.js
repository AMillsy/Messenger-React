import { Link } from "react-router-dom";
import "../styles/Home.css";
import Stack from "@mui/material/Stack";
import AService from "../utils/Avatar";
import { Avatar, TextField, CircularProgress, Box } from "@mui/material";
import messageData from "./userMessage.json";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGEGROUP } from "../utils/query";
import Auth from "../utils/auth";
const Chat = () => {
  const { userId } = useParams();
  const { loading, data, error } = useQuery(QUERY_MESSAGEGROUP, {
    variables: { userId },
  });

  const ME_DATA = Auth.getProfile();

  if (loading)
    return (
      <div className="loading-area">
        <CircularProgress sx={{ width: "100%", height: "100%" }} />
      </div>
    );

  const messages = data?.findMessages?.messages;
  const users = data?.findMessages?.users;
  console.log(users);
  console.log(messages);

  const formatMessage = (message, user) => {
    if (user._id === ME_DATA.data._id) {
      return (
        <div
          className="message you"
          style={{ marginLeft: "auto", textAlign: "right" }}
        >
          <p>{message}</p>
          <p className="userMessage">{user.username}</p>
        </div>
      );
    }

    return (
      <div
        className="message they"
        style={{ marginRight: "auto", textAlign: "left" }}
      >
        <p>{message}</p>
        <p className="userMessage">{user.username}</p>
      </div>
    );
  };

  const displayMessages = () => {
    const messageRows = [];
    for (const { message, user } of messages) {
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

export default Chat;
