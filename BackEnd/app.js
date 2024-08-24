import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import form from "./models/form.js";
import nodemailer from 'nodemailer';
import studentdetails from "./models/studentdetails.js";
import hoddetails from "./models/hoddetails.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import student from "./routes/student.js";
import hod from './routes/hod.js'
import dotenv from 'dotenv';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

dotenv.config();
const app=express();

app.use(cors({
  origin: ['http://localhost:3000','https://e-leave-hub.vercel.app'], // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}));


app.use(express.json());

app.use(bodyParser.json())  // capture request
                       

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('Error: DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to Database & Listening to localhost 5000"))
  .catch((err) => console.log(err));


  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use('/images', express.static(path.join(__dirname, 'images')));

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      acl: 'public-read', // Optional: Make the files public
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'images/' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    })
  });
  
  app.post('/filedata/:id', upload.single('image'), async (req, res) => {
    console.log('Processing file upload request');
    const _id = req.params.id;
    const prof = req.file ? req.file.path : null;
    console.log(req.body); // Log the request body for debugging
  
    if (prof !== null) {
      try {
        console.log('Uploaded file path:', prof);
  
        // Update the database with the path to the uploaded file
        if (req.body.user === 'hod') {
          await hoddetails.findByIdAndUpdate(_id, { profile: prof }, { new: true });
        } else {
          await studentdetails.findByIdAndUpdate(_id, { profile: prof }, { new: true });
        }
  
        res.status(200).send({ msg: "success", imageUrl: prof });
      } catch (error) {
        console.error('Error updating database:', error);
        res.status(500).send({ msg: "error updating database", error });
      }
    } else {
      res.status(400).send({ msg: "select an image to upload", imageUrl: null });
    }
  });
  

  

app.post('/formdata', async (req, res, next) => {
  console.log(req.body)
  const { name, rollnum, fdate, tdate, email, reason } = req.body;
 
  const count = '-1';
  
  try {
    const user = await studentdetails.findOne({ email });
    const hodEmail = user.hodEmail
    const reqId = user._id
    const f = new form({name,rollnum,fdate,tdate,email, hodEmail, reason,count});

    const accept = `https://e-leave-hub.vercel.app/dashboard/hod/accept/${reqId}`;
    const reject = `https://e-leave-hub.vercel.app/dashboard/hod/reject/${reqId}`
    await f.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.GOOGLE_SECRET_KEY
      }
    });
    
    if (user) {
      
      
      const mailOptions = {
        from: 'noolu.vasavi123@gmail.com',
        to: hodEmail,
        subject: 'eLeaveHub Mail',
        html: `
          <p>
            Dear Madam/Sir,<br/><br/>
            I'm ${user.name.toUpperCase()} from ${user.branch.toUpperCase()} department having Roll Number ${user.rollNo.toUpperCase()} in ${user.college.toUpperCase()} college. I'm sending this mail because I'm requesting you a leave from ${fdate} to ${tdate} and the reason is ${reason}.<br/><br/>
            I'm hoping that you will accept the leave.<br/><br/>
            <a href="${accept}"><button style="background-color: green; color: white; border: none; padding: 10px 20px; margin: 5px; cursor: pointer;">Accept</button></a>
            <a href="${reject}"><button style="background-color: red; color: white; border: none; padding: 10px 20px; margin: 5px; cursor: pointer;">Reject</button></a><br/><br/>
            Thanking you
          </p>
        `
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


// STUDENT 

app.use('/auth/student',student)
app.use('/dashboard/student',student)


// HOD
app.use('/auth/hod',hod)
app.use('/dashboard/hod',hod)

