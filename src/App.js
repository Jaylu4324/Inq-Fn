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
function App() {
  return (
    <BrowserRouter>
    <Routes>
<Route path='/dashBoard' element={<Navbar/>}>
<Route path='/dashBoard/' element={<>hello</>}/>
  <Route path='/dashBoard/Invoice' element={<Invoice/>}/>
   <Route path='/dashBoard/CourInq' element={<CourInq/>}/>
   <Route path='/dashBoard/Studentdetails' element={<Studentdetails/>}/>
   <Route path='/dashBoard/Events' element={<Internship/>}/>
   <Route path='/dashBoard/einquiries' element={<Eventi/>}/>
   <Route path='/dashBoard/Old' element={<Old/>}/>
   <Route path='/dashBoard/Batches' element={<Batches/>}/>
   <Route path='/dashBoard/Add Course' element={<Addcourse/>}/>
   <Route path='/dashBoard/Batch-For-Course' element={<Batchcourse/>}/>

   <Route path='/dashBoard/Completedcourse' element={<Completedcourse/>}/>

</Route>

    </Routes>
    </BrowserRouter>

    // <div><Alerts/></div>
  )

}

export default App