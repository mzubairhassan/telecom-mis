import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Menu,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { DataGrid } from "@mui/x-data-grid";
import * as yup from "yup";
import { useFormik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import {
  getAllAccounts,
  addAccount,
  deleteAccounts,
  addPlan,
  getAllPlans,
  deletePlan,
} from "../api";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledMenuItem = styled(MenuItem)(() => ({
  background: "white",
  "&:hover": {
    background: "blue",
  },
  "&.Mui-selected": {
    backgroundColor: "green",
    "&:hover": {
      background: "green",
    },
  },
}));

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  dialog: {
    "& .MuiPaper-root": {
      background: "white",
    },
  },
});

const columns = [
  { field: "id", headerName: "Id", width: 150 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "ux_headingText", headerName: "Heading Text", width: 350 },
  { field: "ux_paraText", headerName: "Para text", width: 350 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "duration", headerName: "Duration", width: 150 },
];

function PlanConfig() {
  const classes = useStyles();
  const [openDialog, setopenDialog] = useState(false);
  const [plansList, setPlansList] = useState([]);
  const [updateList, setupdateList] = useState(false);
  const [deletePlanList, setDeletePlanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validations = yup.object().shape({
    name: yup.string().required("Account Type is required"),
    description: yup.string().required("Required"),
    ux_headingText: yup.string().required("Required"),
    ux_paraText: yup.string().required("Required"),
    price: yup.string().required("Required"),
    duration: yup.string().required("Required"),
  });

  const formikForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      ux_headingText: "",
      ux_paraText: "",
      price: 0,
      duration: 0,
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log("values ---------");
      console.log(values);
      setIsLoading(true);
      addPlan(values).then((e) => {
        // api call TODO
        setupdateList(true);
        setIsLoading(false);
        toast(e.data + " Plan added");
      });
      setopenDialog(false);
    },
  });

  const deleteHandler = () => {
    setIsLoading(true);
    deletePlan(deletePlanList).then((e) => {
      // TODO API CALL
      setIsLoading(false);
      setupdateList(true);
      toast(e.data + " Items deleted");
    });
  };

  const populateList = () => {
    setIsLoading(true);
    getAllPlans()
      .then((res) => {
        setIsLoading(false);
        setPlansList(res);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    populateList();
  }, []);
  useEffect(() => {
    populateList();
    setupdateList(false);
  }, [updateList]);

  return (
    <div className={classes.root}>
      <ToastContainer />

      <Header name="Subscription Plans" />
      <div>
        <div>
          <IconButton
            onClick={() => {
              setopenDialog(true);
            }}
          >
            <Add sx={{ color: "#3dc73d" }} />
          </IconButton>
          <IconButton onClick={deleteHandler}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </div>

        <Dialog
          open={openDialog}
          className={classes.dialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setopenDialog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add New Plan"}</DialogTitle>
          <form onSubmit={formikForm.handleSubmit}>
            <DialogContent>
              <FormControl component="fieldset" fullWidth>
                <TextField
                  margin="dense"
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  rows={3}
                  value={formikForm.values.name}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.name && Boolean(formikForm.errors.name)
                  }
                  helperText={formikForm.touched.name && formikForm.errors.name}
                />
              </FormControl>

              <FormControl component="fieldset" fullWidth>
                <TextField
                  margin="dense"
                  fullWidth
                  id="description"
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                  value={formikForm.values.description}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.description &&
                    Boolean(formikForm.errors.description)
                  }
                  helperText={
                    formikForm.touched.description &&
                    formikForm.errors.description
                  }
                />
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <TextField
                  margin="dense"
                  fullWidth
                  id="ux_headingText"
                  name="ux_headingText"
                  label="Title Header for display"
                  rows={3}
                  value={formikForm.values.ux_headingText}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.ux_headingText &&
                    Boolean(formikForm.errors.ux_headingText)
                  }
                  helperText={
                    formikForm.touched.ux_headingText &&
                    formikForm.errors.ux_headingText
                  }
                />
              </FormControl>

              <FormControl component="fieldset" fullWidth>
                <TextField
                  margin="dense"
                  fullWidth
                  id="ux_paraText"
                  multiline
                  rows={3}
                  name="ux_paraText"
                  label="Description For Display"
                  value={formikForm.values.ux_paraText}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.ux_paraText &&
                    Boolean(formikForm.errors.ux_paraText)
                  }
                  helperText={
                    formikForm.touched.ux_paraText &&
                    formikForm.errors.ux_paraText
                  }
                />
              </FormControl>
              <Tooltip title="Use abs value in PKR" placement="top" arrow>
                <FormControl component="fieldset" fullWidth>
                  <TextField
                    margin="dense"
                    fullWidth
                    id="price"
                    type="number"
                    name="price"
                    label="Price"
                    value={formikForm.values.price}
                    onChange={formikForm.handleChange}
                    error={
                      formikForm.touched.price &&
                      Boolean(formikForm.errors.price)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      formikForm.touched.price && formikForm.errors.price
                    }
                  />
                </FormControl>
              </Tooltip>

              <Tooltip title="Add" placement="top" arrow>
                <FormControl component="fieldset" fullWidth>
                  <TextField
                    margin="dense"
                    fullWidth
                    id="duration"
                    type="number"
                    name="duration"
                    label="Duration"
                    value={formikForm.values.duration}
                    onChange={formikForm.handleChange}
                    error={
                      formikForm.touched.duration &&
                      Boolean(formikForm.errors.duration)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      formikForm.touched.duration && formikForm.errors.duration
                    }
                  />
                </FormControl>
              </Tooltip>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setopenDialog(false)}>Cancel</Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <div style={{ height: 300 }}>
          <DataGrid
            checkboxSelection
            rows={plansList}
            columns={columns}
            loading={isLoading}
            onSelectionModelChange={(ids) => {
              setDeletePlanList(ids);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanConfig;
