import { Link } from "react-router-dom";
import "../styles/Home.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const Home = () => {
  return (
    <Stack spacing={1} alignItems="stretch" style={{ width: "100%" }}>
      {/* For variant="text", adjust the height via font-size */}
      <div className="userInfo">Top Bar</div>

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
};

export default Home;
