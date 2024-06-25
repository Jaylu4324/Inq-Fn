import * as React from 'react';
import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import axios from 'axios';
const columns = [
  { field: 'name', headerName: 'Name', width: 160, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },

];

export default function BasicColumnPinning() {
  
  const[arr,setarr]=React.useState([])

  const[update,doupdate]=React.useState(false)
  React.useEffect(()=>{
axios.get(('http://localhost:5000/event/Completedevent'))
.then((data)=>{
let correct=data.data.data.map((item)=>{
  
return item
})
console.log('coreect',correct)
setarr(correct)
})
.catch((err)=>{
 console.log(err)
})

  },[update])
console.log(arr)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        rows={arr} // Add your rows data here

        columns={columns}
        initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
      />
    </div>
  );
}
  
// function convertToIST(utcDateStr) {
//   const date = new Date(utcDateStr);

//   const options = {
//     timeZone: "Asia/Kolkata",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     // hour12: false // 24-hour format
//   };

//   return new Intl.DateTimeFormat("en-US", options).format(date);
// }

//    const[arr,setarr]=React.useState([])

//    const[update,doupdate]=React.useState(false)
//    React.useEffect(()=>{
// axios.get(('http://localhost:5000/event/Completedevent'))
// .then((data)=>{
// console.log('data r')
// setarr(data.data.data)
// console.log('arr is set')
// })
// .catch((err)=>{
//   console.log(err)
// })

//    },[update])
//   return (
// <>

// <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center">Course</TableCell>
//                   <TableCell align="center">Type Of Event</TableCell>
//                   <TableCell align="center">Type Of Payment</TableCell>
                
//                   <TableCell align="center">Amount</TableCell>
                  
//                   <TableCell align="center">Start Date</TableCell>
//                   <TableCell align="center">End Date</TableCell>
                  
//                   <TableCell align="center">Days</TableCell>
//                   <TableCell align="center">Batch Time</TableCell>
                  
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
//                   <TableCell align='center'>Delete</TableCell>
                  
                  
                  
                  
// </TableRow>
                  
//               </TableHead>

//               { arr && arr .map((row) => (
//                   <TableRow
//                     key={row.name}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell align="center">{row.Course}</TableCell>
//                     <TableCell align="center">{row.TypeOfEvent}</TableCell>
//                     <TableCell align="center">{row.TypeOfPayment}</TableCell>
                
//                     <TableCell align="center">{row.Amount}</TableCell>
                    
//                     <TableCell align="center">{row.StartDate&&row.StartDate.split('T')[0]}</TableCell>
//                     <TableCell align="center">{row.EndtDate&&row.EndtDate.split('T')[0]}</TableCell>
//                     <TableCell align="center">{row.Days.map((val)=>(

//                       <TableCell align="center">{val}</TableCell>
                    
//                     ))}</TableCell>
//                     <TableCell align="center">{row.BatchTime && convertToIST(row.BatchTime)}</TableCell>
//                     <TableCell align='center'>
//                     <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => {
//                       axios.delete(`http://localhost:5000/event/Deleteevent?id=${row._id}`)
//                       .then((data)=>{
//                         doupdate(!update)
//                           console.log('data delted',data)
//                       })
//                       .catch((err)=>{
//                         console.log('error',err)

//                       })
//                     }}
//                   >
//                     Delete
//                   </Button>
                  
                      
                      
//                        </TableCell>
//                     </TableRow>
// ))}
// </Table>
// </TableContainer>
