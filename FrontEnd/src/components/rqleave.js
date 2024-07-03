import "./mainPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rqleave(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const name = user ? user.name : null;
  const id = user ? user.id : null;
  const rollnum = user ? user.rollNo : null;
  const email = user ? user.email : null;
  const [formdata, setFormdata] = useState({
    name,
    rollnum,
    email,
    fdate: "",
    tdate: "",
    reason: "",
  });
  const nav = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementsByClassName("btn")[0];
    btn.disabled = true;

    await axios.post("https://e-leave-hub.vercel.app/formdata", formdata).then((res) => {
      alert(res.data.msg);
      if (res.data.msg === "Email sent successfully to your hod") {
        nav(`/studentDashboard/${id}`);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <div className="row dash request">
        {/* <Sidebar  id={id} to='/sendemail/' usr={'student'} /> */}
        <div className="col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 box">
          <h2 id="rq">FILL DETAILS FOR LEAVE</h2>
          <form className="form-horizontal mt-5" onSubmit={handlesubmit}>
            <table className="container">
              <thead></thead>
              <tbody>
                <tr className="row">
                  <td className="col-md-2 offset-md-2 lab-td">
                    <label className="lab">Name</label>
                  </td>
                  <td className="col-md-5">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="type your name here"
                      value={formdata.name}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-md-2 offset-md-2 lab-td">
                    <label className="lab">Roll No</label>
                  </td>
                  <td className="col-md-5">
                    <input
                      type="text"
                      name="rollnum"
                      className="form-control"
                      placeholder="EX: XXXXXX05F6"
                      value={formdata.rollnum}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-md-2 offset-md-2 lab-td">
                    <label className="lab">Email</label>
                  </td>
                  <td className="col-md-5">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="xxxx@gmail.com"
                      value={formdata.email}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-md-2 offset-md-2 lab-td">
                    <label className="lab">From Date</label>
                  </td>
                  <td className="col-md-5">
                    <input
                      type="date"
                      name="fdate"
                      className="form-control"
                      placeholder=""
                      value={formdata.fdate}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-md-2 offset-md-2 lab-td">
                    <label className="lab">To Date</label>
                  </td>
                  <td className="col-md-5">
                    <input
                      type="date"
                      name="tdate"
                      className="form-control"
                      placeholder=""
                      value={formdata.tdate}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-md-2 offset-md-2 lab-td">
                    <label className="lab">Reason </label>
                  </td>
                  <td className="col-md-5">
                    <textarea
                      type="text"
                      className="form-control"
                      rows="5"
                      name="reason"
                      value={formdata.reason}
                      onChange={handleChange}
                    ></textarea>
                  </td>
                </tr>
                <tr className="row mt-3">
                  <td className="col-md-2 offset-md-5">
                    <button className="btn btn-success" type="submit">
                      Send
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Rqleave;
