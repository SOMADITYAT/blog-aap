const userModel = require("../models/useModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all Flields",
      });
    }
    // existingUser
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedpassword);
    // password = hashedpassword;

    // Save new user
    const user = new userModel({ username, email, password: hashedpassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};
// get all users
exports.getAllusers = async (req, res) => {
  try {
    const usesrs = await userModel.find({});
    return res.status(200).send({
      userCount: usesrs.length,
      success: true,
      message: "All users data",
      usesrs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get All Users",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "please provide email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "email is not registered",
      });
    }

    // Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username and password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "login successfullly",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callback",
      error,
    });
  }
};
