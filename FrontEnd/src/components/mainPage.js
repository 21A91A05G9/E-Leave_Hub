// import './mainPage.css'
import { Link } from 'react-router-dom';
function MainPage(){
    
    return(
        <>
        <div className="container-fluid">
        <nav className="navbar fixed-top navbar-inverse navbar-expand-md">
        
            <b><span id="sp" className="navbar-brand" style={{color:"white"}}>eLeave</span><span style={{color:"rgb(151, 151, 151)"}}>Hub</span></b>
                    
            <button className="navbar-toggler menu-but" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="navbar-collapse collapse" id="menu">
                    
            <ul className="nav navbar-nav ms-auto">
                        
                {/* <li className="dropdown nav-item">
                    <Link to="/" className="nav-link" style={{color:"white"}}>HOME</Link>
                     <a href="" className="nav-link" style={{color:"black"}}>HOME</a> 
                </li> */}
                {/* <li className="dropdown nav-item">
                    <Link to="/requestleave" className="nav-link" style={{color:"white"}}>MAIL</Link>
                </li> */}
                {/* <li className="dropdown nav-item">
                    <Link to="/about" className="nav-link" style={{color:"white"}}>ABOUT US</Link>
                </li> */}
                 <li className="nav-item">
                    <Link to="/" className="nav-link p-3" style={{color:"white"}}>
                        HOME
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/register" className="nav-link" style={{color:"white"}}>
                    <button className='btn btn-light'>SING UP</button>
                    </Link>
                </li>
               
                {/* <li className="nav-item">
                    <Link to="/contact" className="nav-link" style={{color:"white"}}>CONTACT US</Link>
                </li> */}
            </ul>
            
            </div>
        </nav>


        </div>
        </>
    )
}
export default MainPage;