import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { DataGrid } from "@mui/x-data-grid";
import * as yup from "yup";
import { useFormik } from "formik";
import MenuItem from "@mui/material/MenuItem";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateFnsUtils from "@date-io/date-fns";

import {
  getAllUsers,
  getAllPlans,
  addSubscription,
  getAllSubscription,
} from "../api";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputMask from "react-input-mask";

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
  { field: "user", headerName: "User Name", width: 250 },
  { field: "plan", headerName: "Subscription Plan", width: 250 },
  { field: "startDate", headerName: "Start Date", width: 350 },
  { field: "amountSpent", headerName: "Ammount Spent", width: 350 },
  { field: "connectionStatus", headerName: "Connection Status", width: 350 },
  { field: "remarks", headerName: "Remarks", width: 350 },
];

const validations = yup.object().shape({
  userId: yup.string().required("Required"),
  planId: yup.string().required("Required"),
  startDate: yup.date().required(),
  ammountSpent: yup.string().required("Required"),
  connectionStatus: yup.string().required("Required"),
  remarks: yup.string().required("Required"),
});

function SubscriptionConfig() {
  const classes = useStyles();
  const [openDialog, setopenDialog] = useState(false);
  const [subsList, setSubsList] = useState([]);
  const [updateList, setupdateList] = useState(false);
  const [usersList, setusersList] = useState([]);
  const [plansList, setPlansList] = useState([]);
  const [deleteSubList, setDeleteSubList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formikForm = useFormik({
    initialValues: {
      userId: "",
      planId: "",
      startDate: "",
      ammountSpent: "",
      connectionStatus: "",
      remarks: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log(values);
      setIsLoading(true);
      addSubscription(values)
        .then((e) => {
          setupdateList(true);
          setIsLoading(false);
          toast(e.data + " New Subscription added");
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("ADD:ERROR please contact mr zubair");
        });
      setopenDialog(false);
    },
  });

  const deleteHandler = () => {
    // setIsLoading(true);
    // deleteUsers(deleteUserList).then((e) => {
    //   setIsLoading(false);
    //   setupdateList(true);
    //   toast(e.data + " Users deleted");
    // });
  };

  const populateList = () => {
    getAllSubscription().then((res) => {
      setSubsList(res);
    });
  };

  useEffect(() => {
    populateList();
    getAllPlans().then((res) => {
      setPlansList(res);
    });
    getAllUsers().then((res) => {
      setusersList(res);
    });
  }, []);
  useEffect(() => {
    populateList();
    setupdateList(false);
  }, [updateList]);

  return (
    <div className={classes.root}>
      <ToastContainer />
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Header name="Subscriptions" />
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
          <DialogTitle>{"Add New Subscription"}</DialogTitle>
          <form onSubmit={formikForm.handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                fullWidth
                select
                id="userId"
                name="userId"
                label="User"
                value={formikForm.values.userId}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.userId && Boolean(formikForm.errors.userId)
                }
                helperText={
                  formikForm.touched.userId && formikForm.errors.userId
                }
                sx={{
                  "& .MuiFilledInput-root": {
                    background: "rgb(232, 241, 250)",
                  },
                }}
              >
                <StyledMenuItem key={"0"} value={"0"}>
                  No Selected // Or Empty
                </StyledMenuItem>
                {usersList.map((option) => (
                  <StyledMenuItem key={option.id} value={option.id}>
                    {option.name}
                  </StyledMenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                fullWidth
                select
                id="planId"
                name="planId"
                label="Plan"
                value={formikForm.values.planId}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.planId && Boolean(formikForm.errors.planId)
                }
                helperText={
                  formikForm.touched.planId && formikForm.errors.planId
                }
                sx={{
                  "& .MuiFilledInput-root": {
                    background: "rgb(232, 241, 250)",
                  },
                }}
              >
                <StyledMenuItem key={"0"} value={"0"}>
                  No Selected // Or Empty
                </StyledMenuItem>
                {usersList.map((option) => (
                  <StyledMenuItem key={option.id} value={option.id}>
                    {option.name}
                  </StyledMenuItem>
                ))}
              </TextField>

              <TextField
                margin="dense"
                fullWidth
                id="password"
                name="password"
                label="password"
                value={formikForm.values.password}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.password &&
                  Boolean(formikForm.errors.password)
                }
                helperText={
                  formikForm.touched.password && formikForm.errors.password
                }
              />
              <TextField
                margin="dense"
                fullWidth
                id="ammountSpent"
                type="number"
                name="ammountSpent"
                label="Ammount Spent"
                value={formikForm.values.ammountSpent}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.ammountSpent &&
                  Boolean(formikForm.errors.ammountSpent)
                }
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  formikForm.touched.ammountSpent &&
                  formikForm.errors.ammountSpent
                }
              />
              <TextField
                margin="dense"
                fullWidth
                select
                id="connectionStatus"
                name="connectionStatus"
                label="Connection Status"
                value={formikForm.values.connectionStatus}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.connectionStatus &&
                  Boolean(formikForm.errors.connectionStatus)
                }
                helperText={
                  formikForm.touched.connectionStatus &&
                  formikForm.errors.connectionStatus
                }
                sx={{
                  "& .MuiFilledInput-root": {
                    background: "rgb(232, 241, 250)",
                  },
                }}
              >
                <StyledMenuItem key={0} value={"0"}>
                  No Selected // Or Empty
                </StyledMenuItem>
                <StyledMenuItem key={1} value={1}>
                  Activated
                </StyledMenuItem>
                <StyledMenuItem key={2} value={0}>
                  Pending
                </StyledMenuItem>
              </TextField>
              <TextField
                margin="dense"
                fullWidth
                id="remarks"
                multiline
                rows={3}
                name="remarks"
                label="Remarks"
                value={formikForm.values.remarks}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.remarks &&
                  Boolean(formikForm.errors.remarks)
                }
                helperText={
                  formikForm.touched.remarks && formikForm.errors.remarks
                }
              />
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
          {usersList && (
            <DataGrid
              checkboxSelection
              rows={usersList}
              columns={columns}
              onSelectionModelChange={(ids) => {
                // setDeleteUserList(ids);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionConfig;
