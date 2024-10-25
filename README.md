# eLeave Hub

eLeave Hub is a leave management application designed to streamline the leave request process between students and Heads of Department (HOD). The system allows students to request leave online, and HODs can approve or reject requests directly. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), eLeave Hub provides a seamless, responsive experience for users on both frontend and backend platforms.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Student Leave Requests:** Students can log in and submit leave requests easily.
- **HOD Approval/Denial:** HODs can log in, view pending leave requests, and approve or reject them.
- **Email Notifications:** HODs receive email notifications for incoming leave requests.
- **Dashboard:** User-friendly dashboards for students and HODs.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **Secure Authentication:** Secure login and registration using JWT for both students and HODs.
- **Calendar Integration:** Integrated calendar to view and manage leave requests effectively.

## Technology Stack
- **Frontend:** [React.js](https://reactjs.org/), HTML, CSS, JavaScript
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Deployment:** [Docker](https://www.docker.com/), [Vercel](https://vercel.com/) (frontend), [AWS S3](https://aws.amazon.com/s3/) (image storage)
- **Email Notifications:** [Gmail SMTP](https://support.google.com/a/answer/176600?hl=en) (using Nodemailer)

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) or Docker
- [Docker](https://www.docker.com/) (optional but recommended)
- [Vercel](https://vercel.com/) account (for frontend deployment)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/eleave-hub.git
   cd eleave-hub
2. **Backend Setup:**

- Navigate to the backend folder:
  ```bash
  cd eLeaveHub-Backend
  
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
  cd ../eLeaveHub-Frontend
  
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
  

### Usage

## Student Registration and Login:
Students can register and log in to submit leave requests.

## HOD Registration and Login:
HODs can register and log in to view, approve, or reject student leave requests

##View Leave Requests:
Students can track the status of their requests, and HODs have access to an interface for managing them.

### Project Structure

eLeaveHub/
├── eLeaveHub-Frontend/   # React frontend
│   ├── public/
│   └── src/
├── eLeaveHub-Backend/    # Node/Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── docker-compose.yml     # Docker Compose file for running services

### Future Enhancements
- Dark Mode Support
- Password Recovery and Update Feature
- Enhanced Email-Based Approval System
- obile App Development

### Contributing
- Contributions are welcome! Please follow these steps:

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
   

