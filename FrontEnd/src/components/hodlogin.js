import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import MainPage from './mainPage';

export default function HodLogin() {
   
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [hodData, setHodData] = useState({
        email: '',
        password: ''
    });
    

    const handleHODSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://e-leave-hub.vercel.app/auth/hod/login", hodData);
         
            if (res.data.msg === 'sucessfully login') {
                sessionStorage.setItem('user', JSON.stringify(res.data.hod));
                sessionStorage.setItem('token', JSON.stringify(res.data.token));
                setMessage("Login success");
                navigate(`/hodDashboard/${res.data.hod._id}`);
            } else if (res.data.msg === 'wrong password') {
                setMessage("Incorrect password");
            } else {
                setMessage("Invalid user");
            }
        } catch (err) {
            console.error(err);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="logincon">
            <MainPage />
            <div className='container'>
                <div className='container login'>
                    <div className="card text-bg-success mb-3">
                        <div className="card-header" style={{ color: 'white' }}>HOD Login</div>
                        <div className="card-body">
                            {/* <h5 className="card-title">Login</h5> */}
                            <div className="card-text">
                                <center>
                                    <div style={{ color: message === "Invalid user" || message === "Incorrect password" ? "red" : "green" }}>
                                        {message} &nbsp;
                                    </div>
                                </center>
                                <form onSubmit={handleHODSubmit}>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail2" className="col-sm-4 col-form-label">Email</label>
                                        <div className="col-sm-8">
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                id="inputEmail2" 
                                                placeholder='Enter your email' 
                                                value={hodData.email} 
                                                onChange={(e) => setHodData({ ...hodData, email: e.target.value })} 
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword2" className="col-sm-4 col-form-label">Password</label>
                                        <div className="col-sm-8">
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="inputPassword2" 
                                                placeholder='Enter your password' 
                                                value={hodData.password} 
                                                onChange={(e) => setHodData({ ...hodData, password: e.target.value })} 
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-success">Login</button>
                                    </div>
                                </form>
                                <div className='text-center'>
                                    Don't have an account? <Link to='/HODregister'>Register</Link> 
                                </div>
                            </div>
                        </div>
                        <div className="card-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
