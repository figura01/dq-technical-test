import React, {Fragment, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import { useFormik } from 'formik';
import * as yup from 'yup';
import service from '../../api/service';
import { useParams, useNavigate, useLocation } from "react-router-dom";

import classes from './EditForm.module.css'

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your firstname')
    .min(3, 'Firstname should be of minimum 3 characters length')
    .required('Firstname is required'),
  lastName: yup
    .string('Enter your lastname')
    .min(3, 'Lastname should be of minimum 3 characters length')
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

const EditForm = props => {
  const { userId } = useParams();
  let navigate = useNavigate()
  let location = useLocation();
  const { pathname } = location;
  console.log(pathname)
  const [loadedUser, setLoadedUser] = useState({
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    role: "",
  })

  const role = [
    {label: "Squad Leader", value: "SQUAD_LEADER"},
    {label: "Squad Member", value: "SQUAD_MEMBER"},
    {label: "Intern", value: "INTERN"}
  ]

  const roleIntern = role.filter((r) => r.value !== "SQUAD_LEADER")
  const roleMember = role.filter((r) => r.value !== "INTERN")

  const formik = useFormik({
    initialValues: {
      ...loadedUser
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values', values)
      const response = await service.updateOne(`/api/users/${values._id}`, values)
      if(response) {
        navigate("/")
      }
    },
  });

  const handleClickCancel = () => {
    console.log('click')
    //formik.resetForm()
    for (const [key, value] of Object.entries(loadedUser)) {
      console.log(`${key}: ${value}`);
      formik.setFieldValue(key, value)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      console.log(navigate)
      const userDb = await service.getOne("api/users", userId)
      console.log(userDb)
      setLoadedUser(prevState =>{
        return{
          ...prevState,
          ...userDb
        }
      })

      for (const [key, value] of Object.entries(userDb)) {
        console.log(`${key}: ${value}`);
        formik.setFieldValue(key, value)
      }
    }
    fetchUser()
  }, [userId])

  return (
    <Fragment>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div className={classes["header-form"]}>
            <h3>Edit User</h3>
            <div>
              <button className={classes.button} type="button" onClick={handleClickCancel}>
                <Icon>undo</Icon>
              </button>
              <button className={classes.button} type="submit">
                <Icon>save</Icon>
              </button>
            </div>
            
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
                id="select" 
                label="Role"
                name="role"
                select 
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                variant="filled"
              >
                {loadedUser.role === 'INTERN' && roleIntern.map(r => (<MenuItem value={r.value}>{r.label}</MenuItem>))}
                {loadedUser.role === 'SQUAD_MEMBER' && roleMember.map(r => (<MenuItem value={r.value}>{r.label}</MenuItem>))}
                {loadedUser.role === 'SQUAD_LEADER' && <MenuItem value="SQUAD_LEADER">Squad Leader</MenuItem>}
              
              </TextField>
            </div>
          </div>
          
        </form>
    </Fragment>
  );
}

export default EditForm;