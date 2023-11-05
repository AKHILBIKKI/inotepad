const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Akhiliswebdeveloper";

//Route 1 :Create a user using : POST "/api/auth/createuser" :login Required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //to check bad request
    let success = false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({success, errors: result.array() });
    }
    //checking email is already in use
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, errors: "User email is already in Use" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      //Create a user
      user = User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: { id: user.id },
      };
      success =true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });

      // res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 2 :authentication of a user : POST "/api/auth/login" : no login required
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    //to check bad request
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, errors: "Please enter correct credentials" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res
          .status(400)
          .json({ success, errors: "Please enter correct credentials" });
      }

      const data = {
        user: { id: user.id },
      };
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3 : Get loggedin User Details usin : POST "/api/auth/getuser" : no login required

router.post("/getUser", fetchuser , async (req, res) => {


    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
      
    } catch (error) {
      res.status(500).send("Internal server error occured");
    }
  }
);

module.exports = router;
