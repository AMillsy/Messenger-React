import { Box, CircularProgress } from "@mui/material";
import "./Loading.css";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <h3 className="homeLoadTag">Loading please wait</h3>
      <CircularProgress size={"5rem"} />
    </Box>
  );
};

export default Loading;
