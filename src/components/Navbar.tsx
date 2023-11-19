import { Button, Container, Fade, Grid, Popper, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton } from "../styled-components/styledButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logOut } from "../slices/AuthSlice";

const useStyles = makeStyles((theme: Theme) => {
  return {
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
    navbar: {
      padding: "2rem 0rem",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  };
});
function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  const storedData = localStorage.getItem("data");
  let data: any;

  if (storedData !== null) {
    data = JSON.parse(storedData).user;
  } else {
    // Handle the case where "data" is not in localStorage or is null
  }

  return (
    <div className={classes.navbar}>
      <Container>
        <Grid container>
          <Grid item md={6} sx={{ display: "flex", alignItems: "center", gap: "5rem" }}>
            <Link to="/">
              <Typography color="primary" variant="h3">
                AFIT<span style={{ color: "black" }}> LDL</span>
              </Typography>
            </Link>
            {/* <ul className={classes.ul}>
              <a href="#features">
                <li>Features</li>
              </a>
              <a href="#reviews">
                <li>Reviews</li>
              </a>

              <Link to="/">
                <li>Pricing</li>
              </Link>
              <Link to="/tryonecenter">
                <li>Try OneCenter</li>
              </Link>
            </ul> */}
          </Grid>
          <Grid item md={6} sx={{ display: "flex", justifyContent: "end" }}>
            <ul className={classes.ul}>
              {data ? (
                <>
                  <Button aria-describedby={id} onClick={handleClick} variant="text" color="secondary" size="large" sx={{ borderRadius: "5rem", textTransform: "none", fontSize: "1.4rem" }}>
                    Signed in as {data.name.split(" ")[0]}
                  </Button>
                  <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                      <>
                        <Fade {...TransitionProps} timeout={350}>
                          <StyledButton
                            fullWidth
                            color="error"
                            sx={{ border: 0, p: 1, bgcolor: "background.paper", boxShadow: "rgba(100, 100, 111, 0.2) 0px 10px 29px 0px !important" }}
                            onClick={() => {
                              dispatch(logOut());
                            }}
                          >
                            Log Out
                          </StyledButton>
                        </Fade>
                        {data.role == "agentadmin" && (
                          <Fade {...TransitionProps} timeout={350}>
                            <StyledButton
                              fullWidth
                              color="error"
                              sx={{ border: 0, p: 1, bgcolor: "background.paper", boxShadow: "rgba(100, 100, 111, 0.2) 0px 10px 29px 0px !important" }}
                              onClick={() => {
                                navigate("/overview");
                                setOpen(false);
                              }}
                            >
                              Go back to dashboard
                            </StyledButton>
                          </Fade>
                        )}
                      </>
                    )}
                  </Popper>
                </>
              ) : (
                <Link to="/">
                  <Button variant="text" color="secondary" size="large" sx={{ borderRadius: "5rem", textTransform: "none", fontSize: "1.4rem" }}>
                    Sign in
                  </Button>
                </Link>
              )}
              <li></li>
              <li>
                <Link to="/signup">
                  <Button variant="contained" color="primary" size="large" sx={{ borderRadius: "5rem", textTransform: "none", fontSize: "1.4rem" }}>
                    Join Beta Testing
                  </Button>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Navbar;
