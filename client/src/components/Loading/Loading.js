import { Box, CircularProgress } from "@mui/material";
import "./Loading.css";

const Loading = ({ fontSize, progressSize, textPadding }) => {
  const size = fontSize ? fontSize : "100%";
  const pad = textPadding ? textPadding : "10px";
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
      <h3 style={{ fontSize: size, padding: pad }}>Loading please wait...</h3>
      <CircularProgress size={progressSize ? progressSize : "2rem"} />
    </Box>
  );
};

export default Loading;
