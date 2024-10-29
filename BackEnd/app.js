import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import studentdetails from "./models/studentdetails.js";
import hoddetails from "./models/hoddetails.js";
import student from "./routes/student.js";
import hod from './routes/hod.js';
import bodyParser from "body-parser";
import form from "./models/form.js";
import nodemailer from 'nodemailer';

dotenv.config();

const app=express();
app.use(bodyParser.json())  // capture request

app.use(cors({
  origin: ['http://localhost:3000','https://e-leave-hub.vercel.app'], // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Enable set cookie from the server
}));
app.use(express.json());

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

  // Serve uploaded images statically
  app.use('/images', express.static(path.join(__dirname, 'images')));

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'images')); // Use the images directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`); // Specify the image name
    },
  });
  
  const upload = multer({ storage: storage });

  //  Uploading Images in S3 Bucket

  // const s3 = new S3Client({
  //   region: process.env.AWS_REGION,
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   }
  // });

  // const upload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: process.env.S3_BUCKET_NAME,
  //     metadata: function (req, file, cb) {
  //       cb(null, { fieldName: file.fieldname });
  //     },
  //     key: function (req, file, cb) {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //       cb(null, 'images/' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  //     }
  //   })
  // });
  
  app.post('/filedata/:id', upload.single('image'), async (req, res) => {
    console.log('Processing file upload request');
    const _id = req.params.id;
    const prof = req.file ? req.file.path : null; // Get the file path

    if (prof !== null) {
        try {
            console.log('Uploaded file path:', path.basename(prof));

            // Convert to URL format for frontend
            const fileUrl = `images/${path.basename(prof)}`; // Use basename to get the file name

            // Update the database with the path to the uploaded file
            if (req.body.user === 'hod') {
                await hoddetails.findByIdAndUpdate(_id, { profile: fileUrl }, { new: true });
            } else {
                await studentdetails.findByIdAndUpdate(_id, { profile: fileUrl }, { new: true });
            }

            res.status(200).send({ msg: "success", imageUrl: fileUrl });
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


