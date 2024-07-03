import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Rqleave from './components/rqleave';
import StudentLogin from './components/studentlogin';
import Hodlogin from './components/hodlogin';
import Home from './components/home';
import Student from './components/student';
import Register from './components/register';
import Hod from './components/hod';
import Contact from './components/contact';
import HodAccept from './components/hodaccept';
import About from './components/about';
import HODregister from './components/hodregister';


function App() {

  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<About />} />
            <Route path='/home' element={<Home />} />
            <Route path='/sendemail/:id' element={<Rqleave />} />
            <Route path='/studentDashboard/:id' element={<Student />} />
            <Route path='/register' element={<Register />} />
            <Route path='/HODregister' element={<HODregister />} />
            <Route path='/studentlogin' element={<StudentLogin />} />
            <Route path='/hodlogin' element={<Hodlogin />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/hodaccept/:id' element={<HodAccept />} />
            <Route path='/hodDashboard/:id' element={<Hod />} />
          </Routes>
        </BrowserRouter>
   
    </div>
  );
}

export default App;
