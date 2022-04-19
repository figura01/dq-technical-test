import { ClassNames } from "@emotion/react";
import React from "react";

const UserForm = props => {
  return (
    <form className={classes["form-user"]}>
      <div className={Classes["form-control"]}>
        <label htmlFor="firstName"></label>
        <input id="firstName" type="text" />
      </div>

      
    </form>
  )
}