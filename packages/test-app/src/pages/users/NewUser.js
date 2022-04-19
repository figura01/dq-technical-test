import React from "react";
import CreateForm from "../../components/users/CreateForm";

import classes from './NewUser.module.css'

const NewUser = () => {
  return (
    <div className={classes['new-user']}>
      <CreateForm />
    </div>
  )
}

export default NewUser;