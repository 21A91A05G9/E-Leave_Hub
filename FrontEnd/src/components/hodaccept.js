import React from "react";
import "./hodaccept.css";
import axios from "axios";


export default function Hodaccept({ form }) {
  const handleAccept = async (reqId) => {
    const con = window.confirm("Do you want to accept?");
    if (con) {
      try {
        await axios.put(`${process.env.REACT_APP_NODE_API}/dashboard/hod/accept/${reqId}`);
      } catch (error) {
        console.error("Error accepting request:", error);
      }
    }
  };

  const handleReject = async (reqId) => {
    const con = window.confirm("Do you want to reject?");
    if (con) {
      try {
        await axios.put(`${process.env.REACT_APP_NODE_API}/dashboard/hod/reject/${reqId}`);
      } catch (error) {
        console.error("Error rejecting request:", error);
      }
    }
  };

  const pending = form.filter((form) => form.count === "-1");

  // if (loading) return <div className="text-center">Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="contianer">
      <div className="row dash  request ">
        <div>
          <h2 className="p-2">
            <b>Requests To Approve</b>
          </h2>
          {pending.length > 0 ? (
            <>
              <div className="maindiv row">
                <span className="col">Name</span>
                <span className="col">Roll No.</span>
                <span className="col">Reason</span>
                <span className="col">Actions</span>
              </div>
              {pending.map((e) =>
                e.count === "-1" ? (
                  <div className="row hodTR" key={e._id}>
                    <span className="col">{e.name}</span>
                    <span className="col">{e.rollnum}</span>
                    <span className="col">{e.reason}</span>
                    <span className="col">
                      <button
                        className="btn-sm btn-success mx-1"
                        onClick={() => handleAccept(e._id)}
                      >
                        &#10004;
                      </button>
                      <button
                        className="btn-sm btn-danger"
                        onClick={() => handleReject(e._id)}
                      >
                        &#10006;
                      </button>
                    </span>
                  </div>
                ) : null
              )}
            </>
          ) : (
            <div className="col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 main">
              Oops!! Already all requests have been viewed :) / No Requests
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
