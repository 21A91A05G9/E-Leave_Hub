import React, {  useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import MainPage from "./mainPage";

export default function StudentLogin() {
  const [str, setStr] = useState("");
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSTUsubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_NODE_API}/auth/student/login`, formdata) 
      .then((res) => {
        if (res.data.msg === "sucessfully login") {
          setStr("Login successfully");
          // value.setStudent(res.data.student);
          // console.log(value.student); // Log student data

          sessionStorage.setItem("user", JSON.stringify(res.data.student));
          sessionStorage.setItem("token", JSON.stringify(res.data.token));
          navigate(`/studentDashboard/${res.data.student._id}`);
        } else if (res.data.msg === "wrong password") {
          setStr("Incorrect password");
        } else {
          setStr("Invalid user");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <MainPage />
      <div className="container-fluid logincon">
        <div className="container login">
          <div className="card text-bg-success mb-3">
            <div className="card-header">
              <div style={{ color: "white" }}>Student Login</div>
            </div>
            <div className="card-body">
              {/* <h5 className="card-title">Title</h5> */}
              <div className="card-text">
              <div className="text-danger text-center">{str}&nbsp;</div>

                <form onSubmit={handleSTUsubmit}>
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
                    <button type="submit" className="btn btn-success">
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center">
                  Don't have an account? <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}
