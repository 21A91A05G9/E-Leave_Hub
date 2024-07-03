
export default function Studiv(props) {
    
    if (props.form.length > 0) {
        return (
            <div className="container-fluid">
                <center><h3 className="leavetitle  pt-3 pb-1">leave requests details</h3></center>
                {props.form.map(ele => (
                    <div className="row" key={ele._id}>
                        <div className="col-md-1"></div>
                        <div className="col-md-11  row alert" style={{ backgroundColor: (ele.count === '1') ? "#d1e7dd" : (ele.count === '0') ? "#f8d7da" : "#fff3cd", color: (ele.count === '1') ? "#0f5132" : (ele.count === '0') ? "#842029" : "#664d03" }}>
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
        return <div className="leavetitle text-danger" >No Requests Are Available </div>;
    }
}
