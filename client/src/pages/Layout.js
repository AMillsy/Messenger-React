import { Link, Outlet } from "react-router-dom";
import { Avatar } from "@mui/material";
import AService from "../utils/Avatar";
import { useQuery } from "@apollo/client";
import "../styles/Layout.css";
import { QUERY_USER, QUERY_ME } from "../utils/query";
import Auth from "../utils/auth";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import * as React from "react";
import UserIcon from "../components/UserIcon";

const Layout = () => {
  const [value, setValue] = useState(0);
  const { data, loading } = useQuery(QUERY_USER);
  const { data: ME_DATA } = useQuery(QUERY_ME);
  const users = data?.users;

  const logout = () => {
    Auth.logout();
  };
  const isLoggedIn = () => {
    const isLogged = Auth.loggedIn();

    if (isLogged && ME_DATA) {
      console.log(ME_DATA);
      return (
        <>
          <Link className="logout" onClick={logout}>
            Logout
          </Link>
          <UserIcon username={ME_DATA.me.username} id={ME_DATA.me._id} />
        </>
      );
    } else {
      return <Link to={"/login"}>login</Link>;
    }
  };

  const showUsers = () => {
    if (loading) {
      return <></>;
    }
    return users.map(({ username, _id }) => {
      return (
        <li className="friend" key={_id}>
          <Link to={`/message/${_id}`}>
            <Avatar
              alt="User icon"
              sx={{
                width: 60,
                height: 60,
                bgcolor: AService.stringToColor(username),
              }}
              className="userIcon"
            >
              {AService.stringAvatar(username)}
            </Avatar>
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <article className="home-main">
        <aside className="user-section">
          <div className="userIcon">{isLoggedIn()}</div>
          <div className="friendList">
            <ul>{showUsers()}</ul>
          </div>

          <Box
            sx={{
              width: "100%",
              bottom: "0",
              left: "0",
              color: "white",
            }}
            className="navBox"
          >
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ backgroundColor: "#151515", color: "white" }}
            >
              <BottomNavigationAction
                label="Home"
                icon={<HomeIcon />}
                sx={{ color: "white" }}
              />
              <BottomNavigationAction
                label="Friends"
                icon={<PeopleIcon />}
                sx={{ color: "white" }}
              />
              <BottomNavigationAction
                label="Search"
                icon={<SearchIcon />}
                sx={{ color: "white" }}
              />
            </BottomNavigation>
          </Box>
        </aside>
        <div className="mainMessageSection">
          <Outlet />
        </div>
      </article>
    </>
  );
};

export default Layout;
