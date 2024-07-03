import express from "express";
const router = express.Router();
// import fetchData from '../middleware/fetchdata.js'
import { body, validationResult } from "express-validator";
import Hod from "../models/hoddetails.js";
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
    body("email").notEmpty(),
    body("phoneNo").notEmpty(),
    body("branch").notEmpty(),
    body("college").notEmpty(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt); //salt + pswd
      const hod = new Hod({
        name: req.body.name,
        rollNo: req.body.rollNo,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        branch: req.body.phoneNo,
        college: req.body.college,
        hodEmail: req.body.hodEmail,
        password: hash,
        profile: null
      });
      const getHod = await Hod.findOne({ rollNo: req.body.email });
      if (getHod) return res.send({ msg: "Already exits" }); // chack by   this way also

      var token = jwt.sign({ id: hod._id }, JWT_SECRET);
      // console.log(token);
      try {
        await hod.save(); // error means email exists
        return res.send({ msg: "Successfully Registered", Hod: hod });
      } catch (error) {
        return res.send({ msg: "error occured" });
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
      const { email, password } = req.body;
      // console.log(email, password);
      const hod = await Hod.findOne({ email: email });
      if (!hod) return res.send({ msg: "email not exits" }); // chack by this way also

      const checkPassword = await bcrypt.compare(password, hod.password);
      if (!checkPassword) return res.send({ msg: "wrong password" });
      const token = jwt.sign({ id: hod._id }, JWT_SECRET);
      return res.send({ msg: "sucessfully login", token: token, hod });
    } catch (error) {
      return res.send({ error, msg: "fill all details" });
    }
  }
);


router.get("/requestCount/:id", async (req, res) => {
  const _id = req.params.id;
  // console.log(_id);
  try {
    const hod = await Hod.findOne({ _id });
    if (!hod) return res.status(404).json({ error: "User not found" });
    const hodEmail = hod.email;
    const forms = await form.find({ hodEmail });
    
    const accept = forms.filter((form) => form.count === "1").length;
    const reject = forms.filter((form) => form.count === "0").length;
    const pending = forms.filter((form) => form.count === "-1").length;
    const user = hod;

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
    const hod = await Hod.findOne({ _id });
    if (!hod) return res.status(404).json({ error: "User not found" });
    res.json({ hod });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while counting documents" });
  }
});


router.put('/accept/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDoc = await form.findOneAndUpdate({ _id: id }, { count: '1' });
    
    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send email implemetation
    const user = await form.findOne({ _id: id });
    // sendEmail(user.email, 'ACCEPTED', user.name, user.reason);

    res.send({ message: 'Document updated successfully' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put('/reject/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDoc = await form.findOneAndUpdate({ _id: id }, { count: '0' });
    
    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send email implemtation
    const user = await form.findOne({ _id: id });

    
    // sendEmail(user.email, 'REJECTED', user.name, user.reason);

    res.send({ message: 'Document updated successfully' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


export default router;
