import { Box, Container, Grid, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextContent from "./TextContent";
import Role from "./SignUp/Role";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      padding: "0rem 7rem !important",
      [theme.breakpoints.down("sm")]: {
        padding: "0rem 3rem !important",
        display: "flex !important",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      },
    },
    signUp: {
      backgroundColor: "#eff2f6",
      minHeight: "100vh",
      padding: "2rem",
    },
    signUpForm: {
      backgroundColor: "white",
      padding: "2rem",
      minHeight: "93vh",
      borderRadius: "3rem 0rem 0rem 3rem",
      [theme.breakpoints.down("sm")]: {
        minHeight: "100vh",
        borderRadius: "0rem 0rem 0rem 0rem",
        width: "100%",
      },
    },
    textContent: {
      backgroundColor: theme.palette.primary.main,
      padding: "2rem",
      minHeight: "93vh",
      borderRadius: "0rem 3rem 3rem 0rem",
      [theme.breakpoints.down("sm")]: {
        display: "none",
        borderRadius: "0rem 0rem 0rem 0rem",
      },
    },
    logoContainer: {
      height: "4rem",
      width: "4rem",
      borderRadius: "50%",
    },
    icon: {
      height: "1.5rem",
      width: "1.5rem",
      objectFit: "contain",
    },
  };
});
function FormContainer({ children, splideRef }: any) {
  const classes = useStyles();
  return (
    <Box className={classes.signUp}>
      <Container>
        <Grid container>
          <Grid item md={6} className={classes.signUpForm}>
            <Link to="/">
              <Box className={classes.logoContainer}>
                <img src="./icons/afit-logo.png" alt="" style={{ width: "150%" }} />
              </Box>
            </Link>
            <Container className={classes.container}>
              <Role splideRef={splideRef} />

              {children}
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

export default FormContainer;
