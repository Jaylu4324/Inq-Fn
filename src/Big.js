import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { Box, styled, Paper } from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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
import jwttoken from "./Token";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  function convertToIST(utcDateStr) {
    const date = new Date(utcDateStr);

    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const [date, setDate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
const[getstudent,setgetstudent]=React.useState([])
  const [day, setDay] = React.useState("");
  const [arr, setArr] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [stu, setstu] = React.useState([]);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
console.log(stu)
  const handleClose = () => {
    setOpen(() => false);
    setDate(() => "");
    setDay(() => "");
    setArr(() => []);
  };
  const handleClose1 = () => {
    setOpen1(() => false);
  };
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
console.log(getstudent)
  useEffect(() => {
    if (open) {
      setLoading(() => true);
      const dayName = getDayName(date);
      setDay(() => dayName);
      if (day) {
        axios
          .get(
            `http://localhost:5000/Dashboard/CourseData?day=${day}`,
            jwttoken()
          )
          .then((data) => {
            setLoading(() => false);
            setArr(() => data.data.data);
            console.log(data);
          })
          .catch((err) => {
            setLoading(() => false);
            console.log(err);
          });
      }
    }
  }, [date]);

  const handleSelectSlot = React.useCallback((slotInfo) => {
    const selectedDate = new Date(slotInfo.start);
    const timezoneOffset = 5.5 * 60;
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();
    const dayName = getDayName(formattedDate);
    setArr(() => []);
    setOpen(() => true);

    setDate(() => formattedDate);
    setDay(() => dayName);
  }, []);
  
  const cal = React.useMemo(
    () => (
      <Calendar
        localizer={localizer}
        selectable
        startAccessor="start"
        style={{ height: "500px" }}
        onSelectSlot={handleSelectSlot}
        views={["month"]}
      />
    ),
    []
  );
  const dialog1 = React.useMemo(
    () => (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            width: "55%", // Set the width of the dialog
            maxWidth: "none", // Remove the max-width limit
          },
        }}
      >
        <Box>
          <Grid container>
            <Grid item xs={11}></Grid>
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

          <Box>
            <DialogContent
              sx={{
                width: "100%", // Ensure the content takes up full width
                padding: 0,
              }}
            >
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            position: "sticky",
                            left: 0,
                            backgroundColor: "white",
                          }}
                        >
                          Batch Name
                        </TableCell>
                        <TableCell align="center">Start Date</TableCell>
                        <TableCell align="center">Days</TableCell>
                        <TableCell align="center">Batch Time</TableCell>
                        <TableCell align="center">Course</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            Loading batches...
                          </TableCell>
                        </TableRow>
                      ) : arr.length < 1 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No Batches For Today!
                          </TableCell>
                        </TableRow>
                      ) : (
                        arr.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
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
                            <TableCell align="center">
                              <Button
                                sx={{ color: "black" }}
                                onClick={() => {
                                  axios
                                    .get(
                                      `http://localhost:5000/Dashboard/StudentDetails?courseId=${row._id}`,
                                      jwttoken()
                                    )
                                    .then((data) => {
                                      console.log(data);
                                          if(!data.data.data==[])
                                          {
                                            console.log(data.data.data)
                                            
                                          data.data.data.map((val) => {
                                          setstu(val.StuName);
                                          setOpen1(() => true);
                                          

                                        })
                                      }
                                      else
                                      {
                                      
                                        console.log('no students')
                                      }

                                              
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                <RemoveRedEyeIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </DialogContent>
          </Box>
        </Box>
      </BootstrapDialog>
    ),
    [arr,open]
  );
  const dialog2 = React.useMemo(
    () => (
      <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <Box>
          <Grid container>
            <Grid item xs={10}></Grid>
            <IconButton
              aria-label="close"
              onClick={handleClose1}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <Box>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Student Name</TableCell>
                        <TableCell align="center">Contact</TableCell>
                      </TableRow>
                    </TableHead>

                    {stu &&
                      stu.map((row) => (
                        <TableBody>
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">{row.FullName}</TableCell>
                            <TableCell align="center">{row.Contact}</TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                  </Table>
                </TableContainer>
              </Box>
            </DialogContent>
          </Box>
        </Box>
      </BootstrapDialog>
    ),

    [open1,stu]
  );
  return (
    <div>
      {cal}
      {dialog1}
      {dialog2}
    </div>
  );
};

export default MyCalendar;
