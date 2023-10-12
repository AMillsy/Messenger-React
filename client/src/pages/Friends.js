import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/Friends.css";
const Friends = () => {
  return (
    <>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        sx={{
          background: "#212121",
          margin: "10px",
          borderRadius: "0.5rem",
          color: "white",
          "&:hover": { borderBottomColor: "orange" },
          "&:after": { borderBottomColor: "orange" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: { color: "white" },
        }}
      />
    </>
  );
};

export default Friends;
