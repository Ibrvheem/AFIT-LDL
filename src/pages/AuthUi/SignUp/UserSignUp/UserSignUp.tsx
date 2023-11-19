import { Alert, Box, Checkbox, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { StyledButton } from "../../../../styled-components/styledButton";
import { StyledInput } from "../../../../styled-components/styledInput";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../slices/AuthSlice";
import { AppDispatch } from "../../../../store";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { WaveLoader } from "react-loaders-kit";

function UserSignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const loading = useSelector((state: any) => state.Auth.loginStatus.loader);

  const [alert, setAlert] = useState("");
  const onSubmit = (values: {}) => {
    dispatch(registerUser(values)).then((action) => {
      setAlert(action?.payload?.message);
      if (!action.payload?.message) {
        setAlert("an error occurred, please try again");
      }
    });
  };
  const initialValues = {
    email: "",
    name: "",
    phone: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ["#5e22f0", "#f6b93b"],
  };
  return (
    <Grid container>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        {alert && (
          <Alert severity="success" sx={{ fontSize: "1.4rem", width: "100%" }} className="center-center">
            {alert},{" "}
            <Link to="/" style={{ textDecoration: "underline", color: "#3A49F9" }}>
              Sign in
            </Link>
          </Alert>
        )}
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Name
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("name")} />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Email Address
        </Typography>
        <StyledInput required={true} aria-required variant="outlined" color="primary" fullWidth {...formik.getFieldProps("email")} />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Phone No.
        </Typography>
        <StyledInput required={true} aria-required variant="outlined" type="number" color="primary" fullWidth {...formik.getFieldProps("phone")} />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Box className="justify-space-btw">
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            Create Password
          </Typography>
        </Box>
        <StyledInput
          required={true}
          aria-required
          variant="outlined"
          color="primary"
          fullWidth
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
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
      <Grid item md={12} sm={12} xs={12} className="align-center" sx={{ gap: ".7rem", marginBottom: "1.5rem" }}>
        <Checkbox sx={{ padding: 0 }} color="primary" />
        <Typography variant="h6" color="info" sx={{ fontWeight: 300 }}>
          I agree to the terms and policy
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }} className="justify-center">
        {!loading ? (
          <StyledButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Complete Sign Up
          </StyledButton>
        ) : (
          <WaveLoader {...loaderProps} />
        )}
      </Grid>
      <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" color="info" sx={{ fontWeight: 400 }}>
          Have an account?{" "}
          <Link to="/" style={{ textDecoration: "underline", color: "#3A49F9", fontWeight: 600 }}>
            Sign In
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default UserSignUp;
