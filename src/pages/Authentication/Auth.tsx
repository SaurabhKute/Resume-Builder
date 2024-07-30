import {
    Grid,
    Typography,
    Box,
    TextField,
    Button,
    styled,
} from "@mui/material";
import google from "../../assets/templates/google.svg";
import github from "../../assets/templates/github.svg";
import linkedin from "../../assets/templates/linkedin.svg";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import resume from '../../assets/templates/resume6.png';
import "./style.css";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "gray",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#e6e6e6",
        },
        "&:hover fieldset": {
            // borderColor: '#1a1a1a',
        },
        "&.Mui-focused fieldset": {
            borderColor: "#1a1a1a",
        },
    },
});

const Auth = () => {

    const navigate = useNavigate();

    const [isSignUpRequest, setSignUpRequest] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClick = () => {
        if (isSignUpRequest) {
            setSignUpRequest(false);
            navigate('/login');
        }
        else {
            setSignUpRequest(true);
            navigate('/register');
        }
    }


    const handleLoginOrRegisterClick = (e) => {
        if (isSignUpRequest) {
            navigate('/login');
        }
        else {

            navigate('/register');
        }
    }

    return (
        <>
            <div>
                <Grid container component="main" sx={{ height: "100vh" }}>
                    <Grid
                        item
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#f2f2f2",
                            border: "1px solid gray",
                            borderStyle: "hidden",
                        }}
                        md={4}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", ml: 14, mt: 10, p: 2 }}
                        >
                            Hi, Welcome back
                        </Typography>
                        <Typography sx={{ ml: 10, color: "gray" }}>
                            More effectively with optimized workflows.
                        </Typography>
                        <Box sx={{ ml: 5, mt: 3 }}>
                            <img src={resume} height="350px" />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        md={8}
                    >
                        <Box
                            sx={{
                                // border: "1px solid black",
                                height: "450px",
                                width: "450px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mt: 2, mb: 1 }}
                            >{isSignUpRequest ? 'Get started absolutely free' :
                                'Sign in to your account'}
                            </Typography>
                            <Typography
                                className=""
                                sx={{
                                    fontWeight: "light",
                                    color: "gray",
                                    fontSize: "14px",
                                    mb: 2,
                                }}
                            >
                                {isSignUpRequest ? "Already have an account?" : " Don't have an account?"} {" "}
                                <span
                                    className="small-text"
                                    style={{ color: "#00a76f", fontWeight: "normal" }}
                                    onClick={handleClick}
                                >
                                    {isSignUpRequest ? "Sign in" : "Get started"}
                                </span>
                            </Typography>
                            {isSignUpRequest && (
                                <Grid container sx={{}}>
                                    <Grid md={5.7} mr={2.7}>
                                        <CssTextField
                                            id="custom-css-outlined-input"
                                            label="First Name"
                                            variant="outlined"
                                            // focused
                                            fullWidth
                                            sx={{ mt: 1, mb: 2 }}
                                        />
                                    </Grid>
                                    <Grid md={5.7}>
                                        <CssTextField
                                            id="custom-css-outlined-input"
                                            label="Last Name"
                                            variant="outlined"
                                            // focused
                                            fullWidth
                                            sx={{ mt: 1, mb: 2 }}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            <CssTextField
                                id="custom-css-outlined-input"
                                label="Email Address"
                                variant="outlined"
                                // focused
                                fullWidth
                                sx={{ mt: 1, mb: 3 }}
                            />
                            {!isSignUpRequest ? <Typography
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignItems: "end",
                                    mb: 1,
                                    fontWeight: "light",
                                    fontSize: "14px",
                                }}
                                className="forget-password"
                            >
                                Forgot password?
                            </Typography>

                                : ""}

                            <CssTextField
                                id="custom-css-outlined-input"
                                label="Password"
                                aria-label="password"
                                variant="outlined"
                                placeholder="6+ characters"
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                fullWidth
                                className="signIn-btn"
                                sx={{
                                    mt: 4,
                                    p: 1.5,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#0d0d0d",
                                    color: "#ffffff",
                                    fontWeight: "bold",
                                    borderRadius: "10px",
                                }}
                                onClick={handleLoginOrRegisterClick}
                            >
                                {isSignUpRequest ? "Create account" : "Sign In"}

                            </Button>
                            <Box
                                sx={{
                                    mt: 3,
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <hr
                                    style={{
                                        borderStyle: "dashed",
                                        width: "300px",
                                        color: "#f2f2f2",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        m: 1,
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        color: "#b3b3b3",
                                    }}
                                >
                                    OR
                                </Typography>
                                <hr
                                    style={{
                                        borderStyle: "dashed",
                                        width: "300px",
                                        color: "#f2f2f2",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    mt: 3,
                                    height: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Button className="btn-img">
                                    <img src={google} height={18} />
                                </Button>
                                <Button className="btn-img">
                                    <img src={github} height={18} />
                                </Button>
                                <Button className="btn-img">
                                    <img src={linkedin} height={18} />
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Auth;
