import { useState } from "react";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { DATABASES, FRAMEWORKS, LANGUAGES, TOOLS } from "../../../utils/constants";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { addDatabase, addFramework, addProgLanguage, addTool, removeDatabase, removeFramework, removeProgLanguage, removeTool } from "../../../features/Form/slices/skillSetSlice";
interface SkillsetsProps {
    expanded: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Skillsets: React.FC<SkillsetsProps> = () => {

    const dispatch = useDispatch();

    // Programming Languages
    const [language, setLanguage] = useState<string | null>(null);
    const [inputLanguage, setInputLanguage] = useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    // FrameWorks
    const [framework, setFramework] = useState<string | null>(null);
    const [inputFramework, setInputFramework] = useState<string>("");
    const [selectedFramework, setSelectedFramework] = useState<string[]>([]);

    // Tools
    const [tools, setTools] = useState<string | null>(null);
    const [inputTools, setInputTools] = useState<string>("");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    // Databases
    const [database, setDatabase] = useState<string | null>(null);
    const [inputDatabase, setInputDatabase] = useState("");
    const [selectedDatabases, setSelectedDatabases] = useState<string[]>([]);


    const handleAddLanguage = (event, newValue) => {
        if (newValue && !selectedLanguages.includes(newValue)) {
            setSelectedLanguages([...selectedLanguages, newValue]);
            dispatch(addProgLanguage({ language: newValue }));
        }
        setLanguage(null);
    };

    const handleDeleteLanguage = (languageToDelete: string) => {
        setSelectedLanguages(
            selectedLanguages.filter((language) => language !== languageToDelete)
        );
        dispatch(removeProgLanguage(languageToDelete));
        setInputLanguage(""); // Clear the autocomplete input
    };

    const handleAddFramework = (event, newValue) => {
        if (newValue && !selectedFramework.includes(newValue)) {
            setSelectedFramework([...selectedFramework, newValue]);
            dispatch(addFramework({ framework: newValue }));
        }
        setFramework(null);
    };

    const handleDeleteFramework = (frameworkToDelete: string) => {
        setSelectedFramework(
            selectedFramework.filter((framework) => framework !== frameworkToDelete)
        );
        dispatch(removeFramework(frameworkToDelete));
        setInputFramework(""); // Clear the autocomplete input
    };

    const handleAddTool = (event, newValue) => {
        if (newValue && !selectedTools.includes(newValue)) {
            setSelectedTools([...selectedTools, newValue]);
            dispatch(addTool({ tool: newValue }));
        }
        setTools(null);
    };

    const handleDeleteTool = (toolToDelete: string) => {
        setSelectedTools(selectedTools.filter((tool) => tool !== toolToDelete));
        dispatch(removeTool(toolToDelete));
        setInputTools("");
    };

    const handleAddDatabase = (event, newValue) => {
        if (newValue && !selectedDatabases.includes(newValue)) {
            setSelectedDatabases([...selectedDatabases, newValue]);
            dispatch(addDatabase({ database: newValue }));
        }
        setDatabase(null);
    };

    const handleDeleteDatabase = (databaseToDelete: string) => {
        setSelectedDatabases(
            selectedDatabases.filter((database) => database !== databaseToDelete)
        );
        dispatch(removeDatabase(databaseToDelete));
        setInputDatabase(""); // Clear the autocomplete input
    };


    return (
        <>
            <Accordion
            >
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
                        <Typography
                            sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                        >
                            Skillsets
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: 400 }}>
                        <Autocomplete
                            value={language}
                            onChange={handleAddLanguage}
                            inputValue={inputLanguage}
                            onInputChange={(event, newInputValue) => {
                                setInputLanguage(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={LANGUAGES}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Add Programming languages"
                                />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {selectedLanguages.map(
                                (language: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={language}
                                        onDelete={() => handleDeleteLanguage(language)}
                                        sx={{ margin: 0.5 }}
                                    />
                                )
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ width: 400, mt: 2 }}>
                        <Autocomplete
                            value={framework}
                            onChange={handleAddFramework}
                            inputValue={inputFramework}
                            onInputChange={(event, newInputValue) => {
                                setInputFramework(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={FRAMEWORKS}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Add libraries / frameworks"
                                />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {selectedFramework.map(
                                (framework: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={framework}
                                        onDelete={() => handleDeleteFramework(framework)}
                                        sx={{ margin: 0.5 }}
                                    />
                                )
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ width: 400, mt: 2 }}>
                        <Autocomplete
                            value={tools}
                            onChange={handleAddTool}
                            inputValue={inputTools}
                            onInputChange={(event, newInputValue) => {
                                setInputTools(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={TOOLS}
                            renderInput={(params) => (
                                <TextField {...params} label="Add tools / platforms" />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {selectedTools.map((tools: string, index: number) => (
                                <Chip
                                    key={index}
                                    label={tools}
                                    onDelete={() => handleDeleteTool(tools)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ width: 400, mt: 2 }}>
                        <Autocomplete
                            value={database}
                            onChange={handleAddDatabase}
                            inputValue={inputDatabase}
                            onInputChange={(event, newInputValue) => {
                                setInputDatabase(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={DATABASES}
                            renderInput={(params) => (
                                <TextField {...params} label="Add databases" />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {selectedDatabases.map(
                                (database: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={database}
                                        onDelete={() => handleDeleteDatabase(database)}
                                        sx={{ margin: 0.5 }}
                                    />
                                )
                            )}
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>

    )
}
export default Skillsets;