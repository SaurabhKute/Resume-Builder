import { Button, Paper, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import BuiltResume from "../BuiltResume/BuiltResume";
import "./style.css";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllResumeById } from "../../features/Form/actions/formAction";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.auth.user);
  const allResumes = useSelector((state: RootState) => state.resume.allResumes);
  // console.log(allResumes, "@@");


  useEffect(() => {
    dispatch(getAllResumeById(user?.userId));
  }, [user]);


  const handleCreateNewClick = () => {
    navigate('/resume');
  };

  return (
    <>
      <div className="dashboard-main">
        {allResumes && allResumes.length > 0 ? (
          allResumes.map((resume, index) => (
            <BuiltResume key={index} resumeData={resume} index={index + 1} />
          ))
        ) : (
          ''
        )}


        <div className="card-content" style={{
          transition: "transform 0.8s ease",

        }}>
          <div className="sub-card-content" onClick={handleCreateNewClick}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                alignItems: "center",
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
                  // marginRight: "10px",
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
    </>
  );
}
