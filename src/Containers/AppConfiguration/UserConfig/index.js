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
import { getAllUsers, addUser, deleteUsers } from "../api";
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
  { field: "name", headerName: "Name", width: 250 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "location", headerName: "Location", width: 350 },
  { field: "password", headerName: "Password", width: 350 },
  { field: "phone", headerName: "phone", width: 350 },
  { field: "phone2", headerName: "phone2", width: 350 },
];

const validations = yup.object().shape({
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
  location: yup.string().required("Required"),
  password: yup.string().required("Required"),
  phone: yup.string().required("Required"),
  phone2: yup.string().required("Required"),
});

function UserConfig() {
  const classes = useStyles();
  const [openDialog, setopenDialog] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [updateList, setupdateList] = useState(false);
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formikForm = useFormik({
    initialValues: {
      name: "",
      address: "",
      location: "",
      password: "",
      phone: "",
      phone2: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log(values);
      setIsLoading(true);
      addUser(values)
        .then((e) => {
          setupdateList(true);
          setIsLoading(false);
          toast(e.data + " Users added");
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("ADD:ERROR please contact mr zubair");
        });
      setopenDialog(false);
    },
  });

  const deleteHandler = () => {
    setIsLoading(true);
    deleteUsers(deleteUserList).then((e) => {
      setIsLoading(false);
      setupdateList(true);
      toast(e.data + " Users deleted");
    });
  };

  const populateList = () => {
    getAllUsers().then((res) => {
      setUsersList(res);
    });
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
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Header name="Users" />
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
          <DialogTitle>{"Add New User"}</DialogTitle>
          <form onSubmit={formikForm.handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                fullWidth
                id="name"
                name="name"
                label="User Full Name"
                value={formikForm.values.name}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.name && Boolean(formikForm.errors.name)
                }
                helperText={formikForm.touched.name && formikForm.errors.name}
              />
              <TextField
                margin="dense"
                fullWidth
                id="address"
                multiline
                rows={3}
                name="address"
                label="Address"
                value={formikForm.values.address}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.address &&
                  Boolean(formikForm.errors.address)
                }
                helperText={
                  formikForm.touched.address && formikForm.errors.address
                }
              />
              <TextField
                margin="dense"
                fullWidth
                id="location"
                name="location"
                label="location"
                value={formikForm.values.location}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.location &&
                  Boolean(formikForm.errors.location)
                }
                helperText={
                  formikForm.touched.location && formikForm.errors.location
                }
              />
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
              <InputMask
                mask="\+\92\ 999 9999999"
                maskChar=""
                id="phone"
                name="phone"
                value={formikForm.values.phone}
                onChange={formikForm.handleChange}
                alwaysShowMask
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    margin="dense"
                    fullWidth
                    label="phone2"
                    error={
                      formikForm.touched.phone2 &&
                      Boolean(formikForm.errors.phone2)
                    }
                    helperText={
                      formikForm.touched.phone2 && formikForm.errors.phone2
                    }
                  />
                )}
              </InputMask>

              <InputMask
                mask="\+\92\ 999 9999999"
                maskChar=""
                id="phone2"
                name="phone2"
                value={formikForm.values.phone2}
                onChange={formikForm.handleChange}
                alwaysShowMask
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    margin="dense"
                    fullWidth
                    label="phone2"
                    error={
                      formikForm.touched.phone2 &&
                      Boolean(formikForm.errors.phone2)
                    }
                    helperText={
                      formikForm.touched.phone2 && formikForm.errors.phone2
                    }
                  />
                )}
              </InputMask>
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
                setDeleteUserList(ids);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserConfig;
