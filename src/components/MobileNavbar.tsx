import { Menu } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../slices/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const useStyles = makeStyles((theme: Theme) => {
  return {
    mobileNavbar: {
      padding: "2rem 0rem",
      display: "none",
      overflow: "hidden !important",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },
    ul: {
      fontSize: "1.4rem",
      fontWeight: 500,
      color: theme.palette.secondary.main,
      display: "flex",
      alignItems: "center",
      gap: "3.5rem",
      listStyle: "none",
      height: "100%",
    },
  };
});
function MobileNavbar() {
  const classes = useStyles();
  const [showNav, setShowNav] = useState(false);
  const storedData = localStorage.getItem("data");
  const dispatch = useDispatch<AppDispatch>();

  let data: any;

  if (storedData !== null) {
    data = JSON.parse(storedData).user;
  } else {
    // Handle the case where "data" is not in localStorage or is null
  }

  return (
    <div className={classes.mobileNavbar}>
      {/* <Container> */}
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          zIndex: "10",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 10px 29px 0px !important",
          padding: "1rem 2rem",
        }}
      >
        <Grid item md={6} sx={{ display: "flex", alignItems: "center", gap: "5rem" }}>
          <Link to="/">
            <Typography color="primary" variant="h3">
              One<span style={{ color: "black" }}>Center</span>
            </Typography>
          </Link>
        </Grid>
        <Grid item md={6} sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
          <Link to="/signup">
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: "5rem", textTransform: "none", fontSize: "1.4rem" }}>
              Beta Testing
            </Button>
          </Link>
          <IconButton
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            <Menu color="error" sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Grid>
        <Grid item md={12} sm={12} xs={12}></Grid>
        {/* <Grid item md={12}>
            <Grid container>
              <Grid item md={12} sm={12}>
                <a href="#features">
                  <li>Features</li>
                </a>
              </Grid>
              <Grid item md={12}>
                <a href="#features">
                  <li>Features</li>
                </a>
              </Grid>
              <Grid item md={12}>
                <a href="#features">
                  <li>Features</li>
                </a>
              </Grid>
              <li>Testimonial</li>
              <li>Pricing</li>
              <li></li>
            </Grid>
          </Grid> */}
      </Grid>
      {/* </Container> */}
      <Grid container sx={{ margin: "0rem 0rem" }}>
        <Grid
          item
          md={12}
          xs={12}
          sm={12}
          sx={{
            position: "fixed",
            top: showNav ? "60px" : "-1000px",
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
            transition: "all ease-in-out .5s",
          }}
        >
          <MenuItem
            className="center-center"
            sx={{ width: "100%", padding: "2rem 0rem" }}
            onClick={() => {
              setShowNav(false);
            }}
          >
            <a href="#reviews">Reviews</a>
          </MenuItem>
          <MenuItem
            className="center-center"
            sx={{ width: "100%", padding: "2rem 0rem" }}
            onClick={() => {
              setShowNav(false);
            }}
          >
            {" "}
            <Link to="/">Features</Link>
          </MenuItem>
          <MenuItem
            className="center-center"
            sx={{ width: "100%", padding: "2rem 0rem" }}
            onClick={() => {
              setShowNav(false);
            }}
          >
            {" "}
            <Link to="/">Pricing</Link>
          </MenuItem>
          <MenuItem
            className="center-center"
            sx={{ width: "100%", padding: "2rem 0rem" }}
            onClick={() => {
              setShowNav(false);
            }}
          >
            <Link to="/tryonecenter">Try OneCenter</Link>{" "}
          </MenuItem>
          <MenuItem
            className="center-center"
            sx={{ width: "100%", padding: "2rem 0rem" }}
            onClick={() => {
              setShowNav(false);
            }}
          >
            {data ? (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: "5rem", textTransform: "none", fontSize: "1.4rem" }}
                  onClick={() => {
                    dispatch(logOut());
                  }}
                >
                  Signed in as {data.name.split(" ")[0]}, Log Out?
                </Button>
              </>
            ) : (
              <Link to="/">
                <Button variant="contained" color="primary" size="large" sx={{ borderRadius: "5rem", textTransform: "none", fontSize: "1.4rem" }}>
                  Sign in
                </Button>
              </Link>
            )}{" "}
          </MenuItem>
        </Grid>
      </Grid>
    </div>
  );
}

export default MobileNavbar;
