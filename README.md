# eLeaveHub

**eLeave Hub** is a leave management application designed to streamline the leave request process between students and Heads of Department (HOD). The system allows students to request leave online, and HODs can approve or reject requests directly. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), eLeave Hub provides a seamless, responsive experience for users on both frontend and backend platforms.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)


## Features
- **Student Leave Requests:** Students can log in and submit leave requests easily.
- **HOD Approval/Denial:** HODs can log in, view pending leave requests, and approve or reject them.
- **Email Notifications:** HODs receive email notifications for incoming leave requests.
- **Dashboard:** User-friendly dashboards for students and HODs.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **Secure Authentication:** Secure login and registration using sessions for both students and HODs.
- **Calendar Integration:** Integrated calendar to view and manage leave requests effectively.

## Technology Stack
- **Frontend:** [React.js](https://reactjs.org/), HTML, CSS, JavaScript, Bootstrap
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Deployment:**[Vercel](https://vercel.com/), [AWS S3](https://aws.amazon.com/s3/) (image storage)
- **Email Notifications:** [Gmail SMTP](https://support.google.com/a/answer/176600?hl=en) (using Nodemailer)

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) installed and running, or use a MongoDB cloud service like MongoDB Atlas
- [Vercel](https://vercel.com/) account (for frontend deployment)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/eleave-hub.git
   cd E-Leave_Hub
2. **Backend Setup:**

- Navigate to the backend folder:
  ```bash
  cd Backend
  
- Install dependencies:
  ```bash
  npm install
  
- Set up environment variables as described below.
  Create a `.env` file in both the backtend and add the following variables:
  ```bash
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-email-password
  
3. **Frontend Setup:**

- Navigate to the frontend folder:
  ```bash
  cd ../Frontend
  
- Install dependencies:
   ```bash
  npm install
  
- Set up the frontend environment variables as described below.
  Create a `.env` file in both the frontend and add the following variables:
  ```bash
  REACT_APP_NODE_API=https://your-backend-url.com
  
4. **Start the Application:**

- Start the backend server:
  ```bash
  npm start
  
- Start the frontend server:
  ```bash
  npm start

The backend will run on http://localhost:5000, and the frontend will run on http://localhost:3000 by default.

## Usage
![image](https://github.com/user-attachments/assets/266cde33-819d-4437-ac2b-2ffb851857d4)

### Student Registration and Login:
Students can register and log in to submit leave requests.

![image](https://github.com/user-attachments/assets/f0b54212-ceda-44d0-88f9-d14672c80f0e)

![image](https://github.com/user-attachments/assets/e2bff92e-bcad-4959-82d7-c35c27470a3a)

![image](https://github.com/user-attachments/assets/1efa3ce7-fd42-42e4-b09c-c002ee3bf720)



### HOD Registration and Login:
HODs can register and log in to view, approve, or reject student leave requests

![image](https://github.com/user-attachments/assets/8224e409-bf39-4a64-85e3-e382f9b02b94)

![image](https://github.com/user-attachments/assets/ad4a0945-38cd-4e17-b362-718e24a4ad92)

![image](https://github.com/user-attachments/assets/617dca46-4a1d-498d-b686-2668ee3dbe6b)



### View Leave Requests:
Students can track the status of their requests, and HODs have access to an interface for managing them.

![image](https://github.com/user-attachments/assets/2c4e5b95-2bb5-418b-bd48-c586095cdc77)

![image](https://github.com/user-attachments/assets/d021bb19-b799-40a0-9392-9e333c1b42d0)



## Project Structure
      E-Leave_HubT/
      ├── Backend/                  # Backend code
      │   ├── models/               # Database models
      │   ├── routes/               # API routes
      │   ├── public/images         # Public assets
      │   ├── .env                  # Environment variables
      │   ├── package.json          # Backend dependencies
      │   └── App.js                # Backend entry point
      │   ├── vercel.json/          # Deeployment
      ├── Frontend/                 # Frontend code
      │   ├── public/               # Public assets
      │   ├── src/                  # React components and logic
      │   ├── package.json          # Frontend dependencies
      │   └── .env                  # Frontend environment variables
      └── README.md                 # Project documentation

## Future Enhancements
- Dark Mode Support
- Password Recovery and Update Feature
- Enhanced Email-Based Approval System
- Mobile App Development

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   
5. Open a pull request.
   

