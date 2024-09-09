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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import timeAgo from "../../../utils/format";
import { getResumeById, updateResume } from "../../../features/Form/actions/formAction";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();


  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo || {});
  const socialLinks = useSelector((state: RootState) => state.resume.socialLinks || []);
  const progLanguages = useSelector((state: RootState) => state.resume.progLanguages || []);
  const frameWorks = useSelector((state: RootState) => state.resume.frameworks || []);
  const tools = useSelector((state: RootState) => state.resume.tools || []);
  const databases = useSelector((state: RootState) => state.resume.databases || []);
  const additionalInfo = useSelector((state: RootState) => state.resume.additionalInfo || []);
  const certificationInfo = useSelector((state: RootState) => state.resume.certificationInfo || []);
  const educationInfo = useSelector((state: RootState) => state.resume.educationInfo || []);
  const experienceInfo = useSelector((state: RootState) => state.resume.experienceInfo || []);
  const projectInfo = useSelector((state: RootState) => state.resume.projectInfo || []);

  // console.log(progLanguages, "@progLanguages");

  // const contactInfo = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean);

  const user = useSelector((state: RootState) => state.auth.user);
  const resume = useSelector((state: RootState) => state.resume.resumeResponse);

  const [path, setPath] = useState<string>('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState<string>('');

  useEffect(() => {
    setPath(location?.pathname);
  }, [location]);

  useEffect(() => {
    setNewResumeTitle(resume?.resumeTitle)
  }, [resume]);

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
    setConfirmationOpen(false);
  };

  const handleConfirmEdit = (editText: string) => {

    // console.log(editText, "@123");
    if (editText.trim() === '') {
      toast.error('Resume title cannot be empty');
      return;
    }

    toast.promise(
      dispatch(updateResume({ resumeTitle: editText, resumeId: resume._id })),
      {
        loading: 'Updating...',
        success: 'Updated successfully!',
        error: 'Error occurred while updating.',
      }
    ).then(() => {
      setConfirmationOpen(false);
      dispatch(getResumeById(resume?._id));
    }).catch((error) => {
      console.error('Error during update:', error);
    });

    setConfirmationOpen(false);
  };

  const handleEditTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewResumeTitle(event.target.value);
  };


  const handleSaveDraftClick = () => {
    const updatedResumeData = {
      personalInfo : {...personalInfo, links:socialLinks},
      skillsetInfo: {progLanguages:[...progLanguages],tools:[...tools],frameworks:[...frameWorks],databases:[...databases]},
      additionalInfo, 
      certificationInfo,
      educationInfo,
      experienceInfo,
      projectInfo,
    };
    // console.log(updatedResumeData, "@updatedResumeData");
    toast.promise(
      dispatch(updateResume({ ...updatedResumeData, resumeId: resume._id })),
      {
        loading: 'Updating...',
        success: 'Updated successfully!',
        error: 'Error occurred while updating.',
      }
    ).then(() => {
      dispatch(getResumeById(resume?._id));
    }).catch((error) => {
      console.error('Error during update:', error);
    });

  }


  const generatePDF = async () => {
    const resumeElement: any = document.querySelector(".main");
    if (!resumeElement) return;

    const originalStyle = resumeElement.getAttribute('style');
    resumeElement.style.overflow = 'visible';

    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      scrollY: -window.scrollY,
      useCORS: true,
    });

    resumeElement.setAttribute('style', originalStyle || '');

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

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
      {path === "/builder" ? (
        <div className="header-main">
          <BreadCrumb />
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: "light", fontSize: "28px" }}>
              {resume?.resumeTitle}
            </Typography>
            <div onClick={handleEditClick}>
              <EditNoteOutlinedIcon sx={{ cursor: "pointer", fontSize: "large" }} />
            </div>
            <Typography sx={{ ml: 1, mt: 0.7 }}>
              <UpdateOutlinedIcon sx={{ cursor: "pointer", fontSize: "medium", color: "#20d761" }} />
            </Typography>
            <Typography sx={{ ml: 1, mt: 0, fontSize: "12px", color: "#20d761", fontWeight: "light" }}>
              {`Updated ${timeAgo(resume?.updatedAt)}`}
            </Typography>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                className="createNew-btn"
                onClick={handleSaveDraftClick}
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
                endIcon={<SaveAsOutlinedIcon style={{ fontSize: "14px", fontWeight: "lighter" }} />}

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
                endIcon={<ArrowDownwardOutlinedIcon style={{ fontSize: "14px", fontWeight: "lighter" }} />}
              >
                Download
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                anchorEl={anchorEl}
                open={open}
                TransitionComponent={Fade}
                sx={{ right: '100px', display: 'flex', marginRight: '700px' }}
              >
                <MenuItem onClick={handleDownloadClick} sx={{ fontWeight: 'lighter' }}>Download PDF</MenuItem>
              </Menu>
            </div>
          </Box>
        </div>
      ) : (
        <div className="header-main" style={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ fontWeight: "light", fontSize: "18px", color: "#738f93", ml: "50px" }}>
            Welcome
          </Typography>
          <Typography sx={{ fontWeight: "small", fontSize: "18px", color: "#738f93", ml: "6px" }}>
            {user?.firstName}
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
      )}
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseEdit}
        onConfirm={handleConfirmEdit}
        title="Confirm Edit"
        message="Provide a text to change resume's name?"
        editText={newResumeTitle}
        onEditTextChange={handleEditTextChange}
        buttonText1="Cancel"
        buttonText2="Save"
        buttonColor2="success"
      />
      <Toaster />
    </>
  );
}
