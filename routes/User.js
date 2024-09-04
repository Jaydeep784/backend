const express = require("express");
const router = express();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/users/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({email});
    console.log(user);
    if (user !== null) return res.json({ msg: "User with this email already exists" });
    else {
      const result = await User.create({
        name,
        email,
        password,
      });
      return res.status(201).json({ msg: "User added successfully!", result });
    }
  } catch (error) {
    return res.status(404).json({msg: "Couldn't create account. Try again after some time!"});
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(user === null) return res.status(401).json({msg: "No user found!"});
  const match = await bcrypt.compare(password, user.password);
  if (user && match) {
    return res.status(201).json({ msg: "Login Successful!", user });
  } else {
    return res.status(400).json({ msg: "Wrong Password" });
  }
});

module.exports = router;
