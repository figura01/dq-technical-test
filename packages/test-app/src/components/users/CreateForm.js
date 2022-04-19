import React, {Fragment} from 'react';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import { useFormik } from 'formik';
import * as yup from 'yup';
import service from '../../api/service';
import { useNavigate } from "react-router-dom";

import classes from './CreateForm.module.css';

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your firstname')
    .min(3, 'Firstname should be of minimum 3 characters length')
    .required('Firstname is required'),
  lastName: yup
    .string('Enter your lastname')
    .min(1, 'Lastname should be of minimum 1 characters length')
    .required('Lastname is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const CreateForm = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await service.createOne("/api/users", values)
      if(response) navigate("/users")
      
    },
  });

  return (
    <Fragment>
    
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div className={classes["header-form"]}>
            <h3>Create New User</h3>
            <button className={classes.button} type="submit">
              <Icon>send</Icon>
            </button>
          </div>
          <div className={classes["form-group"]}>
            <div className={classes["form-input"]}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="Firstname"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                variant="filled"
                />
            </div>

            <div className={classes["form-input"]}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Lastname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                variant="filled"
              />
            </div>
          </div>

          <div className={classes["form-group"]}>
            <div className={classes["form-input"]}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="filled"
              />
            </div>
          </div>

          <div className={classes["form-group"]}>
            <div className={classes["form-input"]}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="filled"
              />
            </div>
          </div>

          
        </form>
    </Fragment>
  );
};

export default CreateForm;