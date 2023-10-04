import "../styles/Home.css";
import { QUERY_ME } from "../utils/query";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import Loading from "../components/Loading";
const Home = () => {
  const { loading, data, error } = useQuery(QUERY_ME);

  if (loading) return <Loading />;

  return (
    <>
      <div>Home content</div>
    </>
  );
};

export default Home;
