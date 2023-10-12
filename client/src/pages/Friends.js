import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/query";
import Loading from "../components/Loading";
import "../styles/Friends.css";
import { useState } from "react";
import { useResolvedPath } from "react-router-dom";
import UserCard from "../components/UserCard";
const Friends = () => {
  const [value, setValue] = useState();
  const { data, loading, refetch } = useQuery(QUERY_USER);

  if (loading) return <Loading />;

  const showResults = (e) => {
    if (e.key === "Enter") {
      console.log("Submitting form");
      refetch({ username: value });
    }
  };

  console.log(data);
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
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

      <h3 className="friendH3">Finds some people to add!</h3>

      <div className="friendList">
        {data.users.length > 0 &&
          data.users.map(function (user) {
            return <UserCard username={user.username} />;
          })}
      </div>
    </>
  );
};

export default Friends;
