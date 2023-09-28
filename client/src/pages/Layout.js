import { Link, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import AService from "../utils/Avatar";
import "../styles/Layout.css";
const Layout = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <article className="home-main">
        <aside className="user-section">
          <div className="userIcon">
            <Link>
              {/* <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            > */}
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
              {/* </StyledBadge> */}
            </Link>
          </div>
          <div className="friendList">
            <ul>
              <li className="friend">
                <Avatar
                  alt="User icon"
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: AService.stringToColor("Jake"),
                  }}
                  className="userIcon"
                >
                  {AService.stringAvatar("Jake Bummer")}
                </Avatar>
              </li>
              <li className="friend">
                <Avatar
                  alt="User icon"
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: AService.stringToColor("Jake"),
                  }}
                  className="userIcon"
                >
                  {AService.stringAvatar("Jake Bummer")}
                </Avatar>
              </li>
              <li className="friend">
                <Avatar
                  alt="User icon"
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: AService.stringToColor("Jake"),
                  }}
                  className="userIcon"
                >
                  {AService.stringAvatar("Jake Bummer")}
                </Avatar>
              </li>
            </ul>
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
