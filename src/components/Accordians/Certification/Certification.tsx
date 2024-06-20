import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from "@mui/material";
import {  addCertificateField, removeCertificateField,  updateCertificateField } from "../../../features/form/slices/certificationSlice";

interface CertificationProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Certification: React.FC<CertificationProps> = ({ expanded, onChange }) => {

    const dispatch = useDispatch();

    const inputCertificates = useSelector((state: RootState) => state.certificate.certificate);


    const handleAddNewCertificate = () => {
      dispatch(addCertificateField());
    };
  
    const handleRemoveCertificate = (index: number) => {
      dispatch(removeCertificateField(index));
    };
  
  
    const handleCertificateInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(updateCertificateField({ index, field: { certificate: newValue } }));
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
              Certifications
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          Certificates
          </Typography>
          {inputCertificates.map((certificate, index) => (
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
                  label="Certifications"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={certificate.certificate}
                  onChange={(event: any) =>
                    handleCertificateInputChange(index, event)
                  }
                />
              </Grid>
              <Grid item xs={1} mt={2}>
                <DeleteOutlineOutlinedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRemoveCertificate(index)}
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
            onClick={handleAddNewCertificate}
          >
            + Add Certificate
          </Button>
        </AccordionDetails>
      </Accordion>
    </>

  )
}
export default Certification;