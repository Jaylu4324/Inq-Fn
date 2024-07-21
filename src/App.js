import React from 'react'
// import Alerts from './Navabar/Alerts'
// import Dropdown from './Navabar/Dropdown'

import Navbar from './Navabar/Navbar'
import Invoice from "./invoice/Form"
import Studentdetails from './Studentdetails/SD'
import Old from './Old/Oldd'
import Internship from './Internship.js/Interform'
import Eventi from './einquiries/Eventi'
import Batches from './Btches/Batches(j)'
import Addcourse from './course/Addcourse' 
import Completedcourse from './course/Completedcourse'
import {BrowserRouter,Routes,Route} from"react-router-dom"
import Batchcourse from './Btches/Batchcourse'
import CourInq from './Inquiries/CourInq'
import Login from "./Login/Login"
import Dashboard from './dashboard/Dashboard'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      
<Route path='/login' element={<Login/>}/>      
<Route path='/dashBoard' element={<Navbar/>}>
<Route path='/dashBoard/dashBoard' element={<Dashboard/>}/>
</Route>
<Route path='/course' element={<Navbar/>}>

<Route path='/course/Invoice' element={<Invoice/>}/>
   <Route path='/course/CourInq' element={<CourInq/>}/>
   <Route path='/course/Studentdetails' element={<Studentdetails/>}/>
 
  
   <Route path='/course/AddCourse' element={<Addcourse/>}/>
   <Route path='/course/Batch-For-Course' element={<Batchcourse/>}/>
   <Route path='/course/Completedcourse' element={<Completedcourse/>}/>
</Route>
<Route path='/events' element={<Navbar/>}>

   <Route path='/events/Events' element={<Internship/>}/>
   <Route path='/events/einquiries' element={<Eventi/>}/>
   <Route path='/events/Old' element={<Old/>}/>
   <Route path='/events/Batches' element={<Batches/>}/>
  
</Route>

    </Routes>
    </BrowserRouter>

    // <div><Alerts/></div>
  )

}

export default App