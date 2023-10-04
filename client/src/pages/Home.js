import "../styles/Home.css";
import { QUERY_ME } from "../utils/query";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import Loading from "../components/Loading";
import Auth from "../utils/auth";
import StartHome from "./StartHome";
const Home = () => {
  const { loading, data, error } = useQuery(QUERY_ME);

  if (loading) return <Loading fontSize={"150%"} progressSize={"5rem"} />;

  const loggedIn = Auth.loggedIn() && data;

  if (!loggedIn) {
    return <StartHome />;
  }
};

export default Home;
