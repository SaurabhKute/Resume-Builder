import { Button, Paper, Box } from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./style.css";
import ChooseTemplate from "../ChooseTemplate/ChooseTemplate";

export default function Dashboard() {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleCreateNewClick = () => {
    setShowTemplates(true);
  };

  return (
    <>
      {!showTemplates    && (
        <div className="main">
          <div
            className="card-content"
            style={{ transition: "transform 0.8s ease" }}
          >
            <div className="sub-cart-content" onClick={handleCreateNewClick}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  alignItems: "center",
                  mt: "120px",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 115,
                    height: 90,
                  },
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                >
                  <AddCircleIcon fontSize="large" sx={{ color: "#738f93" }} />
                </Paper>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#738f93",
                  textTransform: "none",
                  m: "10px",
                }}
                variant="contained"
              >
                Create New
              </Button>
            </div>
          </div>
        </div>
      )}

      {showTemplates  && (
        <ChooseTemplate show={showTemplates} setShowTemplates={setShowTemplates} />
      )}
    </>
  );
}
