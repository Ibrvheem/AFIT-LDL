import { Box, Button, Grid, Typography, styled } from "@mui/material";
import Layout from "./layout/Layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { uploadFile } from "../../slices/UploadSlice";
import { StyledInput } from "../../styled-components/styledInput";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { StyledButton } from "../../styled-components/styledButton";
import { WaveLoader } from "react-loaders-kit";
import { postManual, postManualIdle } from "../../slices/PostManualSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  opacity: 0,
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
});

function UploadResource() {
  interface FormValues {
    title: string;
    description: string;
    url: any;
  }
  const initialValues = {
    title: "",
    description: "",
    url: "",
  };

  const postStatus = useSelector((state: any) => state.Manuals.postManualStatus);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ["#5e22f0", "#f6b93b"],
  };

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    dispatch(uploadFile(values.url)).then((action) => {
      if (action.payload) {
        const url = action.payload.url;
        console.log(url);
        const updatedValues = { ...values, url: url };
        console.log(updatedValues);
        dispatch(postManual(updatedValues));
      } else {
        setLoading(false);
        alert("A problem occurred");
      }
    });
  };
  useEffect(() => {
    if (postStatus === "successful") {
      alert("Resource added successfully");
      setLoading(false);
      navigate("/resources");
      dispatch(postManualIdle());
    }
  }, [postStatus]);

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const dispatch = useDispatch<AppDispatch>();
  return (
    <Layout>
      <Box sx={{ height: "90vh", width: "100%" }} className="center-center">
        <Grid container sx={{ width: "50rem" }} spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              Title
            </Typography>
            <StyledInput required={true} fullWidth {...formik.getFieldProps("title")} />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              Description
            </Typography>
            <StyledInput required={true} fullWidth multiline rows={3} {...formik.getFieldProps("description")} />
          </Grid>
          <Grid item md={12}>
            <Button sx={{ height: "20rem", width: "100%", borderRadius: "1rem", border: "1px dashed black", margin: "auto !important" }}>
              <Typography variant="h3">{formik.values.url ? "Uploaded" : "Upload Lecture Note"}</Typography>
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                onChange={(event) => {
                  const file = event?.target?.files?.[0];
                  if (file) {
                    formik.setFieldValue("url", file);
                  }
                }}
              />
            </Button>
          </Grid>
          <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
            {!loading ? (
              <StyledButton
                onClick={() => {
                  formik.handleSubmit();
                }}
                fullWidth
                variant="contained"
              >
                Upload
              </StyledButton>
            ) : (
              <WaveLoader {...loaderProps} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default UploadResource;
