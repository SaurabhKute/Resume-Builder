import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store'; // Adjust path as per your project structure
import {
  setPersonalInfo,
  addInputField,
  removeInputField,
  updateInputField,
} from '../../features/form/formSlice';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { SOCIAL_LINKS } from '../../utils/Constants'; // Adjust path as per your project structure

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.form.personalInfo);
  const inputFields = useSelector((state: RootState) => state.form.socialLinks);
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [linkCounter, setLinkCounter] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddNewLink = () => {
    if (linkCounter < 5) {
      dispatch(addInputField());
      setLinkCounter(linkCounter + 1);
    }
  };

  const handleRemoveField = (index: number) => {
    if (linkCounter > 0) {
      dispatch(removeInputField(index));
      setLinkCounter(linkCounter - 1);
    }
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    dispatch(
      updateInputField({
        index,
        field: { ...inputFields[index], [name]: value },
      })
    );
  };

  const handlePersonalInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    dispatch(setPersonalInfo({ [name]: value }));
  };

  return (
    <div
      style={{
        border: '0.1px solid gray',
        width: '500px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Resume Details" value={0} />
          <Tab label="Resume Matcher" value={1} />
        </Tabs>
        {value === 0 ? (
          <div>
            <Accordion defaultExpanded onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '60%',
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 'light', fontSize: '16px', p: 0.1 }}
                  >
                    Personal Info
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                  Personal Info
                </Typography>

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  mt={1}
                >
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="first-name"
                      name="firstName"
                      type="text"
                      label="First Name"
                      placeholder="John"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="last-name"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="john@example.com"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="phone"
                      name="phone"
                      type="text"
                      label="Phone"
                      placeholder="+91 2354 6545 34"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="address"
                      name="address"
                      type="text"
                      label="Address"
                      placeholder="123 Main Street New York"
                      value={personalInfo.address}
                      onChange={handlePersonalInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="job-title"
                      name="jobTitle"
                      type="text"
                      label="Job Title"
                      placeholder="Full Stack Developer"
                      value={personalInfo.jobTitle}
                      onChange={handlePersonalInfoChange}
                    />
                  </Grid>
                </Grid>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: 'bold', mt: 2 }}
                >
                  Links {`(${linkCounter}/5)`}
                </Typography>

                {inputFields.map((inputField, index) => (
                  <Grid
                    key={index}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={5} mt={1}>
                      <TextField
                        name="link"
                        type="text"
                        label="Link"
                        placeholder="Your link here"
                        value={inputField.link}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Grid>
                    <Grid item xs={5} mt={1}>
                      <FormControl fullWidth>
                        <InputLabel
                          id={`link-type-label-${index}`}
                        >
                          Link Type
                        </InputLabel>
                        <Select
                          labelId={`link-type-label-${index}`}
                          id={`link-type-${index}`}
                          name="linkType"
                          value={inputField.linkType}
                          label="Link Type"
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          {SOCIAL_LINKS.map((name, idx) => (
                            <MenuItem key={idx} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2} mt={3}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveField(index)}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                    fontStyle: 'none',
                    borderColor: 'black',
                    color: 'black',
                    m: 3,
                  }}
                  onClick={handleAddNewLink}
                  disabled={linkCounter === 5}
                >
                  {linkCounter < 5 ? '+ Add Link' : 'Max number of links added'}
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <div>Resume Matcher content goes here...</div>
        )}
      </Box>
    </div>
  );
};

export default Form;
