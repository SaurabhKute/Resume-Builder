import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { DATABASES, FRAMEWORKS, LANGUAGES, TOOLS } from "../../../utils/Constants.js";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { RootState } from "../../../app/store.js" // Import RootState type
import { addDatabase, addFramework, addProgLanguage, addTool, clearState, removeDatabase, removeFramework, removeProgLanguage, removeTool } from "../../../features/Form/slices/formSlice";

interface SkillsetsProps {
    expanded: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Skillsets: React.FC<SkillsetsProps> = () => {
    const dispatch = useDispatch();

    // Selecting skillsets from Redux store
    const progLanguages = useSelector((state: RootState) => state.resume.progLanguages || []);
    const frameWorks = useSelector((state: RootState) => state.resume.frameworks || []);
    const tools = useSelector((state: RootState) => state.resume.tools || []);
    const databases = useSelector((state: RootState) => state.resume.databases || []);

   

    // Programming Languages
    const [language, setLanguage] = useState<string | null>(null);
    const [inputLanguage, setInputLanguage] = useState<string>("");

    // Frameworks
    const [framework, setFramework] = useState<string | null>(null);
    const [inputFramework, setInputFramework] = useState<string>("");

    // Tools
    const [tool, setTool] = useState<string | null>(null);
    const [inputTool, setInputTool] = useState<string>("");

    // Databases
    const [database, setDatabase] = useState<string | null>(null);
    const [inputDatabase, setInputDatabase] = useState("");


    const handleAddLanguage = (event, newValue) => {
        if (newValue && !progLanguages.includes(newValue)) {
            dispatch(addProgLanguage({ language: newValue }));
        }
        setLanguage(null);
    };

    const handleDeleteLanguage = (languageToDelete: string) => {
        dispatch(removeProgLanguage(languageToDelete));
        setInputLanguage("");
    };

    const handleAddFramework = (event, newValue) => {
        if (newValue && !frameWorks.includes(newValue)) {
            dispatch(addFramework({ framework: newValue }));
        }
        setFramework(null);
    };

    const handleDeleteFramework = (frameworkToDelete: string) => {
        dispatch(removeFramework(frameworkToDelete));
        setInputFramework("");
    };

    const handleAddTool = (event, newValue) => {
        if (newValue && !tools.includes(newValue)) {
            dispatch(addTool({ tool: newValue }));
        }
        setTool(null);
    };

    const handleDeleteTool = (toolToDelete: string) => {
        dispatch(removeTool(toolToDelete));
        setInputTool("");
    };

    const handleAddDatabase = (event, newValue) => {
        if (newValue && !databases.includes(newValue)) {
            dispatch(addDatabase({ database: newValue }));
        }
        setDatabase(null);
    };

    const handleDeleteDatabase = (databaseToDelete: string) => {
        dispatch(removeDatabase(databaseToDelete));
        setInputDatabase("");
    };

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "60%",
                            flexShrink: 0,
                        }}
                    >
                        <LayersOutlinedIcon
                            sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                        />
                        <Typography sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}>
                            Skillsets
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Programming Languages */}
                    <Box sx={{ width: 400 }}>
                        <Autocomplete
                            value={language}
                            onChange={handleAddLanguage}
                            inputValue={inputLanguage}
                            onInputChange={(event, newInputValue) => setInputLanguage(newInputValue)}
                            options={LANGUAGES}
                            renderInput={(params) => (
                                <TextField {...params} label="Add Programming languages" />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {progLanguages.map((language: string, index: number) => (
                                <Chip
                                    key={index}
                                    label={language}
                                    onDelete={() => handleDeleteLanguage(language)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Frameworks */}
                    <Box sx={{ width: 400, mt: 2 }}>
                        <Autocomplete
                            value={framework}
                            onChange={handleAddFramework}
                            inputValue={inputFramework}
                            onInputChange={(event, newInputValue) => setInputFramework(newInputValue)}
                            options={FRAMEWORKS}
                            renderInput={(params) => (
                                <TextField {...params} label="Add libraries / frameworks" />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {frameWorks.map((framework: any, index: number) => (
                                <Chip
                                    key={index}
                                    label={framework}
                                    onDelete={() => handleDeleteFramework(framework)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Tools */}
                    <Box sx={{ width: 400, mt: 2 }}>
                        <Autocomplete
                            value={tool}
                            onChange={handleAddTool}
                            inputValue={inputTool}
                            onInputChange={(event, newInputValue) => setInputTool(newInputValue)}
                            options={TOOLS}
                            renderInput={(params) => (
                                <TextField {...params} label="Add tools / platforms" />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {tools.map((tool: any, index: number) => (
                                <Chip
                                    key={index}
                                    label={tool}
                                    onDelete={() => handleDeleteTool(tool)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Databases */}
                    <Box sx={{ width: 400, mt: 2 }}>
                        <Autocomplete
                            value={database}
                            onChange={handleAddDatabase}
                            inputValue={inputDatabase}
                            onInputChange={(event, newInputValue) => setInputDatabase(newInputValue)}
                            options={DATABASES}
                            renderInput={(params) => (
                                <TextField {...params} label="Add databases" />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {databases.map((database: any, index: number) => (
                                <Chip
                                    key={index}
                                    label={database}
                                    onDelete={() => handleDeleteDatabase(database)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Skillsets;
