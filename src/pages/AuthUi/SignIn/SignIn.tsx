import { Box, Checkbox, Container, Divider, Grid, IconButton, InputAdornment, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { StyledInput } from "../../../styled-components/styledInput";
import { StyledButton } from "../../../styled-components/styledButton";
import { Link, useNavigate } from "react-router-dom";
import TextContent from "../TextContent";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { logUser } from "../../../slices/AuthSlice";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { WaveLoader } from "react-loaders-kit";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => {
  return {
    signIn: {
      backgroundColor: "#eff2f6",
      minHeight: "100vh",
      padding: "2rem",
    },
    signInForm: {
      backgroundColor: "white",
      padding: "2rem",
      minHeight: "93vh",
      borderRadius: "3rem 0rem 0rem 3rem",
    },
    textContent: {
      backgroundColor: theme.palette.info.main,
      padding: "2rem",
      minHeight: "93vh",
      borderRadius: "0rem 3rem 3rem 0rem",
    },
    logoContainer: {
      height: "4rem",
      width: "4rem",
      borderRadius: "50%",
      backgroundColor: theme.palette.info.main,
    },
    icon: {
      height: "1.5rem",
      width: "1.5rem",
      objectFit: "contain",
    },
  };
});
function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginStatus = useSelector((state: any) => state.Auth.loginStatus.status);
  const loading = useSelector((state: any) => state.Auth.loginStatus.loader);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    const action = await dispatch(logUser(values));
    const userToken = action?.payload?.token;
    const userRole = action?.payload?.user?.role;
    console.log(userToken);
    if (userToken) {
      if (userRole === "agentadmin") {
        navigate("/resources");
      } else {
        navigate("/demo");
      }
    }

    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { errors, touched } = formik;

  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ["#5e22f0", "#f6b93b"],
  };
  return (
    <Box className={classes.signIn}>
      <Container>
        <Grid container>
          <Grid item md={6} className={classes.signInForm}>
            <Box className={classes.logoContainer}></Box>
            <Container sx={{ padding: "0rem 7rem !important" }}>
              <Box>
                <Typography variant="h3">Get Started Now</Typography>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 300 }}>
                  Enter your credentials to access your account
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ padding: "2rem 0rem" }}>
                <Grid item md={6}>
                  <StyledButton color="primary" fullWidth variant="outlined" sx={{ fontWeight: 400, fontSize: "1rem" }} startIcon={<img src="./icons/google.png" className={classes.icon} />}>
                    Sign in with Google
                  </StyledButton>
                </Grid>
                <Grid item md={6}>
                  <StyledButton color="primary" fullWidth variant="outlined" sx={{ fontWeight: 400, fontSize: "1rem" }} startIcon={<img src="./icons/apple-logo.png" className={classes.icon} />}>
                    Sign in with Apple
                  </StyledButton>
                </Grid>
              </Grid>
              <Divider sx={{ margin: "2rem 0rem" }}>
                <Typography variant="h6" sx={{ fontWeight: 300 }}>
                  or
                </Typography>
              </Divider>
              <Grid container>
                <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
                  {loginStatus == "failed" && (
                    <Typography variant="h6" sx={{ fontWeight: 400, color: "red" }}>
                      Wrong email or password. Please try again.
                    </Typography>
                  )}

                  {/* <StyledInput variant="outlined" color="primary" fullWidth {...formik.getFieldProps("email")} /> */}
                </Grid>
                <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
                  {errors.email && touched.email ? (
                    <Typography variant="h6" sx={{ fontWeight: 400, color: "red" }}>
                      {errors.email}
                    </Typography>
                  ) : null}
                  <Typography variant="h6" sx={{ fontWeight: 300 }}>
                    Email Address
                  </Typography>
                  <StyledInput variant="outlined" color="primary" fullWidth {...formik.getFieldProps("email")} />
                </Grid>
                <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
                  <Box className="justify-space-btw">
                    <Typography variant="h6" sx={{ fontWeight: 300 }}>
                      Password
                    </Typography>

                    <Typography variant="h6" color="primary" sx={{ fontWeight: 400 }}>
                      Forgot Password?
                    </Typography>
                  </Box>
                  <StyledInput
                    variant="outlined"
                    color="primary"
                    fullWidth
                    {...formik.getFieldProps("password")}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={12} className="align-center" sx={{ gap: ".7rem", marginBottom: "1.5rem" }}>
                  <Checkbox sx={{ padding: 0 }} color="primary" />
                  <Typography variant="h6" color="info" sx={{ fontWeight: 300 }}>
                    Remember Me
                  </Typography>
                </Grid>
                <Grid item md={12} sx={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                  {!loading ? (
                    <StyledButton
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        formik.handleSubmit();
                      }}
                    >
                      Sign In
                    </StyledButton>
                  ) : (
                    <WaveLoader {...loaderProps} />
                  )}
                </Grid>
                <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
                  <Typography variant="h6" color="info" sx={{ fontWeight: 400 }}>
                    Dont have an account?{" "}
                    <Link to="/signup" style={{ color: "#0070ff", fontWeight: 600 }}>
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item md={6} className={classes.textContent}>
            <TextContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SignIn;