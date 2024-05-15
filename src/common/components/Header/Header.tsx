import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Button, Typography } from "@mui/material";
import "./style.css";
export default function Header() {
  return (
    <>
      <div className="header" style={{ display: "flex", flexDirection: "row" }}>
        <Typography
          sx={{
            fontWeight: "light",
            fontSize: "18px",
            color: "#738f93",
            ml: "50px",
          }}
        >
          Welcome
        </Typography>
        <Typography
          sx={{
            fontWeight: "small",
            fontSize: "18px",
            color: "#738f93",
            ml: "6px",
          }}
        >
          Saurabh!
        </Typography>
        <Button
          className="createNew-btn"
          sx={{
            marginLeft: "auto",
            backgroundColor: "#068932",
            textTransform: "none",
            marginRight: "16px",
            ":hover": {
              bgcolor: "#068932",
              transition: "linear",
            },
          }}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
        >
          Create New
        </Button>
      </div>
    </>
  );
}
