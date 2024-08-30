const express = require("express");
const router = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.post("/users/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await User.create({
    name,
    email,
    password, 
  });

  return res.status(201).json({msg: "User added successfully!", result})
});

router.post("/users/login", async (req, res) => {
  const {email, password} = req.body;
  if(email === null || password === null) return res.status(400).json({msg: "Cannot read properties of null"});
  const user = await User.findOne({email});
  const match = await bcrypt.compare(password, user.password) 
  if(user && match){
    return res.status(201).json({msg: "Login Successful!", user});
  }
  else{
    return res.status(400).json({msg: "Invalid Credentials"});
  }
})

module.exports = router;
