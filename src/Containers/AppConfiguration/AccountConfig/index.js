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
import { getAllAccounts, addAccount, deleteAccounts } from "../api";
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
  { field: "type", headerName: "Type", width: 250 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "balance_remaining", headerName: "Avail Balance", width: 350 },
  { field: "remarks", headerName: "Remakrs", width: 350 },
];

const validations = yup.object().shape({
  type: yup.string().required("Account Type is required"),
  name: yup.string().required("Required"),
  balance: yup.string().required("Required"),
  remarks: yup.string().required("Required"),
});

const accountTypes = [
  {
    value: "expense",
    label: "Expense",
  },
  {
    value: "liability",
    label: "Liability",
  },
  {
    value: "equity",
    label: "Equity",
  },
  {
    value: "revenue",
    label: "Revenue",
  },
  {
    value: "asset",
    label: "Asset",
  },
];

function AccountConfig() {
  const classes = useStyles();
  const [openDialog, setopenDialog] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [updateList, setupdateList] = useState(false);
  const [deleteItemList, setDeleteItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formikForm = useFormik({
    initialValues: {
      name: "",
      type: "",
      balance: 0,
      remarks: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log("values ---------");
      console.log(values);
      setIsLoading(true);
      addAccount(values).then((e) => {
        // api call TODO
        setupdateList(true);
        setIsLoading(false);
        toast(e.data + " Account added");
      });
      setopenDialog(false);
    },
  });

  const deleteHandler = () => {
    setIsLoading(true);
    deleteAccounts(deleteItemList).then((e) => {
      // TODO API CALL
      setIsLoading(false);
      setupdateList(true);
      toast(e.data + " Items deleted");
    });
  };

  const populateList = () => {
    setIsLoading(true);
    getAllAccounts()
      .then((res) => {
        setIsLoading(false);
        setAccountsList(res);
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

      <Header name="Accounts" />
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
          <DialogTitle>{"Add New Item"}</DialogTitle>
          <form onSubmit={formikForm.handleSubmit}>
            <DialogContent>
              <FormControl
                component="fieldset"
                fullWidth
                error={Boolean(formikForm.errors.type)}
              >
                <RadioGroup
                  row
                  aria-label="Account Type"
                  id="name"
                  name="type"
                  value={formikForm.values.type}
                  onChange={formikForm.handleChange}
                >
                  {accountTypes.map((e) => (
                    <FormControlLabel
                      value={e.value}
                      control={<Radio />}
                      label={e.label}
                      labelPlacement="Right"
                    />
                  ))}
                </RadioGroup>
                {formikForm.errors.type && (
                  <FormHelperText>{formikForm.errors.type}</FormHelperText>
                )}
              </FormControl>

              <FormControl component="fieldset" fullWidth>
                <TextField
                  margin="dense"
                  fullWidth
                  id="name"
                  name="name"
                  label="Account Title"
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
                  id="balance"
                  type="number"
                  name="balance"
                  label="Current Balance"
                  value={formikForm.values.balance}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.balance &&
                    Boolean(formikForm.errors.balance)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formikForm.touched.balance && formikForm.errors.balance
                  }
                />
              </FormControl>
              <FormControl component="fieldset" fullWidth>
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
              </FormControl>
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
            rows={accountsList}
            columns={columns}
            loading={isLoading}
            onSelectionModelChange={(ids) => {
              setDeleteItemList(ids);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountConfig;
