import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Fade, Menu, MenuItem, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useEffect, useState } from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ConfirmationModal from "../ConfirmationPopover/ConfirmationPopover";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import "./style.css";

export default function Header() {


  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state:RootState)=> state.auth.user);

  const [path, setPath] = useState<any>('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  

  useEffect(() => {
    setPath(location?.pathname);

  }, [location])


  const handleEditClick = () => {
    setConfirmationOpen(true); 
  };


  const handleCreateNewClick = () => {
    navigate("/resume");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownloadClick = async () => {
    setAnchorEl(null);
    await generatePDF();
  };

  const handleCloseEdit = () => {
    // setAnchorElEdit(null);
    setConfirmationOpen(false);
  };

   const handleConfirmEdit = () => {
    const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(
      fakeApiCall(),
      {
        loading: 'Updating...',
        success: 'Updated successfully!',
        error: 'Error occurred while updating.',
      }
    ).then(() => {
      setConfirmationOpen(false);
    });
    setConfirmationOpen(false);
  };

  

  const generatePDF = async () => {
    const resume: any = document.querySelector(".main");
    if (!resume) return;

    // Temporarily remove overflow to capture all content
    const originalStyle = resume.getAttribute('style');
    resume.style.overflow = 'visible';

    // Create a canvas with the entire content
    const canvas = await html2canvas(resume, {
      scale: 2, // Higher scale improves quality
      scrollY: -window.scrollY, // Include content that is currently out of view
      useCORS: true, // Allows for external styles and images
    });

    // Restore the original style
    resume.setAttribute('style', originalStyle || '');

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling to fit the entire content on one page
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const width = imgWidth * ratio;
    const height = imgHeight * ratio;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };


  return (
    <>
      {path == "/builder" ? (
        <>
          <div className="header-main">
            <BreadCrumb />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ mt: 2, fontWeight: "light", fontSize: "28px" }}
               
              >
                {`${user?.firstName}'s Resume`}
              </Typography>
              {/* <Typography sx={{ ml: 1, mt: 1 }}> */}
              <div onClick={handleEditClick}>
                <EditNoteOutlinedIcon sx={{ cursor: "pointer", fontSize: "large" }}  />
              </div>
              {/* </Typography> */}
              <Typography sx={{ ml: 1, mt: 0.7 }} >
                <UpdateOutlinedIcon
                  sx={{
                    cursor: "pointer",
                    fontSize: "medium",
                    color: "#20d761",
                  }}
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

              <div style={{ marginLeft: 'auto' }}>
              <Button
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  className="createNew-btn"
                  sx={{
                    marginLeft: "auto",
                    backgroundColor: '#1a75ff',
                    textTransform: "none",
                    fontWeight: "light",
                    marginRight: "16px",
                    ":hover": {
                      bgcolor: "#1a75ff",
                      transition: "linear",
                    },
                  }}
                  
                  endIcon={
                    <SaveAsOutlinedIcon
                      style={{ fontSize: "14px", fontWeight: "lighter" }}
                    />
                  }
                >
                  Save Draft
                </Button>

                <Button
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
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
                  onClick={handleClick}
                  endIcon={
                    <ArrowDownwardOutlinedIcon
                      style={{ fontSize: "14px", fontWeight: "lighter" }}
                    />
                  }
                >
                  Download
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  // onClose={handleClose}
                  TransitionComponent={Fade}
                  sx={{right:'100px', display:'flex', marginRight:'700px'}}
                >
                  <MenuItem onClick={handleDownloadClick} sx={{fontWeight:'lighter'}}>Download PDF</MenuItem>
                </Menu>
              </div>
              <Typography sx={{ marginRight: "10px" }}></Typography>
            </Box>
          </div>
        </>
      ) : (
        <>
          <div
            className="header-main"
            style={{ display: "flex", flexDirection: "row" }}
          >
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
             {`${user?.firstName}`}
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
              onClick={handleCreateNewClick}
            >
              Create New
            </Button>
          </div>
        </>
      )}
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseEdit}
        onConfirm={handleConfirmEdit}
        title="Confirm Edit"
        message="Provide a text to change resume's name?"
        editText="Saurabh's Resume"
        buttonText1 = "Cancel"
        buttonText2 = "Save"
        buttonColor2="success"
      />
      <Toaster />
    </>
  );
}
