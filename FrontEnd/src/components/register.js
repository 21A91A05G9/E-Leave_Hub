import React from "react";
// import './home.css'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import MainPage from "./mainPage";
function Register() {
  const [formdata, setFormdata] = useState({
    name: "",
    rollNo: "",
    email: "",
    phoneNo: "",
    branch: "",
    college: "",
    hodEmail: "",
    password: "",
  });
  const [str, setStr] = useState();
  const navigate = useNavigate();
  function handleSTUreg(e) {
    e.preventDefault();
    // console.log(formdata)
    axios  
      .post("http://localhost:5000/auth/student/register", formdata)
      .then((res) => {
        console.log(res)
        if (res.data.msg === "Successfully Registered")
          navigate("/studentlogin");
        else if (res.data.msg === "fill all details")
          setStr("Fill All Details");
        else if (res.data.msg === "Already exits") 
          setStr("User Already exits..");
        else setStr("Error Occured..!")
      })
      .catch((error) => {
        console.error("Error:", error);
        setStr("Error Occured..!");
      });
  }

  return (
    <>
      <MainPage />
      <div className="container-fluid regForm pt-5 mt-5">
        <div className="container login">
          <div className="card text-bg-success mb-3">
            <div className="card-header" style={{ color: "white" }}>
              {" "}
              Student
            </div>
            <div className="card-body">
              <div className="container">
                <center>
                  <div
                    style={{
                      color:
                        str === "User Already exits.." ||
                        str === "Fill All Details"  || 
                        str === "Error Occured..!"
                          ? "red"
                          : "green",
                    }}
                  >
                    {str}
                  </div>
                </center>

                <form onSubmit={handleSTUreg}>
                  <div className="row mb-3">
                    <label htmlFor="Name3" className="col-sm-4 col-form-label">
                      Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="Name3"
                        placeholder="Enter full name"
                        value={formdata.name}
                        onChange={(e) =>
                          setFormdata({ ...formdata, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="roll3" className="col-sm-4 col-form-label">
                      Roll NO
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="roll3"
                        placeholder="Enter Roll No"
                        value={formdata.rollNo}
                        onChange={(e) =>
                          setFormdata({ ...formdata, rollNo: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-4 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="Enter your email"
                        value={formdata.email}
                        onChange={(e) =>
                          setFormdata({ ...formdata, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="phone3" className="col-sm-4 col-form-label">
                      Phone No.
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        id="phone3"
                        placeholder="Enter your phone number"
                        value={formdata.phoneNo}
                        onChange={(e) =>
                          setFormdata({ ...formdata, phoneNo: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="branch3"
                      className="col-sm-4 col-form-label"
                    >
                      Branch
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="branch3"
                        placeholder="Enter your branch"
                        value={formdata.branch}
                        onChange={(e) =>
                          setFormdata({ ...formdata, branch: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="college3"
                      className="col-sm-4 col-form-label"
                    >
                      College
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="colege3"
                        placeholder="Enter your college"
                        value={formdata.college}
                        onChange={(e) =>
                          setFormdata({ ...formdata, college: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="hodmail3"
                      className="col-sm-4 col-form-label"
                    >
                      HOD email
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="hodmail3"
                        placeholder="Enter your HOD email"
                        value={formdata.hodEmail}
                        onChange={(e) =>
                          setFormdata({ ...formdata, hodEmail: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-4 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword3"
                        placeholder="Enter your password"
                        value={formdata.password}
                        onChange={(e) =>
                          setFormdata({ ...formdata, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-success">Register</button>
                  </div>
                  <div className="text-center">
                    Already have an account?{" "}
                    <Link to="/studentlogin">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
