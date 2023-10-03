import { Link } from "react-router-dom";
import "../styles/Home.css";
import Stack from "@mui/material/Stack";
import AService from "../utils/Avatar";
import { Avatar, TextField, CircularProgress, Box } from "@mui/material";
import messageData from "./userMessage.json";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MESSAGEGROUP } from "../utils/query";
import { CREATE_MESSAGEGROUP, CREATE_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth";
import { useEffect, useState } from "react";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [groupId, setGroupId] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  const { loading, data, error, refetch } = useQuery(QUERY_MESSAGEGROUP, {
    variables: { userId },
  });
  const [
    createGroupMut,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_MESSAGEGROUP);
  const [createMessageMut] = useMutation(CREATE_MESSAGE);

  useEffect(
    function () {
      refetch();
      setGroupId(data?.findMessages?._id);
      setMessages(data?.findMessages?.messages);
      setUsers(data?.findMessages?.users);
      console.log(groupId);
      console.log(users);
      console.log(messages);
    },
    [loading, userId]
  );

  const ME_DATA = Auth.getProfile();

  if (loading)
    return (
      <div className="loading-area">
        <CircularProgress sx={{ width: "100%", height: "100%" }} />
      </div>
    );

  //const messages = data?.findMessages?.messages;
  // const users = data?.findMessages?.users;

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
    if (!messages) return;
    const messageRows = [];
    for (const { message, user } of messages) {
      const jsx = formatMessage(message, user);
      messageRows.unshift(jsx);
    }

    return messageRows;
  };

  const sendMessage = async (e) => {
    if (!users) {
      try {
        const createMessageGroup = await createGroupMut({
          variables: { userId },
        });
        setUsers(createData?.createMessageGroup?.users);
        setMessages(createData?.createMessageGroup?.messages);
        setGroupId(createData?.createMessageGroup?._id);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const changeData = (e) => {
    const { value } = e.target;

    setMessage(value);
  };

  const checkKey = (e) => {
    if (e.keyCode != 13) return;

    sendMessage(e);
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
            onSubmit={sendMessage}
            onChange={changeData}
            onKeyDown={checkKey}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
