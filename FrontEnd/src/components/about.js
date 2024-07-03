import React, { useEffect, useState } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import MainPage from "./mainPage";
import Contact from "./contact";
import logo from "../images/logo.jpg";
import accept from "../images/accept.jpg";
import reject from "../images/reject.webp";
import leave from "../images/leave.png";

const About = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [usr, setUser] = useState(null);
  const id = user ? user._id : null;


  useEffect(() => {
    if (user !== null) {
      Object.keys(user).length === 9 ? setUser("hod") : setUser("student");
    }
  }, [user]); // Include `user` in the dependency array

  return (
    <>
      <MainPage />
      <div className="container about">
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5 col-xl-5 txt">
            <div className="row mx-2">
              <h1 className="pb-3">About Us</h1>
              Welcome to the Leave Taking Project! We're a passionate team dedicated to helping individuals and organizations manage leave, whether it's for vacation, personal reasons, or medical necessities. Our mission is to simplify the leave management process and ensure that taking time off is stress-free for everyone involved.
            </div>
            <div className="row p-2">
              <Link
                to={
                  usr === "student"
                    ? `/studentDashboard/${id}`
                    : "/studentlogin"
                }
                className="col-md-4 mt-2"
              >
                <button className="btn btn-success">Student Login</button>
              </Link>
              <Link
                to={usr === "hod" ? `/hodDashboard/${id}` : "/hodlogin"}
                className="col-md-8 mt-2"
              >
                <button className="btn btn-success">HOD Login</button>
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-xs-12 col-md-7 col-lg-7 col-xl-7">
            <img className="mainimg" src={logo} alt="logo" />
          </div>
        </div>

        <div className="p-3 m-5"></div>
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5 col-xl-5 txt">
            <div className="row mx-2">
              <h2 className="text-center">Who We Are?</h2>
              Our team is made up of a diverse group of professionals with backgrounds in technology, human resources, and project management. We are united by a common goal – to create an exceptional leave management solution that benefits individuals, HR departments, and managers alike.
            </div>
            <br />
            <div className="row">
              <img className="status" src={accept} alt="accept" />
            </div>
          </div>

          <div className="col-sm-12 col-xs-12 col-md-1 col-lg-1 col-xl-1"></div>

          <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5 col-xl-5 txt">
            <div className="row mx-2">
              <h2 className="text-center">Our Vision</h2>
              At the Leave Taking Project, we believe that everyone deserves the opportunity to enjoy well-deserved time away from work and responsibilities. Our vision is to make leave management seamless, efficient, and transparent. We strive to create a world where taking a break is as easy as sending an email to HOD (head of the dept).
            </div>
            <div className="row">
              <img className="status" src={reject} alt="reject" />
            </div>
          </div>

          <div className="p-3 m-5"></div>
          <div className="row text-center">
            <h1 className="text-center">Our Commitment</h1>
            We are committed to delivering a user-friendly, reliable, and secure platform for leave management. We understand the importance of time off for well-being and work-life balance, and we're here to support you in making the most of your time away.
          </div>

          <div className="row">
            <div className="col-sm-12 col-xs-12 col-md-7 col-lg-7 col-xl-7">
              <img className="mainimg" src={leave} alt="leave" />
            </div>
            <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5 col-xl-5 txt">
              <div className="row mx-2">
                <h2 className="text-center p-3">What We Offer?</h2>
                <ul>
                  <li><b>User-Friendly Interface:</b> Our platform is designed with simplicity in mind. You can request, approve, and track leaves with just a few clicks.</li>
                  <li><b>Transparency:</b> Easily view your leave balance, history.</li>
                  <li><b>Notifications:</b> Receive timely reminders about leave requests and approvals, ensuring no important dates are missed.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-5 mt-5">
        <Contact />
      </div>
    </>
  );
};

export default About;
