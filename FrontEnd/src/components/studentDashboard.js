import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faCircleXmark,
  faCheckSquare,
  faChartPie,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import OptBoxes from "./optBoxes";
import Studiv from "./studiv";
import Calender from "./calender";
import Counter from "./counter";
import "./student.css";
import { useNavigate } from "react-router-dom";
export default function StudentDashboard(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [usr, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      Object.keys(user).length === 9 ? setUser("hod") : setUser("student");
    }
  }, [user]);

  useEffect(() => {
    if (usr && usr !== 'student') {
      navigate("/");
    }
  }, [usr, navigate]);

  return (
    <>
    {usr === 'student' && (
    <div className="dashboard">
      <h2 className="pt-4 pb-1 mx-5 wel"> Dashboard </h2>
      <div className="row">
        <div className="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-xs-4 mx-3 pt-4">
          <div className="row leaveCnt">
            <Counter
              purpose="Overall Requests"
              cnt={props.accept + props.reject + props.pending}
            />
          </div>
        </div>
        <div className="col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12">
          <div className="row">
            <Calender />
          </div>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12 msg">
          <p className="text-center p-5 pb-1 pt-1">
            Click here to send request{" "}
            <FontAwesomeIcon icon={faHandPointDown} className="reqicon" />
          </p>
          <button className="btn-success btn" onClick={props.renderReq}>
            <FontAwesomeIcon icon={faPaperPlane} className="reqicon" />
          </button>
        </div>
        <div className="col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12 boxmain m-2 p-3">
          <div className="row boxesrow">
            <div className="col p-3 m-2">
              <OptBoxes
                name="Accepted"
                cnt={props.accept}
                icon={faCheckSquare}
              />
            </div>
            <div className="col p-3 m-2">
              <OptBoxes
                name="Rejected"
                cnt={props.reject}
                icon={faCircleXmark}
              />
            </div>
            <div className="col p-3 m-2">
              <OptBoxes name="Pending" cnt={props.pending} icon={faChartPie} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Studiv form={props.form} />
      </div>
    </div>
    )} 
    </>
  );
}
