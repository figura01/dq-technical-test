/* eslint-disable no-console */
const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const salt = 10;

// Get All users
router.get("/", async (req, res) => {
  const response = await User.find();

  // eslint-disable-next-line no-console
  console.log(response)
  if(response) {
    res.status(200).json(response);
  }
});

// Get one user
router.get("/:id", async (req, res) => {

  const userId = req.params.id;
  console.log(userId)
  try {
    const userDb = await User.findById(userId)
    console.log('userDb', userDb)
    
    delete userDb.password
    console.log('userDb', userDb )
    if(userDb) {
      
      res.status(200).json(userDb);
    }
  } catch(error) {
    console.log(error)
  }
});

// Create one user
router.post("/", async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Route  post users')
  console.log('req body create user: ', req.body)

  
  const user = req.body;

  try{
    const existed = await User.find({email: user.email})
    if(existed.length === 0) {
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, salt);
      }
      const response = await User.create(user)
     
      console.log(response)
      res.status(200).json({status: 'success', msg: 'User successfully created' })
    } else {
      res.send("Email already used")
    }
   
  } catch (error){
    console.log('error', error)
  }
 

  // if (req.body.password) {
  //   user.password = bcrypt.hashSync(req.body.password, salt);
  // }
  
  // try {
  //   const response = await User.create(user)
  //   // eslint-disable-next-line no-console
  //   console.log(response)
  //   res.status(200).json({status: 'success', msg: 'User successfully created' })
  // } catch(error) {
  //   console.log(error)
  // }
});

// Update one user
router.put("/:id", async (req, res) => {
  console.log('update user')
  const { userId } = req.params
  const {firstName, lastName, email, role, _id } = req.body;
  try {
    const exisistedUserEmail = await User.find({email, _id: {$ne: userId}})
    if(exisistedUserEmail) {
      const updatedUser = {
        firstName,
        lastName,
        email,
        role,
      }
      console.log('updatedUser: ', updatedUser);
      const updatedUserDb = await User.findByIdAndUpdate(_id, updatedUser, {new: true})
      console.log('updatedUserDb: ', updatedUserDb)
      if(updatedUserDb){
        
        res.json(updatedUserDb);
      }
    }
    
  } catch(error) {
    console.log(error)
  } 
});

// Delete one user
router.delete("/:id", (req, res) => {
  res.send('Delete user')
});

module.exports = router;