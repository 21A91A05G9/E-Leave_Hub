import React from "react";
import "./home.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPage from "./mainPage";
export default function Home() {
  const [formdata, setFormdata] = useState({
    email: "",
    pwd: "",
  });
  const nav = useNavigate();

  const handleSTUsubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/handle_student_login", formdata)
      .then((res) => {
        alert(res.data.msg);
        const id = res.data.id;
        if (res.data.msg === "Success") {
          nav("/studentDashboard/" + id);
        }
      })
      .catch((err) => console.log(err));
  };
  const [hoddata, sethoddata] = useState({
    email: "",
    pwd: "",
  });

  const handleHODsubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/handle_hod_login", hoddata)
      .then((res) => {
        alert(res.data.msg);
        const id = res.data.id;
        if (res.data.msg === "Success") {
          nav("/hod/" + id);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <MainPage />
      <div className="container-fluid row home">
        <div className="card text-center col-md-4 col-lg-3 col-xl-2 col-sm-12 col-xs-12 ">
          <div className="card-header">
            <b>Student</b>
          </div>
          <div className="card-body">
            <div className="container mt-5 mb-4">
              <form action="/action_page.php " onSubmit={handleSTUsubmit}>
                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="email">
                      <b>Email:</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      id="email"
                      value={formdata.email}
                      onChange={(e) =>
                        setFormdata({ ...formdata, email: e.target.value })
                      }
                      size={13}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-4">
                    <label htmlFor="lname">
                      <b>Password:</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      name="pwd"
                      placeholder="Enter password"
                      id="password"
                      value={formdata.pwd}
                      size={13}
                      onChange={(e) =>
                        setFormdata({ ...formdata, pwd: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button className="btn btn-success">Login</button>
                <p>
                  Don't have a account? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="card-footer "></div>
        </div>
        {/* hod login */}
        <div className="card text-center col-md-4 col-lg-3 col-xl-2 col-sm-12 col-xs-12">
          <div className="card-header">
            <b>HOD</b>
          </div>
          <div className="card-body">
            <div className="container mt-5 mb-4">
              <form action="/action_page.php " onSubmit={handleHODsubmit}>
                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="email">
                      <b>Email:</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      id="email"
                      value={hoddata.email}
                      onChange={(e) =>
                        sethoddata({ ...hoddata, email: e.target.value })
                      }
                      size={13}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-4">
                    <label htmlFor="lname">
                      <b>Password:</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      name="pwd"
                      placeholder="Enter password"
                      id="password"
                      value={hoddata.pwd}
                      onChange={(e) =>
                        sethoddata({ ...hoddata, pwd: e.target.value })
                      }
                      size={13}
                    />
                  </div>
                </div>
                <button className="btn btn-success">Login</button>
                <p>
                  Don't have a account? <Link to="/HODregister">Register</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="card-footer "></div>
        </div>
      </div>
    </>
  );
}
