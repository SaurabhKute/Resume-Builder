import { Box, Button, Paper, Radio, Typography } from "@mui/material";
import { useState } from "react";
import template1 from "../../assets/templates/template1.png";
import template2 from "../../assets/templates/template2.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { createResume, getResumeById } from "../../features/Form/actions/formAction";
import { Loading } from "../../common/components";
import toast from "react-hot-toast";



const ChooseTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.auth.user);


  // console.log(user, "@user");

  const [selectedValue, setSelectedValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleConfirmClick = async () => {
    console.log(selectedValue, "@selected value");
    setLoading(true);
    setError(null);
  
    const timeoutId = setTimeout(() => {
      setLoading(false); // Stop loading after 30 seconds
    }, 30000); // 30,000 milliseconds = 30 seconds
  
    const newResumeData = {
      userId: `${user?.userId}`,
      templateId: selectedValue,
      resumeTitle: `${user?.firstName}'s Resume`,
    };
  
    try {
      // console.log(newResumeData, "@newResumeData");
      const resultAction = await dispatch(createResume(newResumeData));

      // console.log(resultAction, "@resultAction");
  
      if (createResume.fulfilled.match(resultAction)) {
        clearTimeout(timeoutId);
        toast.success("Resume Created!");
        await dispatch(getResumeById(resultAction?.payload?.resumeId))
        navigate('/builder');
      } else if (createResume.rejected.match(resultAction)) {
        clearTimeout(timeoutId);
        setLoading(false);
        toast.error(resultAction.payload?.message || "Failed to create resume.");
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      setLoading(false);
      toast.error(error.message || "An error occurred.");
    }
  };
  

  return (
    <>
      {loading && !error ? (
        <div>
          <Loading
            isLoading={loading}
            loadingText=""
            stopLoadingText="Your resume is being created, just a moment..."
            loadingDelay={500}
            autoStopAfter={150000} // Automatically stops loading after 3 seconds
            onLoadingChange={setLoading}
          />
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            "& > :not(style)": {
              m: 1,
              width: 850,
              height: 780,
            },
          }}
        >
          <Paper elevation={3}>
            <Box sx={{ m: 6 }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "#0F151F" }}>
                Select a template
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#576871", fontWeight: "light", fontSize: "16px" }}
              >
                Choose a template and start creating resume with us.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                height: "550px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  "& > :not(style)": {
                    width: 350,
                    height: 500,
                  },
                }}
              >
                <Paper elevation={4}>
                  <img
                    src={template1}
                    height="500px"
                    width="320px"
                    alt="Classic"
                    loading="lazy"
                  />
                </Paper>
                <Typography
                  sx={{
                    justifyContent: "center",
                    fontSize: "18px",
                    fontFamily: "inherit",
                  }}
                >
                  <Radio
                    checked={selectedValue === 1}
                    onChange={handleChange}
                    value="1"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    sx={{ marginBottom: "4px", color: "black" }}
                    color="success"
                  />
                  Classic
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  "& > :not(style)": {
                    width: 350,
                    height: 500,
                  },
                }}
              >
                <Paper elevation={4}>
                  <img
                    src={template2}
                    height="500px"
                    width="320px"
                    alt="Modern"
                    loading="lazy"
                    color="success"
                  />
                </Paper>
                <Typography
                  sx={{
                    justifyContent: "center",
                    fontSize: "18px",
                    fontFamily: "inherit",
                  }}
                >
                  <Radio
                    checked={selectedValue == 2}
                    onChange={handleChange}
                    value="2"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                    sx={{ marginBottom: "4px" }}
                  />
                  Modern
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                mt: 3,
                mb: 3,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  color: "black",
                  textTransform: "none",
                  marginRight: "16px",
                  ":hover": {
                    bgcolor: "#fff",
                    transition: "linear",
                  },
                }}
                variant="contained"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  borderRadius: "6px",
                  backgroundColor: "#068932",
                  textTransform: "none",
                  marginRight: "20px",
                  ":hover": {
                    bgcolor: "#068932",
                    transition: "linear",
                  },
                }}
                variant="contained"
                onClick={handleConfirmClick}
              >
                Confirm
              </Button>
            </Box>
          </Paper>
        </Box>
      )
      }
    </>
  );
};

export default ChooseTemplate;
