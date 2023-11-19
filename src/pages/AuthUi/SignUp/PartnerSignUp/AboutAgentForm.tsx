import { Alert, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { StyledInput } from "../../../../styled-components/styledInput";
import { StyledButton } from "../../../../styled-components/styledButton";
import { ChevronLeft, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { WaveLoader } from "react-loaders-kit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AboutAgentForm({ handleSlideChange, formik, alertMessage }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state: any) => state.Auth.loginStatus.loader);
  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ["#5e22f0", "#f6b93b"],
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid container>
      {alertMessage && (
        <Alert severity="error" sx={{ fontSize: "1.4rem", width: "100%" }} className="center-center">
          {alertMessage}.{" "}
          {alertMessage != "Account needs email and password" && alertMessage != "An error occured, please try again" ? (
            <Link to="/" style={{ textDecoration: "underline", color: "#3A49F9" }}>
              Sign In
            </Link>
          ) : null}
        </Alert>
      )}

      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Name
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("agent.name")} />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Email Address
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("agent.email")} />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Phone No.
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("agent.phone")} />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Create Password
        </Typography>
        <StyledInput
          required={true}
          variant="outlined"
          color="primary"
          fullWidth
          {...formik.getFieldProps("agent.password")}
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
      <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
        <IconButton color="primary" sx={{ border: ".5px solid" }} onClick={handleSlideChange}>
          <ChevronLeft sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Grid>

      <Grid item md={12} sm={12} xs={12} sx={{ marginBottom: "1.5rem" }} className="justify-center">
        {!loading ? (
          <StyledButton variant="contained" color="primary" fullWidth onClick={formik.handleSubmit}>
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

export default AboutAgentForm;
