import React, { useState, useEffect } from "react";
import './hodaccept.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Hodaccept() {
    const { id } = useParams();
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:5001/getdata/${id}`);
                setArr(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching data: " + error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAccept = async (reqId) => {
        const con = window.confirm("Do you want to accept?");
        if (con) {
            try {
                await axios.put(`http://localhost:5001/set1/${reqId}`);
                // Optionally, update the UI after accepting
            } catch (error) {
                console.error("Error accepting request:", error);
            }
        }
    };

    const handleReject = async (reqId) => {
        const con = window.confirm("Do you want to reject?");
        if (con) {
            try {
                await axios.put(`http://localhost:5001/set0/${reqId}`);
                // Optionally, update the UI after rejecting
            } catch (error) {
                console.error("Error rejecting request:", error);
            }
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container'>
            <div className="row dash">
            <Sidebar id={id} to={'/hodaccept/'} usr={'hod'} userType={'hod'} />
                <div className='col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 main'>
                    <h2>Requests To Approve</h2>
                    <div className="maindiv row">
                        <span className="col">Name</span> <span className="col">Roll No.</span> <span className="col">Reason</span>
                        <span className="col">Actions</span>
                    </div>
                    {arr.length > 0 ? (
                        arr.map((e) => (
                            <div className="div row" key={e._id}>
                                <span className="col">{e.name}</span> <span className="col">{e.rollnum}</span><span className="col">{e.reason}</span>
                                <button className='btn btn-success col-1 mx-2' onClick={() => handleAccept(e._id)}>Accept</button>
                                <button className='btn btn-danger col-1 mx-2' onClick={() => handleReject(e._id)}>Reject</button>
                            </div>
                        ))
                    ) : (
                        <div className='col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 main'>
                            Oops!! Already all requests have been viewed :) / No Requests
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
