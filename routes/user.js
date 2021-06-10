const express = require("express");
const router = new express.Router();
const { user: User, role: Role } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    // Create user
    const user = await User.create(req.body);

    // Get user role
    const userRole = await Role.findOne({ where: { name: "user" } });

    // Add user role to account
    await user.addRole(userRole);

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
