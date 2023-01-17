require("dotenv").config();
const User = require("./model/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

//custom middleware importing

const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // used for forms
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ineuron</h1>");
});

app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!(email && firstname && lastname && password)) {
      res.status(400).send("PLease enter all the mandatory fields");
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      res.status(400).send("mail already exists");
    }

    //encrypting the password

    const encryptedPassword = await bcrypt.hash(password, 10);

    //creating a new entry in database

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    //creating a token and sending it to user
    const token = jwt.sign(
      {
        id: newUser._id,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );

    newUser.token = token;

    //don't want to send the password
    newUser.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    console.log("Error in response route");
  }
});

app.post("/login", async (req, res) => {
  try {
    //collect information from frontend

    const { email, password } = req.body;
    //validate
    if (!(email && password)) {
      res.status(401).send("password and email is required");
    }
    //check user in database

    const newUser = await findOne({ email });

    //match the password

    if (!newUser) {
      res.status(401).send("You are not an user");
    }

    if (newUser && (await bcrypt.compare(password, newUser.password))) {
      const token = jwt.sign({ id: newUser._id, email }, "shhhhh", {
        expiresIn: "2h",
      });
      newUser.password = undefined;
      newUser.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        newUser,
      });
    }

    res.status(400).json("Password should be correct");

    //create token and send
  } catch (error) {
    console.log(error);
  }
});

app.get("/dashboard", (req, auth, res) => {
  res.send("Welcome to dashboard");
});

app.get("/profile", (req, auth, res) => {
  //access to req.user = id, email
  //based on id, query the DB and get all information of user - findOne({id})
  //send a json response with all data
});

module.exports = app;
