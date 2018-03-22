const express        = require("express");
const authController = express.Router();
const passport       = require("passport");
const User           = require("../models/user");
const Profile           = require("../models/Profile");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 19;

authController.post("/signup", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Provide all the fields to sign up" });
  }

  User.findOne({ username:req.body.username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }
    console.log("entro!")    
    let hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(9), null);
    

    let newUser  = new User({
      username:req.body.username,
      password: hashPass,
      email:req.body.email
    });

    console.log(newUser);

//Nueva forma de guardar el user , con Promesas
    console.log("llego a guardar")
    newUser.save()
      .then(user => {
        //req.user=user
        req.login(user, (err) => {
          if (err) { return res.status(500).json({ message: "Something went wrong" }); }
          const newProfile = new Profile({
            account:newUser._id
          });
    
          newProfile.save()
            .then(profile=>res.status(201).json(req.user))
            .catch(err => console.log(err))
        })
        
      })
      .catch(err => res.status(400).json({ message: "Something went wrong" }))

  });
});

authController.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) { return res.status(401).json(err); }
    if (!user) { return res.status(401).json(info); }

    req.login(user, (err) => {
      if (err) { return res.status(500).json({ message: "Something went wrong" }); }
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

authController.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Success" });
});

authController.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) { return res.status(200).json(req.user); }
  return res.status(403).json({ message: "Unauthorized" });
});

authController.get("/private", (req, res) => {
  if (req.isAuthenticated()) { return res.json({ message: req.user.secret }); }
  return res.status(403).json({ message: "Unauthorized" });
});


module.exports = authController;
