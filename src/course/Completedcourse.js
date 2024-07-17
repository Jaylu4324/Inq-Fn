import React from 'react'

import axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
function convertToIST(utcDateStr) {
  const date = new Date(utcDateStr);

  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // hour12: false // 24-hour format
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default function Completedcourse() {
  const [arr, setarr] = React.useState([]);

  const [update, doupdate] = React.useState(false);
  React.useEffect(() => {
    console.log('hi')
    axios
      .get("http://localhost:5000/batchEvent/displaycompletedBevent")
      .then((data) => {
        console.log("data",data);
        setarr(data.data.getcompleted);
        console.log("arr is set");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
console.log(arr)
  return (
    <>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{ position: "sticky", left: 0, backgroundColor: "white", zIndex: 1,
              }}

            >
              Course
            </TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Days</TableCell>
            <TableCell align="center">Batch Timings</TableCell>

       
         
            <TableCell align="center">Batch Name</TableCell>

            <TableCell align="center">
              Actions
            </TableCell>

          </TableRow>
        </TableHead>

        {arr &&
          arr.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ position: "sticky", left: 0, backgroundColor: "white", zIndex: 1,
                }}

              >
                {row.Course}
              </TableCell>
       
              <TableCell align="center">
                {row.StartDate && row.StartDate.split("T")[0]}
              </TableCell>
             
              <TableCell align="center">
                {row.Days.map((val) => (
                 <Box>{val}</Box>
                ))}
              </TableCell>
              <TableCell align="center">
                {row.BatchTime && convertToIST(row.BatchTime)}
              </TableCell>
              <TableCell align="center">{row.batchName}</TableCell>

          
             
              <TableCell align="center">
                <Tooltip title="Get Students" arrow>

                 <Button
                 
                    color="success"
                   
                  >
                    <RemoveRedEyeIcon/>
                  </Button> 
                </Tooltip>

              </TableCell>

            </TableRow>
          ))}
      </Table>
    </TableContainer>
  </>
  )
}
