import { AppBar, Box, Container, Drawer, Grid, Toolbar, Typography } from "@mui/material";
import NavTab from "./NavTab";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { StyledButton } from "../../../styled-components/styledButton";
const drawerWidth = 240;

interface LayoutProp {
  children: ReactNode;
}

function Layout({ children }: LayoutProp) {
  const location = useLocation();
  const storedData = localStorage.getItem("data");
  const userDetails = storedData ? JSON.parse(storedData) : null;
  console.log(userDetails);

  return (
    <Box sx={{ backgroundColor: "primary", height: "auto" }}>
      <Drawer
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#3A49F9",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Container className="align-center" sx={{ padding: "2rem 0rem", gap: ".5rem", flexWrap: "wrap" }}>
          <Box sx={{ width: "100%", gap: "1rem" }} className="align-center">
            <Box className="logoContainer"></Box>
            <Typography variant="h3" color="white">
              AFIT LDL
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <NavTab />
          </Box>
        </Container>
      </Drawer>
      <Box sx={{}}>
        <AppBar sx={{ backgroundColor: "white", width: `calc(100% - (${drawerWidth * 2}px) )`, mx: `${drawerWidth}px` }}>
          <Toolbar>
            <Grid container className="align-center">
              <Grid item md={4}>
                <Typography variant="h3" color="#010b13" sx={{ textTransform: "capitalize" }}>
                  {location.pathname.slice(1)}
                </Typography>
              </Grid>

              <Grid item md={8} className="flex" sx={{ justifyContent: "flex-end", gap: "1rem" }}>
                <Link to="/tryonecenter">
                  <StyledButton variant="contained">Preview on AFIT LDL</StyledButton>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ width: `calc(100% - (${drawerWidth}px * 2))`, ml: `${drawerWidth}px`, paddingTop: "9rem" }} className="flex">
        <Container sx={{ gap: "1rem", width: "100%" }}>
          <Grid container spacing={0}>
            {children}
          </Grid>
        </Container>
      </Box>
      <Drawer
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Container className="align-center" sx={{ padding: "2rem 0rem", gap: ".5rem", flexWrap: "wrap" }}>
          <Box className="align-center" sx={{ gap: "1rem" }}>
            <img src="./icons/user.png" style={{ objectFit: "cover", height: "5rem", width: "5rem" }} className="logoContainer" />
            <Box>
              <Typography variant="h6" color="#010b13">
                {userDetails?.user?.name}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 300 }} color="#636A7C">
                {userDetails?.user?.email}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Drawer>
    </Box>
  );
}

export default Layout;
