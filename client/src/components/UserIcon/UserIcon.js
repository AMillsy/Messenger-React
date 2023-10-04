import "./UserIcon.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import AService from "../../utils/Avatar";
const UserIcon = ({ username, id }) => {
  return (
    <>
      <div className="userProfile">
        <Link to={`/profile/${id}`}>
          <Avatar
            alt="User icon"
            sx={{
              width: 80,
              height: 80,
              bgcolor: AService.stringToColor(`${username}`),
            }}
            className="userIcon"
          >
            {AService.stringAvatar(username)}
          </Avatar>
        </Link>
        <h3 className="meUsername">{username}</h3>
      </div>
    </>
  );
};

export default UserIcon;
