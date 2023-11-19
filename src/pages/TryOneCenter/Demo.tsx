import { Box, Container, Grid, Modal, Typography } from "@mui/material";
import Search from "../../components/Search";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPartners } from "../../slices/PartnerSlice";
import { AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "0",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};
function Demo() {
  const availablePartners = useSelector((state: any) => state.Partners.partners);
  const [searchQuery, setSearchQuery] = useState("");

  localStorage.setItem("partners", JSON.stringify(availablePartners));
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPartners());

    //eslint-disable-next-line
  }, []);
  let userToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  // const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const navigate = useNavigate();
  function handlePartnerNav(partnerId: string) {
    if (userToken) {
      navigate(`/tryonecenter/${partnerId}`);
    } else {
      setOpen(true);
    }
  }
  return (
    <Box>
      <Container>
        <Grid container spacing={5}>
          <Grid item md={12} sx={{ width: "100%" }}>
            <Search setSearchQuery={setSearchQuery} />
          </Grid>
          {availablePartners
            ?.filter((partner: any) => partner?.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((partner: any) => {
              return (
                <Grid
                  item
                  sm={6}
                  md={4}
                  onClick={() => {
                    handlePartnerNav(partner.id);
                  }}
                >
                  <Card
                    iconContainerWidth={"7rem"}
                    name={partner?.name}
                    website={partner?.website}
                    description={partner?.description}
                    logo={partner?.logo}
                    category={partner?.category}
                    // primaryBtn={"Make Call"}
                    // primaryFunc={() => {
                    //   makeCall();
                    // }}
                    // btnDisable={callButtonStatus === false}
                  />
                </Grid>
              );
              // Existing code for rendering partners
            })}

          {/* {availablePartners?.map((partner) => {})} */}
        </Grid>
        <Modal open={open} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} className="center-center">
            <Typography variant="h5" align="center">
              Oops, you need to{" "}
              <Link to="/" style={{ color: "#0070ff", fontWeight: 600 }}>
                sign-in
              </Link>{" "}
              to use OneCenter or make a call
            </Typography>
            <Typography variant="h5" align={"center"} sx={{ margin: "2rem 0rem" }}>
              Don't have an accout? no worries, {"  "}
              <Link to="/signup" style={{ color: "#0070ff", fontWeight: 600 }}>
                sign-up {"  "}
              </Link>
              to use OneCenter
            </Typography>
          </Box>
        </Modal>
      </Container>
      {/* <Footer /> */}
    </Box>
  );
}

export default Demo;
