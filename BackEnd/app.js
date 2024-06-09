import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import form from "./models/form.js";
import nodemailer from 'nodemailer';
import studentdetails from "./models/studentdetails.js";
import hoddetails from "./models/hoddetails.js";
import multer from "multer";

const app = express();
app.use(bodyparser.json());
app.use(cors({
  origin: ['http://localhost:3000','https://e-leave-hub-fron.vercel.app/'], // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Enable set cookie from the server
}));
app.use(express.json());
mongoose.connect('mongodb+srv://vasavi_08:V7oxn9VU1hIJ7mpd@cluster0.yhpakpu.mongodb.net/DriveReady?retryWrites=true&w=majority')
  .then(() => app.listen(5001))
  .then(() => console.log("Connected to Database & Listening to localhost 5001"))
  .catch((err) => console.log(err));

app.use('/public', express.static("public/images"));

app.post('/formdata', async (req, res, next) => {
  const { name, rollnum, fdate, tdate, email, reason } = req.body;
  console.log(name);
  const count = '-1';
  const f = new form({
    name,
    rollnum,
    fdate,
    tdate,
    email,
    reason,
    count
  });
  try {
    console.log(fdate, tdate);
    await f.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sudheeshnavijjusudheeshnavijju@gmail.com',
        pass: 'rbux xjcb yltf rckk'
      }
    });
    const user = await studentdetails.findOne({ uremail: email });
    if (user) {
      const mailOptions = {
        from: 'sudheeshnavijjusudheeshnavijju@gmail.com',
        to: user.hodemail,
        subject: 'eLeaveHub Mail',
        text: `Dear Madam/Sir, \n\tI'm ${user.name.toUpperCase()} from ${user.branch.toUpperCase()} department having Roll Number ${user.rollnum.toUpperCase()} in ${user.clg.toUpperCase()} college. I'm sending this mail because I'm requesting you a leave from ${fdate} to ${tdate} and the reason is: ${reason}.
        I'm hoping that you will accept the leave.\n\t\t\tThanking you\nAccept the Leave:LINK\nReject the Leave:LINK`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.send({ msg: "Email sent successfully to your hod" });
        }
      });
    } else {
      return res.send({ msg: "Please provide valid information" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ msg: "Error in sending the mail" });
  }
});

app.post('/handle_student_reg', async (req, res) => {
  console.log("Request received at /handle_student_reg");
  console.log("Request body:", req.body);
  const { name, rollnum, uremail, phnum, branch, clg, hodemail, pwd } = req.body;
  const profile = 'profile.png';
  const newStudent = new studentdetails({
    name,
    rollnum,
    uremail,
    phnum,
    branch,
    clg,
    hodemail,
    pwd,
    profile
  });

  if (!name || !rollnum || !uremail || !phnum || !branch || !clg || !hodemail || !pwd) {
    return res.status(400).send({ msg: "Enter valid details" });
  }

  try {
    const existingUser = await studentdetails.findOne({ uremail });
    if (existingUser) {
      return res.status(400).send({ msg: "Already exists" });
    }
    await newStudent.save();
    res.status(201).send({ msg: "submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname)
  }
});
const upload = multer({ storage: storage });
app.post('/filedata/:id', upload.single('myfile'), async (req, res, next) => {
  const _id = req.params.id;
  const prof = (req.file) ? req.file.filename : null;
  if (prof != null) {
    await studentdetails.findByIdAndUpdate(_id, { profile: prof }, { new: true });
    console.log(prof);
    res.send({ msg: "success" });
  } else {
    res.send({ msg: "select an image to upload" });
  }
});

app.post('/handle_hod_reg', async (req, res, next) => {
  const { name, email, phnum, branch, clg, pwd } = req.body;
  const f = new hoddetails({
    name,
    email,
    phnum,
    branch,
    clg,
    pwd
  });
  if (name == '' || email == '' || phnum == '' || branch == '' || clg == '' || pwd == '') {
    return res.send({ msg: "Enter valid details" });
  }
  const user = await hoddetails.findOne({ email });
  if (user) {
    return res.send({ msg: "Already exists" });
  } else {
    try {
      await f.save();
      return res.send({ msg: "submitted" });
    } catch (err) {
      console.log(err);
      return res.send({ msg: "Error in saving data" });
    }
  }
});


app.post('/handle_student_login',(req,res)=>{
  const {email,pwd}=req.body;
  studentdetails.findOne({uremail: email})
  .then(user=>{
    if(user){
      if(user.pwd===pwd){
        res.send({msg:'Success',id:user._id})
      }
      else{
        res.json({msg:'The password is incorrect'})
      }
    }
    else{
      res.json({msg:"No user found"})
    }
  })
})

app.post('/findstudent/:id',(req,res,next)=>{
  const _id=req.params.id
  studentdetails.findOne({"_id": _id})
  .then(user=>{
    res.send(user)
  })
})

app.post('/findhod/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await hoddetails.findOne({ _id: _id });
    if (!user) {
      return res.status(404).json({ error: 'HOD not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching HOD details:', err);
    res.status(500).json({ error: 'An error occurred while fetching HOD details' });
  }
});

app.post('/showdata/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    // Use async/await for better readability
    const stu = await studentdetails.findOne({ _id: id });

    if (stu) {
      const data = await form.find({ email: stu.uremail });
      res.json(data);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/countupdate1/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await studentdetails.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const forms = await form.find({ email: user.uremail });
    const count = forms.filter(form => form.count === '1').length;
   
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while counting documents' });
  }
});

app.post('/countupdate0/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await studentdetails.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const forms = await form.find({ email: user.uremail });
    const count = forms.filter(form => form.count === '0').length;
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while counting documents' });
  }
});

app.post('/countupdate-1/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await studentdetails.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const forms = await form.find({ email: user.uremail });
    const count = forms.filter(form => form.count === '-1').length;
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while counting documents' });
  }
});

// app.post('/showdata/:id',async(req,res,next)=>{
//   const id=req.params.id;
//   studentdetails.findOne({_id:id}).then(stu=>{
//     form.find({email:stu.uremail}).then(data=>
//       res.send(data))
//   })
// })

app.post('/showdata/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    // Use async/await for better readability
    const stu = await studentdetails.findOne({ _id: id });

    if (stu) {
      const data = await form.find({ email: stu.uremail });
      res.json(data);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

async function counter1(stulist) {
  if (stulist) {
    let c = 0;
    await Promise.all(
      stulist.map(async (ele) => {
        const result = await form.find({ email: ele.uremail, count: 1 });
        c += result.length;
      })
    );
    //console.log(c);
    return c;
  }
}
app.post('/acceptcounter/:id', async (req, res, next) => {
  const _id = req.params.id;
  try {
    const hod = await hoddetails.findOne({ _id: _id });
    const stulist = await studentdetails.find({ hodemail: hod.email });

    if (stulist) {
      const c = await counter1(stulist);
      res.json(c);
      //console.log(c);
    } else {
      res.json(0);
    }
  } catch (error) {
    // Handle any potential errors here.
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

async function counter0(stulist) {
  if (stulist) {
    let c = 0;
    await Promise.all(
      stulist.map(async (ele) => {
        const result = await form.find({ email: ele.uremail, count: 0 });
        c += result.length;
      })
    );
    //console.log(c);
    return c;
  }
}

app.post('/rejectcounter/:id', async (req, res, next) => {
  const _id = req.params.id;
  try {
    const hod = await hoddetails.findOne({ _id: _id });
    const stulist = await studentdetails.find({ hodemail: hod.email });

    if (stulist) {
      const c = await counter0(stulist);
      res.json(c);
      //console.log(c);
    } else {
      res.json(0);
    }
  } catch (error) {
    // Handle any potential errors here.
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.post('/pendingcounter/:id', async (req, res, next) => {
  const _id = req.params.id;
  try {
    const hod = await hoddetails.findOne({ _id: _id });
    const stulist = await studentdetails.find({ hodemail: hod.email });

    if (stulist) {
      const c = await counterp(stulist);
      res.json(c);
      //console.log(c);
    } else {
      console.log('el')
      res.json(0);
    }
  } catch (error) {
    // Handle any potential errors here.
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.post('/handle_hod_login',(req,res)=>{
  const {email,pwd}=req.body;
  hoddetails.findOne({email: email})
  .then(user=>{
    if(user){
      if(user.pwd===pwd){
        res.json({msg:'Success',id:user._id})
      }
      else{
        res.json({msg:'thepassword is incorrect'})
      }
    }
    else{
      res.json({msg:"no registered"})
    }
  })
})

app.post("/getdata/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const hod = await hoddetails.findOne({ _id: id });

    if (!hod) {
      return res.status(404).json({ error: "HOD not found" });
    }

    const list = await studentdetails.find({ hodemail: hod.email });
    const userPromises = list.map(ele => form.find({ email: ele.uremail, count: "-1" }));

    const userResults = await Promise.all(userPromises);
    const flattenedResults = userResults.flat();

    flattenedResults.sort((a, b) => a.reason.localeCompare(b.reason));
    
    res.send(flattenedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put('/set1/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDoc = await form.findOneAndUpdate({ _id: id }, { count: '1' });
    
    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send email logic here
    const user = await form.findOne({ _id: id });
    sendEmail(user.email, 'ACCEPTED', user.name, user.reason);

    res.send({ message: 'Document updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put('/set0/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDoc = await form.findOneAndUpdate({ _id: id }, { count: '0' });
    
    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send email logic here
    const user = await form.findOne({ _id: id });
    sendEmail(user.email, 'REJECTED', user.name, user.reason);

    res.send({ message: 'Document updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const sendEmail = (to, status, name, reason) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject: 'eLeaveHub Mail',
    text: `Dear ${name.toUpperCase()};\n\tYour request for leave due to the reason: ${reason} is "${status}" by your HOD\n\t\t Have a Nice Day..`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
