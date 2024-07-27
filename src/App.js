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
import { Navigate } from 'react-router-dom'
function App() {
  const Privateroute=(props)=>{
console.log(props)
   
      const gettoken=localStorage.getItem('token')
      
  if(gettoken){
    return props.children
  }
    else{  
      return <Navigate to='/'/>
    }}
  
  



  return (
    <BrowserRouter>
    <Routes>
      
<Route path='/' element={<Login/>}/>      
<Route path='/dashBoard' element={<Privateroute><Navbar/></Privateroute>}>

<Route path='/dashBoard/dashBoard' element={<Privateroute><Dashboard/></Privateroute>}/>
</Route>
<Route path='/course' element={<Privateroute><Navbar/></Privateroute>}>

<Route path='/course/Invoice' element={<Privateroute><Invoice/></Privateroute>}></Route>
   <Route path='/course/CourInq' element={<Privateroute><CourInq/></Privateroute>}></Route>
   <Route path='/course/Studentdetails' element={<Privateroute><Studentdetails/></Privateroute>}></Route>
 
  
   <Route path='/course/AddCourse' element={<Privateroute><Addcourse/></Privateroute>}></Route>
   <Route path='/course/Batch-For-Course' element={<Privateroute><Batchcourse/></Privateroute>}></Route>
   <Route path='/course/Completedcourse' element={<Privateroute><Completedcourse/></Privateroute>}></Route>
</Route>
<Route path='/events' element={<Privateroute><Navbar/></Privateroute>}>

   <Route path='/events/Events' element={<Privateroute><Internship/></Privateroute>}></Route>
   <Route path='/events/einquiries' element={<Privateroute><Eventi/></Privateroute>}></Route>
   <Route path='/events/Old' element={<Privateroute><Old/></Privateroute>}></Route>
   <Route path='/events/Batches' element={<Privateroute><Batches/></Privateroute>}></Route>
</Route>

    </Routes>
    </BrowserRouter>

//     // <div><Alerts/></div>
//     <Route path='/login' element={<Login text='Dashboard'/>}/>      
// <Route path='/dashBoard' element={<Navbar text="123"/>}>


  )

}

export default App