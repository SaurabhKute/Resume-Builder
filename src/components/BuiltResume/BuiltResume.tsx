import template2 from "../../assets/templates/template2.png";
import { Button, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import "./style.css";
import ConfirmationModal from "../../common/components/ConfirmationPopover/ConfirmationPopover";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const BuiltResume = () => {
const navigate = useNavigate(); 
  const [confirmationOpen, setConfirmationOpen] = useState(false);


  const handleDelete = () => {
    setConfirmationOpen(true);
  }

  const handleEdit = () =>{
    navigate('/builder/');
  }

  const handleCloseDelete = () => {
    setConfirmationOpen(false);
  }

  const handleConfirmDelete = () => {
    const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(
      fakeApiCall(),
      {
        loading: 'Deleting...',
        success: 'Deleted successfully!',
        error: 'Error occurred while deleting.',
      }
    ).then(() => {
      setConfirmationOpen(false);
      // Add your edit logic here
    });
    setConfirmationOpen(false);
    // Add your edit logic here
  }

  return (
    <>
      <div
        className="parent-card"
        style={{
          height: "410px",
          width: "280px",
          margin: "50px",
        }}
      >
        <div
          className="card-head"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontFamily: "cursive", color: "gray" }}>
            Saurabh's Resume
          </span>
          <span
            style={{
              fontFamily: "monospace",
              color: "#738f93",
              fontSize: "25px",
            }}
          >
            1
          </span>
        </div>
        <div className="hover-container">
          <Paper
            sx={{
              height: "375px",
              width: "280px",
              borderRadius: "5px",
              boxSizing: "border-box",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              backgroundColor: '#738f93',
              transition: "box-shadow 0.3s ease",
            }}
            className="paper-hover-effect"
            elevation={9}
          >
            <img
              src={template2}
              height="375px"
              width="280px"
              alt="Modern"
              loading="lazy"
              color="success"
            />
            <div className="hover-buttons">
              <BootstrapTooltip title="Edit Resume">
                <Button color="inherit" sx={{ color: '#2596be' }} onClick={handleEdit}><EditIcon /></Button>
              </BootstrapTooltip>
              <BootstrapTooltip title="Delete Resume">
                <Button color="inherit" sx={{ color: 'red' }} onClick={handleDelete}><DeleteIcon /></Button>
              </BootstrapTooltip>
            </div>
          </Paper>
        </div>
      </div>
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete ?"
        buttonText1="No"
        buttonText2="Delete"
        buttonColor2='error'
      />
      <Toaster />
    </>
  );
};

export default BuiltResume;
