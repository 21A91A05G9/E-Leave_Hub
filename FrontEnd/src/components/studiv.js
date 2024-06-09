import axios from "axios";
import { useState, useEffect } from "react";

export default function Studiv(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        axios.post("https://e-leave-hub-back.vercel.app/showdata/" + props.id)
            .then((res) => {
                setData(res.data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setError("Error fetching data. Please try again.");
                setLoading(false);
            });
    }, [props.id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (data.length !== 0) {
        return (
            <div className="container-fluid">
                <center><h3 className="leavetitle pt-3 pb-1">leave requests details</h3></center>
                {data.map(ele => (
                    <div className="row" key={ele._id}>
                        <div className="col-md-1"></div>
                        <div className="col-md-11 row alert" style={{ backgroundColor: (ele.count === '1') ? "#d1e7dd" : (ele.count === '0') ? "#f8d7da" : "#fff3cd", color: (ele.count === '1') ? "#0f5132" : (ele.count === '0') ? "#842029" : "#664d03" }}>
                            <span className="col-12-col col-md-3">Reason: {ele.reason}</span>
                            <span className="col-sm-12 col-md-3">From: {ele.fdate}</span>
                            <span className="col-sm-12 col-md-3">To: {ele.tdate}</span>
                            <span className="col-sm-12 col-md-3">Status: {(ele.count === '1') ? "accepted" : (ele.count === '0') ? "rejected" : "pending"}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return <div>No data available</div>;
    }
}
