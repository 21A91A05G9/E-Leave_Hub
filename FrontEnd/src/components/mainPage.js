import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MainPage() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [usr, setUser] = useState(null);
  const id = user ? user._id : null;

  useEffect(() => {
    if (user !== null) {
      Object.keys(user).length === 9 ? setUser("hod") : setUser("student");
    }
  }, [user]);

  return (
    <>
      <div className="container-fluid">
        <nav className="navbar fixed-top navbar-inverse navbar-expand-md">
          <b>
            <span id="sp" className="navbar-brand" style={{ color: "white" }}>
              eLeave
            </span>
            <span style={{ color: "rgb(151, 151, 151)" }}>Hub</span>
          </b>

          <button
            className="navbar-toggler menu-but"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse" id="menu">
            <ul className="nav navbar-nav ms-auto">
              {user ? (
                <li className="nav-item">
                  <Link
                    to={
                      usr === "student"
                        ? `/studentDashboard/${id}`
                        : `/hodDashboard/${id}`
                    }
                    className="nav-link p-3"
                    style={{ color: "white" }}
                  >
                    <button className="btn btn-light">
                      {user.name} Dashboard{" "}
                    </button>
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link p-3"
                      style={{ color: "white" }}
                    >
                      HOME
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      <button className="btn btn-light">SIGN UP</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default MainPage;
