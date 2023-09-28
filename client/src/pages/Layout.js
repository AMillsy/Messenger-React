import { Link, Outlet } from "react-router-dom";
import { Avatar } from "@mui/material";
import AService from "../utils/Avatar";
import { useQuery } from "@apollo/client";
import "../styles/Layout.css";
import { QUERY_USER } from "../utils/query";
const Layout = () => {
  const { data, loading, error } = useQuery(QUERY_USER);

  const users = data?.users;
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
          <div className="userIcon">
            <Link to={"/login"}> login</Link>
            <Link>
              <Avatar
                alt="User icon"
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: AService.stringToColor("Dave"),
                }}
                className="userIcon"
              >
                {AService.stringAvatar("Dave Jones")}
              </Avatar>
            </Link>
          </div>
          <div className="friendList">
            <ul>{showUsers()}</ul>
          </div>
        </aside>
        <div className="mainMessageSection">
          <Outlet />
        </div>
      </article>
    </>
  );
};

export default Layout;
