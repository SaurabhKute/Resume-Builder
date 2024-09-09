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
import { deleteResume, getAllResumeById, getResumeById } from "../../features/Form/actions/formAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { clearState } from "../../features/Form/slices/formSlice";

interface BuiltResumeProps {
  resumeData: {
    _id: string;
    resumeTitle: string;
    templateId: number;
  };
  onEdit?: (resumeId: string) => void;
  onDelete?: (resumeId: string) => void;
  index: number;
}


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



const BuiltResume: React.FC<BuiltResumeProps> = ({ resumeData, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.auth.user);


  const [confirmationOpen, setConfirmationOpen] = useState(false);


  const handleDelete = () => {
    setConfirmationOpen(true);
  }

  const handleEdit = () => {
    dispatch(getResumeById(resumeData._id))
      .unwrap()
      .then(() => {
        navigate('/builder');
      })
      .catch((error) => {
        console.error('Failed to load resume:', error);
        toast.error(error.message);
      });
  };


  const handleCloseDelete = () => {
    setConfirmationOpen(false);
  }

  const handleConfirmDelete = () => {
    // Replace fakeApiCall with the actual API call
    toast.promise(
      dispatch(deleteResume(resumeData._id)), // Call the delete API with the resume ID
      {
        loading: 'Deleting...',
        success: 'Deleted successfully!',
        error: 'Error occurred while deleting.',
      }
    ).then(() => {
      setConfirmationOpen(false);
      dispatch(clearState());
      dispatch(getAllResumeById(user?.userId));
      // Add your edit logic here if necessary
    }).catch((error) => {
      // Handle any additional error logic here if necessary
      console.error('Error during deletion:', error);
    });

    setConfirmationOpen(false);
    // Add your edit logic here if necessary
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
            {resumeData.resumeTitle}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              color: "#738f93",
              fontSize: "25px",
            }}
          >
            {index}
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
