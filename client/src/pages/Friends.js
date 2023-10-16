import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/query";
import { ADD_FRIEND } from "../utils/mutations";
import Loading from "../components/Loading";
import "../styles/Friends.css";
import { useState } from "react";
import UserCard from "../components/UserCard";
const Friends = () => {
  const [value, setValue] = useState("");
  //Sets up to say no users have been found
  const [jsx, setJsx] = useState();
  const { data, loading, refetch } = useQuery(QUERY_USER, {
    skip: !value,
  });

  const [addFriendMut, { data: friendData }] = useMutation(ADD_FRIEND);
  if (loading) return <Loading />;

  const showResults = async (e) => {
    if (e.key === "Enter") {
      const { data: newData } = await refetch({ username: value });

      if (newData.users.length === 0) {
        return setJsx(<h3>No users found</h3>);
      }
      return setJsx(<></>);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const addFriend = async (id) => {
    await addFriendMut({ variables: { userId: id } });

    window.location.reload();
  };

  return (
    <>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        sx={{
          background: "#212121",
          margin: "10px",
          borderRadius: "0.5rem",
          color: "white",
          input: { color: "white" },
        }}
        placeholder="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: { color: "white" },
        }}
        value={value}
        onChange={handleChange}
        onKeyDown={showResults}
      />

      <h3 className="friendH3">Find some people to add!</h3>

      <div className="friendList">
        {data &&
          data.users.length > 0 &&
          data.users.map(function ({ _id, username }) {
            return (
              <UserCard
                username={username}
                addFriend={addFriend}
                id={_id}
                key={_id}
              />
            );
          })}
        {jsx}
      </div>
    </>
  );
};

export default Friends;
