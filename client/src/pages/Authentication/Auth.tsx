import {
    Grid,
    Typography,
    Box,
    TextField,
    Button,
    styled,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import google from "../../assets/svg/google.svg";
import github from "../../assets/svg/github.svg";
import linkedin from "../../assets/svg/linkedin.svg";
import resume from '../../assets/resume/resume6.png';
import "./style.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../features/Auth/actions/authAction";
import toast, { Toaster } from "react-hot-toast";


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
    const dispatch = useDispatch<any>();

    const [isSignUpRequest, setSignUpRequest] = useState(location.pathname === '/register');
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        setSignUpRequest(location.pathname === '/register');
    }, [location.pathname]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClick = () => {
        if (isSignUpRequest) {
            setSignUpRequest(false);
            navigate('/login');
        } else {
            setSignUpRequest(true);
            navigate('/register');
        }
    };

    const validationSchema = Yup.object().shape({
        firstName: isSignUpRequest
            ? Yup.string().required("First name is required")
            : Yup.string(),
        lastName: isSignUpRequest
            ? Yup.string().required("Last name is required")
            : Yup.string(),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    });
    const handleFormSubmit = async (values: any) => {
        const { firstName, lastName, email, password } = values;
        try {
            if (isSignUpRequest) {
                const actionResult = await dispatch(registerUser({ firstName, lastName, email, password }));

                if (registerUser.fulfilled.match(actionResult)) {
                    toast.success('Registration successful!');
                    navigate('/login');
                } else {
                    const errorMessage = actionResult.payload?.error?.message || 'Registration failed. Please try again.';
                    toast.error(errorMessage);
                }
            } else {
                const actionResult = await dispatch(loginUser({ email, password }));
                // console.log(actionResult, "@actionResult");

                if (loginUser.fulfilled.match(actionResult)) {

                    const user = actionResult?.payload?.user;
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user)); // Convert to string before saving
                    }
                    toast.success('Login successfully!');
                    navigate('/');
                } else {
                    const errorMessage = actionResult.payload?.error?.message || 'Login failed. Please try again.';
                    toast.error(errorMessage);
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
            console.error("Error during form submission:", error);
        }
    }



    return (
        <>
            {/* <Toaster /> */}
            <div>
                <Grid container component="main" sx={{ height: "100vh" }}>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#f2f2f2",
                            border: "1px solid gray",
                            borderStyle: "hidden",
                            padding: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2 }}
                        >
                            Hi, Welcome back
                        </Typography>
                        <Typography sx={{ color: "gray", textAlign: "center" }}>
                            More effectively with optimized workflows.
                        </Typography>
                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <img src={resume} style={{ maxWidth: "100%", height: "auto" }} />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "450px",
                                p: 2,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
                            >
                                {isSignUpRequest ? 'Get started absolutely free' : 'Sign in to your account'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: "light",
                                    color: "gray",
                                    fontSize: "14px",
                                    mb: 2,
                                    textAlign: "center"
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

                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleFormSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        {isSignUpRequest && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        as={CssTextField}
                                                        id="firstName"
                                                        name="firstName"
                                                        label="First Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={touched.firstName && !!errors.firstName}
                                                        helperText={touched.firstName && errors.firstName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        as={CssTextField}
                                                        id="lastName"
                                                        name="lastName"
                                                        label="Last Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={touched.lastName && !!errors.lastName}
                                                        helperText={touched.lastName && errors.lastName}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                        <Field
                                            as={CssTextField}
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ mt: 2, mb: 2 }}
                                            error={touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                        />
                                        {!isSignUpRequest && (
                                            <Typography
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    mb: 1,
                                                    fontWeight: "light",
                                                    fontSize: "14px",
                                                }}
                                                className="forget-password"
                                            >
                                                Forgot password?
                                            </Typography>
                                        )}
                                        <Field
                                            as={CssTextField}
                                            id="password"
                                            name="password"
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
                                            error={touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                        />
                                        <Button
                                            type="submit"
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
                                        >
                                            {isSignUpRequest ? "Create account" : "Sign In"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>

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
                                        width: "100%",
                                        maxWidth: "120px",
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
                                        width: "100%",
                                        maxWidth: "120px",
                                        color: "#f2f2f2",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    mt: 3,
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
