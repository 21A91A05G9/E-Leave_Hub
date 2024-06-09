import './mainPage.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './sidebar';

function Rqleave(props) {
    const { id } = useParams();
    const [formdata, setFormdata] = useState({
        name: '',
        rollnum: '',
        fdate: '',
        tdate: '',
        email: '',
        reason: ''
    });
    const nav = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(formdata);
        axios.post("http://localhost:5001/formdata", formdata).then((res) => {
            alert(res.data.msg);
            if (res.data.msg === 'Email sent successfully to your hod') {
                nav('/studentdashboard/' + id);
            }
        });
    };

    return (
        <div className='container-fluid'>
            <div className="row dash request">
                <Sidebar  id={id} to='/sendemail/' usr={'student'} />
                <div className='col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 box'>
                    <h2 id='rq'>FILL DETAILS FOR LEAVE</h2>
                    <form className="form-horizontal mt-5" onSubmit={handlesubmit}>
                        <table className="container">
                            <thead></thead>
                            <tbody>
                                <tr className="row">
                                    <td className="col-md-2 offset-md-2 lab-td">
                                        <label className="lab">Name:</label>
                                    </td>
                                    <td className="col-md-5">
                                        <input type="text" name="name" className="form-control" placeholder="type your name here" value={formdata.name} onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} />
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-2 offset-md-2 lab-td">
                                        <label className="lab">Roll Number:</label>
                                    </td>
                                    <td className="col-md-5">
                                        <input type="text" name="rollnum" className="form-control" placeholder="EX: XXXXXX05F6" value={formdata.rollnum} onChange={(e) => setFormdata({ ...formdata, rollnum: e.target.value })} />
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-2 offset-md-2 lab-td">
                                        <label className="lab">Your Email:</label>
                                    </td>
                                    <td className="col-md-5">
                                        <input type="email" name="email" className="form-control" placeholder="xxxx@gmail.com" value={formdata.email} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-2 offset-md-2 lab-td">
                                        <label className="lab">From Date:</label>
                                    </td>
                                    <td className="col-md-5">
                                        <input type="date" name="fdate" className="form-control" placeholder="" value={formdata.fdate} onChange={(e) => setFormdata({ ...formdata, fdate: e.target.value })} />
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-2 offset-md-2 lab-td">
                                        <label className="lab">To Date:</label>
                                    </td>
                                    <td className="col-md-5">
                                        <input type="date" name="tdate" className="form-control" placeholder="" value={formdata.tdate} onChange={(e) => setFormdata({ ...formdata, tdate: e.target.value })} />
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-2 offset-md-2 lab-td">
                                        <label className="lab">Reason for Leave:</label>
                                    </td>
                                    <td className="col-md-5">
                                        <textarea type="text" className="form-control" rows="5" name="reason" value={formdata.reason} onChange={(e) => setFormdata({ ...formdata, reason: e.target.value })}></textarea>
                                    </td>
                                </tr>
                                <tr className="row mt-3">
                                    <td className="col-md-2 offset-md-5">
                                        <button className='btn btn-success' type='submit'>Send</button>
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
