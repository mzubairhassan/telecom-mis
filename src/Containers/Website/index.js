import { Button, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";

function Website() {
  const formikForm = useFormik({
    initialValues: {
      dateValue: new Date(),
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [value, setValue] = useState(null);
  return (
    <>
      <Typography variant="h4">Website</Typography>
      <form onSubmit={formikForm.handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Basic example"
            name="dateValue"
            value={formikForm.dateValue}
            onChange={formikForm.handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button type="submit">Submit</Button>
      </form>
      <Link to="/admin">Goto Admin</Link>
    </>
  );
}

export default Website;
