import React from 'react'
// import './home.css'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import MainPage from './mainPage'
function Register(){
    const [formdata,setFormdata] = useState({
        'name':'',
        'rollnum':'',
        'uremail':'',
        'phnum':'',
        'branch':'',
        'clg':'',
        'hodemail':'',
        'pwd':''
    })
    const [str,setStr]=useState()
    const navigate = useNavigate()
    function handleSTUreg(e){
        e.preventDefault();
        // console.log(formdata)
        axios.post("https://e-leave-hub-backend.vercel.app/handle_student_reg", formdata)
        .then((res) => {
          if (res.data.msg === 'submitted') navigate('/studentlogin');
          else if (res.data.msg === "Enter valid details") setStr("Enter valid details");
          else setStr("User Already exits..");
        })
        .catch((error) => {
          console.error('Error:', error);
          setStr("An error occurred");
        });
    }
    
    
    return(
        <>
        <MainPage/>
        <div className='container-fluid regForm pt-5 mt-5'>
        <div className='container login'>
        <div className="card text-bg-success mb-3">
        
                <div className="card-header" style={{color:'white'}} > Student</div>
                <div className="card-body">
                <div className="container">
                <center><div style={{color:(str==="User Already exits.." || str==="Enter valid details")?"red":"green"}}>{str}</div></center>

                <form  onSubmit={handleSTUreg}>
                <div className="row mb-3">
                    <label htmlFor="Name3" className="col-sm-4 col-form-label">Name</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" id="Name3" placeholder="Enter full name"   value={formdata.name} onChange={(e)=>setFormdata({...formdata,name:e.target.value})} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="roll3" className="col-sm-4 col-form-label">Roll NO</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" id="roll3" placeholder="Enter Roll No"    value={formdata.rollnum} onChange={(e)=>setFormdata({...formdata,rollnum:e.target.value})}  />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Email</label>
                    <div className="col-sm-8">
                    <input type="email" className="form-control" id="inputEmail3"  placeholder="Enter your email" value={formdata.uremail}  onChange={(e)=>setFormdata({...formdata,uremail:e.target.value})}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone3" className="col-sm-4 col-form-label">Phone No.</label>
                    <div className="col-sm-8">
                    <input type="number" className="form-control" id="phone3"  placeholder="Enter your phone number"  value={formdata.phnum} onChange={(e)=>setFormdata({...formdata,phnum:e.target.value})} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="branch3" className="col-sm-4 col-form-label">Branch</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" id="branch3" placeholder="Enter your branch"   value={formdata.branch}  onChange={(e)=>setFormdata({...formdata,branch:e.target.value})}  />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="college3" className="col-sm-4 col-form-label">College</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" id="colege3" placeholder="Enter your college"   value={formdata.clg}  onChange={(e)=>setFormdata({...formdata,clg:e.target.value})} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="hodmail3" className="col-sm-4 col-form-label">HOD email</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" id="hodmail3" placeholder="Enter your HOD email"   value={formdata.hodemail} onChange={(e)=>setFormdata({...formdata,hodemail:e.target.value})}  />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Password</label>
                    <div className="col-sm-8">
                    <input type="password" className="form-control" id="inputPassword3"  placeholder="Enter your password" value={formdata.pwd} onChange={(e)=>setFormdata({...formdata,pwd:e.target.value})}/>
                    </div>
                </div>
                <div className='text-center'><button  className="btn btn-success" >Register</button></div>   
                <div className='text-center'>Already have an account? <Link to='/studentlogin'>Login</Link></div>

                </form>
                </div>
                </div>
            </div>  
            </div>

        </div>
      

        
        </>
    )
}
export default Register