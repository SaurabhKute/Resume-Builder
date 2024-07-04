import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from "@mui/material";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useDispatch } from "react-redux";
import { addAwardField, removeAwardField, updateAwardField } from "../../../features/form/slices/additionalSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


interface AdditionalProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Additional: React.FC<AdditionalProps> = ({ expanded, onChange }) => {


  const dispatch = useDispatch();

  const inputAwards = useSelector((state: RootState) => state.additional.awards);


  const handleAddNewAward = () => {
    dispatch(addAwardField());
  };

  const handleRemoveAwardField = (index: number) => {
    dispatch(removeAwardField(index));
  };


  const handleAwardInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    dispatch(updateAwardField({ index, field: { award: newValue } }));
  };

  return (
    <>
      <Accordion
        //   expanded={expanded === "panel7"}
        //   onChange={handleChange("panel7")}
        expanded={expanded} onChange={onChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "60%",
              flexShrink: 0,
            }}
          >
            <WorkspacePremiumOutlinedIcon
              sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
            />
            <Typography
              sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
            >
              Additional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Honors & Awards
          </Typography>
          {inputAwards.map((award, index) => (
            <Grid
              key={index}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              mt={1}
            >
              <Grid item xs={1} mt={2}>
                <BlurOnOutlinedIcon />
              </Grid>
              <Grid item xs={9} mt={1}>
                <TextField
                  id="outlined-basic"
                  label="Awards / Honors"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={award.award}
                  onChange={(event: any) =>
                    handleAwardInputChange(index, event)
                  }
                />
              </Grid>
              <Grid item xs={1} mt={2}>
                <DeleteOutlineOutlinedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRemoveAwardField(index)}
                />
              </Grid>
            </Grid>
          ))}
          <Button
            size="medium"
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              fontStyle: "none",
              borderColor: "black",
              color: "black",
              m: 3,
            }}
            onClick={handleAddNewAward}
          >
            + Add Honors / Award
          </Button>
        </AccordionDetails>
      </Accordion>
    </>

  )
}
export default Additional;