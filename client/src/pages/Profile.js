import { useQuery } from "@apollo/client";
import "../styles/Profile.css";
import Auth from "../utils/auth";
import { useParams, Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from "../utils/query";
import Loading from "../components/Loading";
import UserIcon from "../components/UserIcon";

const Profile = () => {
  const ME_DATA = Auth.getProfile().data;

  const { id } = useParams();

  const { data, loading, error } = useQuery(
    id === ME_DATA._id ? QUERY_ME : QUERY_USER,
    { variables: id }
  );

  if (loading) return <Loading />;

  const user = data?.me || data?.user;

  console.log(user);

  return (
    <>
      <div className="profileIcon">
        <UserIcon username={user.username} id={user._id} />
      </div>
      <br />
      {Auth.loggedIn() && data?.me && (
        <Link className="logout" onClick={() => Auth.logout()}>
          Logout
        </Link>
      )}

      <h3 className="profileTitle">Settings</h3>
    </>
  );
};

export default Profile;
