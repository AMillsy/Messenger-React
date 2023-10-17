import "../styles/Chat.css";
import Stack from "@mui/material/Stack";
import AService from "../utils/Avatar";
import { Avatar, TextField, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MESSAGEGROUP, QUERY_ONE_USER, QUERY_USER } from "../utils/query";
import { CREATE_MESSAGEGROUP, CREATE_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth";
import { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_MESSAGE } from "../utils/subscription";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [groupId, setGroupId] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const { userId } = useParams();
  const ME_DATA = Auth.getProfile();
  const { loading: userLoading, data: userData } = useQuery(QUERY_ONE_USER, {
    variables: { userId: userId },
  });
  const { loading, data, refetch } = useQuery(QUERY_MESSAGEGROUP, {
    variables: { userId },
  });

  const { error } = useSubscription(SUBSCRIBE_MESSAGE, {
    variables: { userId: ME_DATA.data._id },
    shouldResubscribe: true,
    onData: function ({ data }) {
      if (data?.data?.recieveMessage) {
        console.log(data.data);
        const newMessage = data?.data?.recieveMessage;

        if (newMessage.user._id != userId) {
          //Show notification that someone has messaged you
          return;
        }
        if (!messages || messages?.length === 0) {
          setMessages([{ message: newMessage.message, user: newMessage.user }]);
          return;
        }
        setMessages([
          { message: newMessage.message, user: newMessage.user },
          ...messages,
        ]);
      }
    },
  });

  const [createGroupMut] = useMutation(CREATE_MESSAGEGROUP);
  const [createMessageMut] = useMutation(CREATE_MESSAGE);

  useEffect(
    function () {
      refetch();
      setGroupId(data?.findMessages?._id);
      setMessages(data?.findMessages?.messages);
      setUsers(data?.findMessages?.users);

      userData?.user && setUserInfo(userData?.user);
    },
    [loading, userId, userLoading]
  );

  if (loading || userLoading)
    return (
      <div className="loading-area">
        <CircularProgress sx={{ width: "100%", height: "100%" }} />
      </div>
    );

  console.log(userInfo);

  //const messages = data?.findMessages?.messages;
  // const users = data?.findMessages?.users;

  const formatMessage = (message, user) => {
    if (user._id === ME_DATA.data._id) {
      return (
        <div
          key={message?._id}
          className="message you"
          style={{ marginLeft: "auto", textAlign: "right", marginTop: "20px" }}
        >
          <p>{message}</p>
          <p className="userMessage">{user.username}</p>
        </div>
      );
    }

    return (
      <div
        className="message they"
        style={{ marginRight: "auto", textAlign: "left", marginTop: "20px" }}
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
      messageRows.push(jsx);
    }

    return messageRows;
  };

  const sendMessage = async (e) => {
    if (!message) return;
    if (!users) {
      try {
        const { data } = await createGroupMut({
          variables: { userId },
        });

        setUsers(data?.createMessageGroup?.users);
        setMessages(data?.createMessageGroup?.messages);
        setGroupId(data?.createMessageGroup?._id);
        await appendMessage(data.createMessageGroup._id, true);
      } catch (error) {}
    } else {
      appendMessage(groupId, false);
    }
  };
  const appendMessage = async (groupId, newGroup) => {
    const { data } = await createMessageMut({
      variables: { groupId, message },
    });

    const { message: newMessage, user } = data.createMessage;

    if (newGroup) {
      setMessages([{ message: newMessage, user }]);
    } else {
      setMessages([{ message: newMessage, user }, ...messages]);
    }

    setMessage("");
  };
  const changeData = (e) => {
    const { value } = e.target;

    setMessage(value);
  };

  const checkKey = (e) => {
    if (e.keyCode == 13 && e.shiftKey) {
    }

    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="main">
      <div className="userInfo">
        {userInfo && (
          <>
            <Avatar
              alt="User icon"
              sx={{
                width: 45,
                height: 45,
                bgcolor: AService.stringToColor(userInfo.username),
              }}
              className="userIcon"
            >
              {AService.stringAvatar(userInfo.username)}
            </Avatar>
            <p>{userInfo.username}</p>
          </>
        )}
      </div>

      <div className="messenger">
        <Stack
          sx={{
            width: "95%",
            alignSelf: "center",
            marginBottom: "10px",
            overflow: "auto",
            height: "100%",
            flexDirection: "column-reverse",
          }}
          spacing={1}
          className="messageStack"
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
            value={message}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
