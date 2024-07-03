import React, { useState, useEffect } from "react";
import "./student.css";
import Sidebar from "./sidebar";
import Hodaccept from "./hodaccept";
import HodDashboard from "./hodDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Hod() {
  const usr = JSON.parse(sessionStorage.getItem("user"));
  const id = usr ? usr._id : null;
  const [acceptedCount, setAcceptCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [user, setUser] = useState({});
  const [form, setForm] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
        
      try {
        const res = await axios.get(
          `https://e-leave-hub-backend.vercel.app/dashboard/hod/requestCount/${id}`
        );
        setAcceptCount(res.data.accept);
        setRejectedCount(res.data.reject);
        setPendingCount(res.data.pending);
        setUser(res.data.user);
        setForm(res.data.forms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const [sidebar, setSidebar] = useState("dash");
  const renderReq = () => {
    setSidebar("req");
  };
  const renderDash = () => {
    setSidebar("dash");
  };

  return (
    <>
      {usr ? (
        <div className="container-fluid dashboard">
          <div className="row dash">
            <Sidebar
              renderReq={renderReq}
              renderDash={renderDash}
              id={id}
              to="/hodaccept"
              usr={"hod"}
            />
            <div className="col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 box">
              {sidebar === "dash" ? (
                <HodDashboard
                  renderReq={renderReq}
                  user={user}
                  accept={acceptedCount}
                  reject={rejectedCount}
                  pending={pendingCount}
                />
              ) : (
                <Hodaccept form={form} />
              )}
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
