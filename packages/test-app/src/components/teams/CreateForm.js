import React, {Fragment, useState} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import { useFormik } from "formik";
import Autocomplete from '@mui/material/Autocomplete';
import * as yup from 'yup';
import service from '../../api/service';
import { useNavigate } from "react-router-dom";

import classes from './CreateForm.module.css';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  leader: yup
    .string('Select a Leader')
    .required('Selected a leader of your team is require'),
  members: yup
    .array().min(2, "Pick at least 2 member")
    .required('Members is required'),
  interns: yup
    .array().min(1, 'Should contain a mminimum of 1 intern')
    .required('Interns is required'),
});

const CreateForm = ({teams, users}) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const arrTeamsUsersIds = [];

  teams.forEach((t, i) => {
      t.userIds.forEach((uids) => {
        arrTeamsUsersIds.push(uids._id)
      })
  })

  const arrUsers = [...users]
  const arrLeaders = arrUsers.filter((u) => u.role==='SQUAD_LEADER' && !arrTeamsUsersIds.includes(u._id))
  const arrMembers = arrUsers.filter((u) => u.role==='SQUAD_MEMBER' && arrTeamsUsersIds.filter(e => e._id).length < 3)
  const arrInterns = arrUsers.filter((u) => u.role==='INTERN')

  const formik = useFormik({
    initialValues: {
      name: "",
      leader: "",
      members: [],
      interns: []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await service.createOne("/api/teams", values)
      if(response.errorMsg) {
        setErrors(response.errorMsg)
      } else {
        navigate("/teams")
      }
    },
  });

  return (
    <Fragment>
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div className={classes["header-form"]}>
        <h3>New Team</h3>
        <button className={classes.button} type="submit">
          <Icon>send</Icon>
        </button>
      </div>
      
      <div className={classes["form-input"]}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="filled"
          required
          />
      </div>

      <div className={classes["form-input"]}>
        <TextField
          fullWidth
          id="leader"
          name="leader"
          label="Leader"
          value={formik.values.leader}
          select
          onChange={formik.handleChange}
          error={formik.touched.leader && Boolean(formik.errors.leader)}
          helperText={formik.touched.leader && formik.errors.leader}
          variant="filled"
          required
        > 
          {arrLeaders.map((l) => (<MenuItem key={`leader_${l._id}`} value={l._id}>{l.firstName} {l.lastName}</MenuItem>))}
        </TextField>
      </div>
      {console.log(formik.values)}
      {console.log(formik.errors)}
      <div className={classes["form-group"]}>
        <div className={classes["form-input"]}>
          <Autocomplete
            required
            multiple
            id="members[]"
            options={arrMembers}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            defaultValue={formik.values.members}
            name="members[]"
            onChange={(event, newValue) => {

              formik.setFieldValue("members", newValue);
            }}
            error={formik.touched.members && Boolean(formik.errors.members)}
            helperText={formik.touched.members && formik.errors.members}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Members"
                placeholder=""
                onChange={ formik.handleChange }
              />
            )}
          /> 
          
        </div>
      </div>

      <div className={classes["form-group"]}>
        <div className={classes["form-input"]}>
          <Autocomplete
            multiple
            id="interns"
            options={arrInterns}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            defaultValue={formik.values.interns}
            name="interns[]"
            onChange={(event, newValue) => {
              formik.setFieldValue("interns", newValue);
            }}
            required
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Interns"
                placeholder=""
                onChange={ formik.handleChange }
              />
            )}
          />  
        </div>
      </div>
      {errors && <p className="danger">* {errors}</p>}
    </form>
</Fragment>
  );
};

export default CreateForm;