import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import MainPage from './mainPage';

export default function StudentLogin() {
    const [str, setStr] = useState('');
    const [formdata, setFormdata] = useState({
        email: '',
        pwd: ''
    });
    const navigate = useNavigate();

    const handleSTUsubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/handle_student_login", formdata)
            .then((res) => {
                const id = res.data.id;
                if (res.data.msg === 'Success') {
                    setStr('Login successfully');
                    navigate('/studentDashboard/' + id);
                } else if (res.data.msg === 'thepassword is incorrect') {
                    setStr('Incorrect password');
                } else {
                    setStr('Invalid user');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <MainPage />
            <div className='container-fluid logincon'>
                <div className='container login'>
                    <div className="card text-bg-success mb-3">
                        <div className="card-header">
                            <div style={{ color: 'white' }}>Student Login</div>
                        </div>
                        <div className="card-body">
                            {/* <h5 className="card-title">Title</h5> */}
                            <div className="card-text">
                                <center>
                                    <div style={{ color: (str === "Invalid user" || str === "Incorrect password") ? "red" : "green" }}>
                                        {str}
                                    </div>
                                </center>
                                <form onSubmit={handleSTUsubmit}>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Email</label>
                                        <div className="col-sm-8">
                                            <input type="email" className="form-control" id="inputEmail3" placeholder='Enter your email' value={formdata.email} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder='Enter your password' value={formdata.pwd} onChange={(e) => setFormdata({ ...formdata, pwd: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-success">Login</button>
                                    </div>
                                </form>
                                <div className='text-center'>Don't have an account? <Link to='/register'>Register</Link>/<Link to='/hodlogin'>Hod</Link></div>
                            </div>
                        </div>
                        <div className="card-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
