import { Alert, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { WaveLoader } from "react-loaders-kit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StyledInput } from "../../../styled-components/styledInput";
import { StyledButton } from "../../../styled-components/styledButton";

function CreateAgentForm({ formik, alertMessage }: any) {
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
          {alertMessage != "Account needs email and password" ? (
            <Link to="/" style={{ textDecoration: "underline", color: "#3A49F9" }}>
              Sign In
            </Link>
          ) : null}
        </Alert>
      )}
      <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Name
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("name")} />
      </Grid>
      <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Email Address
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("email")} />
      </Grid>
      <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Phone No.
        </Typography>
        <StyledInput required={true} variant="outlined" color="primary" fullWidth {...formik.getFieldProps("phone")} />
      </Grid>
      <Grid item md={12} sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          Create Password
        </Typography>
        <StyledInput
          required={true}
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

      <Grid item md={12} sx={{ marginBottom: "1.5rem" }} className="justify-center">
        {!loading ? (
          <StyledButton variant="contained" color="primary" fullWidth onClick={formik.handleSubmit}>
            Create Agent
          </StyledButton>
        ) : (
          <WaveLoader {...loaderProps} />
        )}
      </Grid>
    </Grid>
  );
}

export default CreateAgentForm;
