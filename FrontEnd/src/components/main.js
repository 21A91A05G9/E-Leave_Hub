import { Link } from "react-router-dom"
function Main(){
    return(
        <div className="container-fluid">
        <div className='row main'>
            <h1>WELCOME TO OUR WEBSITE..</h1>
            <div className='row mt-5'>
                <div className='col-md-6'>
                    <div className='row'>
                        <button className='but1 offset-md-9 col-md-3'><Link to='/requestleave' style={{color:"white"}} >Requset leave</Link></button>
                    </div>
                </div>
            
                <div className='col-md-6'>
                    <div className='row'>
                        <button className='but1 col-md-3'>Accept leave</button>
                    </div>    
                </div>
            </div>
        </div>
        </div>
    )
}
export default Main