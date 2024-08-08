import express from "express";
const router = express.Router();
// import fetchData from '../middleware/fetchdata.js'
import { body, validationResult } from "express-validator";
import Student from "../models/studentdetails.js";
import form from "../models/form.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET;

//Registration

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("rollNo").notEmpty(),
    body("email").notEmpty(),
    body("phoneNo").notEmpty(),
    body("branch").notEmpty(),
    body("college").notEmpty(),
    body("hodEmail").notEmpty(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
  
    const result = validationResult(req);
    if (result.isEmpty()) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt); //salt + pswd
      const student = new Student({
        name: req.body.name,
        rollNo: req.body.rollNo,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        branch: req.body.phoneNo,
        college: req.body.college,
        hodEmail: req.body.hodEmail,
        password: hash,
        profile : "imageurl",
      });
      const getRollNo = await Student.findOne({ rollNo: req.body.rollNo });
      const getEmail = await Student.findOne({ rollNo: req.body.email });
      if (getRollNo || getEmail) return res.send({ msg: "Already exits" }); // chack by   this way also

      let token = jwt.sign({ id: student._id }, JWT_SECRET);
      // console.log(token);
      try {
        console.log(student)
        await student.save(); // error means email exists
        return res.send({ msg: "Successfully Registered", student: student });
      } catch (error) {
        return res.send({ msg: "Error Occured" });
      }
    }

    return res.send({ errors: result.array(), msg: "fill all details" }); // if any one of the empty
  }
);



//login

router.post(
  "/login",
  [body("password").notEmpty(), body("email").notEmpty()],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() }); // if any one of the empty
    }

    try {
      const email = req.body.email;
      const password = req.body.password;

      const student = await Student.findOne({ email });

      if (!student) return res.send({ msg: "email not exits" }); // chack by this way also

      const checkPassword = await bcrypt.compare(password, student.password);
      if (!checkPassword) return res.send({ msg: "wrong password" });
      const token = jwt.sign({ id: student._id }, JWT_SECRET);
      // console.log(token)
      return res.send({
        msg: "sucessfully login",
        token: token,
        student: student,
      });
    } catch (error) {
      return res.send({ error, msg: "fill all details" });
    }
  }
);



router.get("/requestCount/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const student = await Student.findOne({ _id });
    if (!student) return res.status(404).json({ error: "User not found" });
    //   console.log(student)
    const email = student.email;
    const forms = await form.find({ email });

    const accept = forms.filter((form) => form.count === "1").length;
    const reject = forms.filter((form) => form.count === "0").length;
    const pending = forms.filter((form) => form.count === "-1").length;
    const user = student;

    res.json({ accept, reject, pending, user, forms });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while counting documents" });
  }
});

router.get("/fetchData/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const student = await Student.findOne({ _id });
    if (!student) return res.status(404).json({ error: "User not found" });
    res.json({ student });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while counting documents" });
  }
});



export default router;

