/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require("express");

const router = express.Router();
const Team = require("../models/Team");

// Get All teams
router.get("/", async (req, res) => {
  // eslint-disable-next-line no-console
  console.log("get all Teams")
  try {
    const response = await Team.find().populate("userIds");
    // eslint-disable-next-line no-console
    console.log(response)
    if(response) {
      res.status(200).json(response);
    }
  } catch(error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error)
  }
});

// Get One teams
router.get("/:id", async (req, res) => {
  // eslint-disable-next-line no-console
  console.log("get One Teams")
  const teamId = req.params.id;
  try {
    const response = await Team.findById(teamId).populate("userIds");
    if(response) {
      res.status(200).json(response);
    }
  } catch(error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error)
  }
});

router.get("/:id", async (req, res) => {
 
  const {teamId} = req.params.id;
  try {
    const teamDb = await Team.findById(teamId)
  
    if(teamDb) {
      res.status(200).json(teamDb);
    }
  } catch(error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  return "test"
});

// Post a teams
router.post("/", async (req, res) => {
  const team = req.body;
  try {
    const response = await Team.find({name: team.name});

    if(!response) {
      res.send("Team name already used, please enter a other name")
    }

    if(response) {
      const teamDb = await Team.create(team);
      if(teamDb) res.status(200).json(teamDb);
    }
  } catch(error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error)
  }
});

// Update one user
router.put("/:id", async (req, res) => {
  console.log('update team')
  console.log(req.params)
  const teamId = req.params.id
  console.log('teamId: ', teamId)
  const { name, leader, members, interns } = req.body;
 
  const idsMember = members.map(m => { return m._id});
  const idsIntern = interns.map(i => {return i._id});

  const userIds = [leader, ...idsMember, ...idsIntern];
  const userObjIds = userIds.map((u) => {
    return {_id: u}
  })
  const updatedTeam = {
    name,
    userIds: userObjIds
  }
  console.log(updatedTeam)
  try{
    const response = await Team.findByIdAndUpdate(teamId, updatedTeam, {new: true} )
    if(response) {
      res.status(200).send("Upadated team succefully !")
    }
  }catch(error) {
    console.log(error)
  }

});



module.exports = router;