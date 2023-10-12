import "./UserCard.css";
import AService from "../../utils/Avatar";
const UserCard = ({ username }) => {
  return (
    <div
      className="userCard"
      style={{ backgroundColor: AService.stringToColor(username) }}
    >
      <h2 className="userTitle">{username[0]}</h2>
      <div className="userSections">
        <h3>{username}</h3>
        <button>Add</button>
      </div>
    </div>
  );
};

export default UserCard;
