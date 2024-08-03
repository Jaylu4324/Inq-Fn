import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { Box, styled,Paper } from "@mui/material";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
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
      
  const [date, setdate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
 
  const [day, setday] = React.useState('');
  const handleClose = () => {
    setdate('')
    setday('')

    setOpen(false);
  };
  const [arr, setarr] = React.useState([]);

  function getDayName(dateString) {
   
    if (!dateString) {
      return "Invalid date";
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleDateString("en-US", { weekday: "long" });
  
}

  React.useEffect(() => {

    if (date) {
      console.log('it has date')
      const dayName = getDayName(date);
      setday(dayName);
    }
  }, [date,day]);

  React.useEffect(() => {
    if (day) {
      console.log('api called')
      axios
        .get(`http://localhost:5000/Dashboard/CourseData?day=${day}`)
        .then((data) => {
          console.log(data);
          
          setarr(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [day]);

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = new Date(slotInfo.start);

    const timezoneOffset = 5.5 * 60; // 5.5 hours in minutes
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();
    const dayName = getDayName(formattedDate);
    setdate(formattedDate);
    setday(dayName);
    setOpen(true)
  
  };

  console.log('date:',date);
  console.log('day:',day);
  console.log('state:',open)
  return (
    <div>
      <Calendar
        localizer={localizer}
        selectable
        
        startAccessor="start"
        style={{ height: "500px" }}
        onSelectSlot={handleSelectSlot}
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        <Box>
          <Grid container>
            <Grid xs={5}></Grid>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <Box
            // sx={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   fontSize: 20,
            // }}

          >
            <DialogContent>
            <Box sx={{ mx: 2, mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ position: "sticky", left: 0, backgroundColor: "white" }}
                >
                  Batch Name
                </TableCell>

                <TableCell align="center">Start Date</TableCell>

                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Batch Time</TableCell>
                <TableCell align="center">Course</TableCell>

                <TableCell align="center"  colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {
               arr.length<1?
               <TableRow>
               <TableCell colSpan={6} align="center">
                 No Batches For Today!
               </TableCell>
             </TableRow>
               
               :

            arr &&
              arr.map((row) => (
                <TableBody sx={{ height: arr && arr.length < 1 ? 200 : 0 }}>
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        position: "sticky",
                        left: 0,
                        backgroundColor: "white",
                        zIndex: 1,
                      }}
                    >
                      {row.batchName}
                    </TableCell>

                    <TableCell align="center">
                      {row.StartDate && row.StartDate.split("T")[0]}
                    </TableCell>

                    <TableCell align="center">
                      {row.Days.map((val, index) => (
                        <div key={index}>{val}</div>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {row.BatchTime && convertToIST(row.BatchTime)}
                    </TableCell>
                    <TableCell align="center">{row.Course}</TableCell>
                    {/* <TableCell align="center">
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => {

                          
                          axios
                          .get(`http://localhost:5000/Dashboard/StudentDetails?courseId=${row._id}`)
                          .then((data) => {
                            console.log(data);
                            data &&
                              data.data.data.map((val) => {
                                setstu(val.StuName);
                            
                  
                                
                              });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </Button>
                    </TableCell> */}
                    {/* <TableCell align="center">
                    <Button
                        sx={{ color: "black" }}
                        onClick={() => {
                          setstu([])
                        }}
                      >
                        <NotInterestedIcon/>
                             </Button>
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              ))
              
              
              }



          </Table>
        </TableContainer>
      </Box>


            </DialogContent>
          </Box>
        </Box>
      </BootstrapDialog>
    </div>
  );
};

export default MyCalendar;
