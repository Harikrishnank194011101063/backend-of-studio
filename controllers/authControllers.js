const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const userInfo = require("../model/userschema")

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};








const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
          










module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};


module.exports.userInfo = async (req, res, next) => {
  try {
  //  const {name,gmail,mobile,date,time,endtime} = req.body;
    const user = await userInfo.find();
    res.status(201).json({ data: user,get:true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, get: false });
  }
};







module.exports.userInfoSave = async (req, res, next) => {
  try {
  const {name,gmail,mobile,date,time,endtime} = req.body;
    const user = await userInfo.create({name,gmail,mobile,date,time,endtime});  
    res.status(201).json({ data: user,user: user._id,create:true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, create: false });
  }
};
















module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("user pass", req.body)
  try {
    const user = await User.login(email , password);
    console.log("users" , user)
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};