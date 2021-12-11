import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material//TextField";
import { addVendor, deleteVendor, getAllVendors } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../../Components/Header";
import { useTheme } from "@mui/material/styles";
import CustomModal from "../../../Components/Modal";
import { Save } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: "id", headerName: "Id", width: 150 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "location", headerName: "Location", width: 250 },
  { field: "remarks", headerName: "Remarks", width: 350 },
];

const validations = yup.object().shape({
  name: yup.string().required("Required"),
  location: yup.string().required("Required"),
});

function VendorConfig() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const formikForm = useFormik({
    initialValues: {
      name: "",
      location: "",
      remarks: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log(values);
      setOpen(false);

      Promise.resolve(addVendor(values)).then((e) => {
        toast(e.data + " vendor added success");
        console.log(e.data);
        setupdate(true);
      });
    },
  });
  const [vendorsList, setVendorsList] = useState([]);
  const [update, setupdate] = useState(false);
  useEffect(() => {
    console.log("1122");
    Promise.resolve(getAllVendors()).then((res) => setVendorsList(res));
  }, []);
  useEffect(() => {
    console.log("update");
    Promise.resolve(getAllVendors()).then((res) => {
      setVendorsList(res);

      setupdate(false);
    });
  }, [update]);
  const [deleteId, setdeleteId] = useState();
  return (
    <div>
      <div
        style={{
          position: "absolute",
        }}
      >
        <ToastContainer />
      </div>
      <Header name="Vendors" />
      <div>
        <IconButton
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Add sx={{ color: "green" }} />
        </IconButton>
        <IconButton
          color="primary"
          onClick={async () => {
            let res = await deleteVendor(deleteId);
            console.log(res);
            toast("vendor Deleted");
            setupdate(true);
          }}
        >
          <Delete sx={{ color: "red" }} />
        </IconButton>
      </div>
      {/* <Modal
        open={open} 
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}

      <CustomModal
        open={open}
        title="Add New Vendor"
        onClose={() => setOpen(false)}
      >
        <form onSubmit={formikForm.handleSubmit}>
          <TextField
            margin="dense"
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formikForm.values.name}
            onChange={formikForm.handleChange}
            error={formikForm.touched.name && Boolean(formikForm.errors.name)}
            helperText={formikForm.touched.name && formikForm.errors.name}
          />
          <TextField
            fullWidth
            margin="dense"
            id="location"
            name="location"
            label="Location"
            value={formikForm.values.location}
            onChange={formikForm.handleChange}
            error={
              formikForm.touched.location && Boolean(formikForm.errors.location)
            }
            helperText={
              formikForm.touched.location && formikForm.errors.location
            }
          />

          <TextField
            id="remarks"
            name="remarks"
            margin="dense"
            fullWidth
            label="Remarks"
            value={formikForm.values.remarks}
            onChange={formikForm.handleChange}
            placeholder="Enter Remarks"
            multiline
            rows={3}
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            startIcon={<Save />}
          >
            Submit
          </Button>
        </form>
      </CustomModal>

      <div>
        {vendorsList && (
          <div style={{ height: 300 }}>
            <DataGrid
              checkboxSelection
              rows={vendorsList}
              columns={columns}
              onSelectionModelChange={(ids) => {
                setdeleteId(ids[0]);
                console.log(ids[0]);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorConfig;
