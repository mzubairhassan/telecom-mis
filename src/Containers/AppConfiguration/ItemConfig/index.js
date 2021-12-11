import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { Grid, IconButton, Menu, TextField } from "@mui/material";
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
import { getAllItems, getAllVendors, addItem, deleteItems } from "../api";
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
  { field: "desc", headerName: "Desc", width: 250 },
  { field: "qtyAvailable", headerName: "Qty Avail", width: 350 },
  { field: "qtyThreshold", headerName: "Qty Thres", width: 350 },
  { field: "remarks", headerName: "Remarks", width: 350 },
  { field: "unitOfIssue", headerName: "UOI", width: 350 },
  { field: "vendor", headerName: "Vendor", width: 350 },
];

const validations = yup.object().shape({
  itemName: yup.string().required("Required"),
  itemDesc: yup.string().required("Required"),
  vendor: yup.string().required("Required"),
  uoi: yup.string().required("Required"),
  qtyThreshold: yup.string().required("Required"),
  qtyAvail: yup.string().required("Required"),
  latestPrice: yup.string().required("Required"),
  remarks: yup.string().required("Required"),
});

const units = [
  {
    value: "mm",
    label: "Milli Meter",
  },
  {
    value: "m",
    label: "Meter",
  },
  {
    value: "kg",
    label: "KG",
  },
  {
    value: "gram",
    label: "Gram",
  },
  {
    value: "cm",
    label: "Centi Meter",
  },
  {
    value: "lt",
    label: "Litre",
  },
  {
    value: "ft",
    label: "Litre",
  },
  {
    value: "inch",
    label: "Inch",
  },
  {
    value: "ton",
    label: "Ton",
  },
];

function ItemConfig() {
  const classes = useStyles();
  const [openDialog, setopenDialog] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [updateList, setupdateList] = useState(false);
  const [vendorsList, setVendorsList] = useState([]);
  const [deleteItemList, setDeleteItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formikForm = useFormik({
    initialValues: {
      itemName: "",
      itemDesc: "",
      vendor: "",
      uoi: "",
      qtyThreshold: "",
      qtyAvail: "",
      latestPrice: "",
      remarks: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log(values);
      setIsLoading(true);
      addItem(values).then((e) => {
        setupdateList(true);
        setIsLoading(false);
        toast(e.data + " Items added");
      });
      setopenDialog(false);
    },
  });

  const deleteHandler = () => {
    setIsLoading(true);
    deleteItems(deleteItemList).then((e) => {
      setIsLoading(false);
      setupdateList(true);
      toast(e.data + " Items deleted");
    });
  };

  const populateList = () => {
    getAllItems().then((res) => {
      setItemsList(
        res.map((e) => {
          return { ...e, vendor: e.vendor.name };
        })
      );
    });
  };

  useEffect(() => {
    populateList();
    getAllVendors().then((res) => setVendorsList(res));
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
      <Header name="Items" />
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
              <TextField
                margin="dense"
                fullWidth
                id="itemName"
                name="itemName"
                label="Item Name"
                value={formikForm.values.itemName}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.itemName &&
                  Boolean(formikForm.errors.itemName)
                }
                helperText={
                  formikForm.touched.itemName && formikForm.errors.itemName
                }
              />
              <TextField
                margin="dense"
                fullWidth
                id="itemDesc"
                name="itemDesc"
                label="Item Desc"
                multiline
                rows={3}
                value={formikForm.values.itemDesc}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.itemDesc &&
                  Boolean(formikForm.errors.itemDesc)
                }
                helperText={
                  formikForm.touched.itemDesc && formikForm.errors.itemDesc
                }
              />

              <div
                style={{
                  display: "flex",
                  gap: 15,
                }}
              >
                <TextField
                  margin="dense"
                  fullWidth
                  select
                  id="uoi"
                  name="uoi"
                  label="Unit of Issue"
                  value={formikForm.values.uoi}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.uoi && Boolean(formikForm.errors.uoi)
                  }
                  helperText={formikForm.touched.uoi && formikForm.errors.uoi}
                  sx={{
                    "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)",
                    },
                  }}
                >
                  <StyledMenuItem
                    key={""}
                    value={""}
                    className={classes.menuitem}
                  >
                    No Selected // Or Empty
                  </StyledMenuItem>
                  {units.map((option) => (
                    <StyledMenuItem
                      key={option.value}
                      value={option.value}
                      className={classes.menuitem}
                    >
                      {option.label}
                    </StyledMenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="dense"
                  fullWidth
                  id="qtyThreshold"
                  type="number"
                  name="qtyThreshold"
                  label="Qty Threshold"
                  value={formikForm.values.qtyThreshold}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.qtyThreshold &&
                    Boolean(formikForm.errors.qtyThreshold)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formikForm.touched.qtyThreshold &&
                    formikForm.errors.qtyThreshold
                  }
                />
              </div>
              <div style={{ display: "flex", gap: 15 }}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="qtyAvail"
                  type="number"
                  name="qtyAvail"
                  label="Qty Available"
                  value={formikForm.values.qtyAvail}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.qtyAvail &&
                    Boolean(formikForm.errors.qtyAvail)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formikForm.touched.qtyAvail && formikForm.errors.qtyAvail
                  }
                />
                <TextField
                  margin="dense"
                  fullWidth
                  id="latestPrice"
                  type="number"
                  name="latestPrice"
                  label="latest Price"
                  value={formikForm.values.latestPrice}
                  onChange={formikForm.handleChange}
                  error={
                    formikForm.touched.latestPrice &&
                    Boolean(formikForm.errors.latestPrice)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formikForm.touched.latestPrice &&
                    formikForm.errors.latestPrice
                  }
                />
              </div>
              <TextField
                margin="dense"
                fullWidth
                select
                id="vendor"
                name="vendor"
                label="Vendor"
                value={formikForm.values.vendor}
                onChange={formikForm.handleChange}
                error={
                  formikForm.touched.vendor && Boolean(formikForm.errors.vendor)
                }
                helperText={
                  formikForm.touched.vendor && formikForm.errors.vendor
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
                {vendorsList.map((option) => (
                  <StyledMenuItem key={option.id} value={option.id}>
                    {option.name}
                  </StyledMenuItem>
                ))}
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
          {itemsList && (
            <DataGrid
              checkboxSelection
              rows={itemsList}
              columns={columns}
              onSelectionModelChange={(ids) => {
                setDeleteItemList(ids);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemConfig;
