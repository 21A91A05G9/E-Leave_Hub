import React, { useState, useEffect } from "react";
import "./student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from '../images/profile.png';
import { faHomeUser,  faCamera} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar({ id, renderReq, renderDash }) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("imageurl"); // State to store image URL
  const [usr, setUser] = useState("");

  useEffect(() => {
    if (user && user.profile !== "imageurl") {
      setImageUrl(`${user.profile.replace(/\\/g, "/")}`);
    }
  }, [user]);

  useEffect(() => {
    user && Object.keys(user).length === 9
    ? setUser("hod")
      : setUser("student");
  }, [user]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user) {
    try {
      const formData = new FormData();
      console.log(selectedFile);
      formData.append("image", selectedFile);
      formData.append("user", usr);
      console.log(selectedFile)
      const res = await axios.post(`http://localhost:5000/filedata/${id}`,formData);
      console.log(res.data);

      if (res.data.msg === "success") {
        alert("Successfully Uploaded..!");

        setImageUrl(res.data.imageUrl.replace(/\\/g, "/"));
        user.profile = res.data.imageUrl.replace(/\\/g, "/");
        sessionStorage.setItem("user", JSON.stringify(user));

        setPopupVisible(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="col-md-1 col-lg-1 col-xl-1 col-sm-1 col-xs-1 menu">
      <button
        className="btn btn-success"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        <FontAwesomeIcon icon={faHomeUser} className="menuicon" />
      </button>

      <div
        className="offcanvas offcanvas-start sidebar show"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel ">
            {user.name}
          </h5>
          <button
            type="button"
            className="btn btn-success"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-5">
            <div className="profileCircle ">
              {isPopupVisible === true ? (
                <div>
                  <div className="file">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <button className="btn-xs btn btn-light m-0 p-0">
                          <input
                            type="file"
                            name="myfile"
                            accept="image/*"
                            className=" form-control p-0 py-1 m-0"
                            onChange={handleFileChange}
                          />
                        </button>
                        <button
                          type="submit"
                          className=" btn btn-success m-0 p-0 py-1 mx-2"
                        >
                          Upload
                        </button>
                        <button
                          onClick={hidePopup}
                          className="btn-xs btn btn-danger p-0 py-1 m-0 mx-2"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  {imageUrl !== "imageurl" ? (
                    <img
                      src={`http://localhost:5000/${imageUrl}`}
                      alt="profile"
                      className="profileicon circular-image"
                    />
                  ) : (
                    <>
                      <img
                        src={profile}
                        alt="profile"
                        className="profileicon circular-image"
                      />
                      <br />
                    </>
                  )}
                  <button className="camera" onClick={showPopup}>
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </>
              )}
            </div>
          </div>
          <Link className="row" onClick={renderDash}>
            Dashboard
          </Link>
          <Link className="row" to="/about">
            About
          </Link>
          <Link className="row" to="/contact">
            Contact
          </Link>
          <Link className="row" onClick={renderReq}>
            Request
          </Link>
          <Link className="row" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
