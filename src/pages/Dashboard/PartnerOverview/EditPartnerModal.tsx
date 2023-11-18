import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { StyledInput } from "../../../styled-components/styledInput";
import { Grid, styled } from "@mui/material";
import { StyledButton } from "../../../styled-components/styledButton";
import { useFormik } from "formik";
import { getPartner, patchPartner } from "../../../slices/PartnerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { uploadFile } from "../../../slices/UploadSlice";
import { useSelector } from "react-redux";
import { WaveLoader } from "react-loaders-kit";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 700,
  bgcolor: "background.paper",
  border: "0",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

interface EditPartnerModalProps {
  handleModalClose?: () => void;
  open: boolean;
}

export default function EditPartnerModal({ handleModalClose, open }: EditPartnerModalProps) {
  const dispatch: any = useDispatch<AppDispatch>();
  const partner = useSelector((state: any) => state.Partners.partner);
  const [loader, setLoader] = useState(false);
  const onSubmit = (values: any) => {
    console.log(values);
    setLoader(true);
    console.log(typeof values.logo);
    if (typeof values.logo == "object") {
      dispatch(uploadFile(values?.logo)).then((action: any) => {
        if (action.payload) {
          const url = action.payload.url;
          console.log(url);
          // Update the partner object with the new values
          const updatedPartner = { ...partner, ...values, logo: url };
          console.log(updatedPartner);
          dispatch(patchPartner(updatedPartner))
            .then(dispatch(getPartner(partner.id)))
            .then(() => {
              setLoader(false);
              window.location.reload();
            });
        } else {
          setLoader(false);
          alert("A problem occurred");
        }
      });
    } else {
      // Update the partner object with the new values
      const updatedPartner = { ...partner, ...values };
      console.log(updatedPartner);
      dispatch(patchPartner(updatedPartner))
        .then(dispatch(getPartner(partner.id)))
        .then(() => {
          window.location.reload();
        });
    }
  };

  const loaderProps = {
    loading: loader,
    size: 35,
    duration: 1,
    colors: ["#5e22f0", "#f6b93b"],
  };

  const formik = useFormik({
    initialValues: partner,
    onSubmit,
  });
  const VisuallyHiddenInput = styled("input")({
    opacity: 0,
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: "100%",
    fontWeight: 700,
  });

  return (
    <div>
      <Modal open={open} onClose={handleModalClose} aria-labelledby="modal-modal-partnerName" aria-describedby="modal-modal-description">
        <Box sx={style} className="center-center">
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="h3">Edit Info!</Typography>
              <Typography variant="h6" sx={{ margin: "2rem 0rem 0rem 0rem" }}>
                This information helps students identify your course. <br /> Don't worry, you can update this in the future
              </Typography>
            </Grid>

            {/* <Grid item md={12}>
              <Typography variant="h6" sx={{ fontWeight: 300 }}>
                Partner Name
              </Typography>
              <StyledInput fullWidth />
            </Grid> */}
            <Grid item md={12}>
              <Typography variant="h6" sx={{ fontWeight: 300, color: "black" }}>
                Course Icon
              </Typography>

              <Button
                sx={{
                  height: "10rem",
                  width: "100%",
                  borderRadius: "1rem",
                  border: "1px dashed black",
                  margin: "auto !important",
                  opacity: 0.3, // Set background size as needed
                }}
              >
                {" "}
                <Typography variant="h3" style={{ opacity: 2 }}>
                  {formik.values?.logo ? "Logo Added" : "Upload new logo"}
                </Typography>
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    const file = event?.target?.files?.[0];
                    if (file) {
                      formik.setFieldValue("logo", file);
                    }
                  }}
                />
              </Button>
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6" sx={{ fontWeight: 300 }}>
                Course Title -- Course Code
              </Typography>

              <StyledInput
                type="text"
                fullWidth
                placeholder={partner?.category ? partner?.category : `What sector/category are you in?`}
                {...formik.getFieldProps("category")}
                inputProps={{
                  maxLength: 10, // Set the maximum number of characters
                }}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6" sx={{ fontWeight: 300 }}>
                Course Description
              </Typography>

              <StyledInput
                multiline={true}
                placeholder={partner?.description ? partner?.description : `Give a little description about ${partner?.name}, this is what users see when they want to call you.`}
                rows={6}
                inputProps={{
                  maxLength: 1000, // Set the maximum number of characters
                }}
                type="text"
                fullWidth
                {...formik.getFieldProps("description")}
              />
            </Grid>
            <Grid item md={12} className="justify-center">
              {loader ? (
                <WaveLoader {...loaderProps} />
              ) : (
                <StyledButton
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  {" "}
                  Finish Set Up
                </StyledButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
