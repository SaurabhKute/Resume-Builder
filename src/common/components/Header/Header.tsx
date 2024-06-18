import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Box, Button, Typography } from "@mui/material";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HistoryIcon from "@mui/icons-material/History";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./style.css";

export default function Header() {
  return (
    <>
      {/* <div className="header" style={{ display: "flex", flexDirection: "row" }}>
       
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
          </div> */}

      <div className="header">
        <BreadCrumb />

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography
            variant="h4"
            sx={{ mt: 2, fontWeight: "light", fontSize: "28px" }}
          >
            Saurabh's Resume
          </Typography>
          <Typography sx={{ ml: 1, mt: 1 }}>
            <EditNoteIcon sx={{ cursor: "pointer", fontSize: "large" }} />
          </Typography>
          <Typography sx={{ ml: 1, mt: 0.7 }}>
            <HistoryIcon
              sx={{ cursor: "pointer", fontSize: "medium", color: "#20d761" }}
            />
          </Typography>
          <Typography
            sx={{
              ml: 1,
              mt: 0,
              fontSize: "12px",
              color: "#20d761",
              fontWeight: "light",
            }}
          >
            Updated 32 min ago
          </Typography>

          <Typography sx={{ marginLeft: "auto" }}>
            <Button
              className="createNew-btn"
              sx={{
                marginLeft: "auto",
                backgroundColor: "#068932",
                textTransform: "none",
                fontWeight: "light",
                marginRight: "16px",
                ":hover": {
                  bgcolor: "#068932",
                  transition: "linear",
                },
              }}
              variant="contained"
              startIcon={
                <ArrowDownwardIcon
                  style={{ fontSize: "14px", fontWeight: "lighter" }}
                />
              }
            >
              Download
            </Button>
          </Typography>
          <Typography sx={{ marginRight: "10px" }}></Typography>
        </Box>
      </div>
    </>
  );
}

BreadCrumb;
