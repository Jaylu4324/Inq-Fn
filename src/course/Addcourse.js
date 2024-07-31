import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";


import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import Tooltip from "@mui/material/Tooltip";
import utc from "dayjs/plugin/utc";
import AddIcon from "@mui/icons-material/Add";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FilledInput,
  TableBody,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import jwttoken from "../Token";
import { Snackbar, Alert } from '@mui/material';


import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import axios from "axios";

function Addcourse() {
  
  const [data, setdata] = React.useState({
    StartDate: dayjs(''),
    BatchTime: dayjs(""),
    Days: [],
  });

  const [open, setopen] = React.useState(false);
  const [update, doUpdate] = React.useState(false);

  const [arr, setarr] = React.useState([]);

  const [open2, setOpen2] = React.useState(false);

  const [id, setid] = React.useState();

  const [alertMsg, setAlertMsg] = React.useState({ open: false, message: "" });
  const [alertbatchMsg, setalertbatchMsg] = React.useState({
    open: false,
    message: "",
    
  });

  const [alertSuccess, setAlertSuccess] = React.useState({
    open: false,
    message: "",
  });

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setdata({});
    setid("");
  };
console.log(data)

  const DaysArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    let val = typeof value === "string" ? value.split(",") : value;
    setdata({ ...data, Days: val });
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const menuprops = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/batchEvent/DisplayBevent", jwttoken())
      .then((data) => {
        setarr(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
  const handleChange = (e, type) => {
    setdata({ ...data, [type]: e.target.value });
  };
  
  const handleClose = () => {
    setopen(false);
    setid("");
    setdata({});
  };

  function convertToIST(utcDateStr) {
    const date = new Date(utcDateStr);

    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const handlesubmit = () => {
    const url = id
      ? `http://localhost:5000/batchEvent/UpdateBevent?id=${id}`
      : "http://localhost:5000/batchEvent/addBevent";
    axios
      .post(url, data, jwttoken())
      .then((data) => {
        doUpdate(!update);

        handleClick1({ vertical: "top", horizontal: "center" });

        setAlertSuccess({
          open: true,

          message:
            id == undefined
              ? "Batch Added Successfully"
              : "Batch Updated Successfully",
        });


        setopen(false);
        setdata({});
        setid("");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);

        if (err.response.data) {
          handleClick1({ vertical: "top", horizontal: "center" });
          
          
          setAlertMsg({
            open: true,
            message: err.response.data.error.details[0].message,
          });
        }
      });
  };
  
  dayjs.extend(utc);
  const handleDateChange = (val) => {
    const selectedDate = new Date(val);
    console.log(val)
    const timezoneOffset = 5.5 * 60; // 5.5 hours in minutes
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();

    setdata({ ...data, StartDate: formattedDate });
  };

  const [state, setState] = React.useState({
    open1: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open1 } = state;

  const handleClick1 = (newState) => {
    setState({ ...state, open1: true });
  };
  
  const handleClose1 = () => {
    setState({ ...state, open1: false });
    setAlertSuccess({ ...alertSuccess, open: false });
    setAlertMsg({ ...alertMsg, open: false });
    setalertbatchMsg({...alertbatchMsg,open:false})
  };

  return (
    <>
      <Snackbar
        open={open1}
        autoHideDuration={3000}
        onClose={handleClose1}
        anchorOrigin={{ vertical, horizontal }}
        
      >
          {(alertSuccess.open || alertMsg.open || alertbatchMsg.open) && (
    <Alert
      onClose={handleClose1}
      severity={alertSuccess.open ? "success" : alertMsg.open?"error": alertbatchMsg.open?'error':null}
                // alertSuccess.open? "success": alertMsg.open? "error": alertInfo.open? "info": "info"\

      variant="filled"
      sx={{ width: "100%" }}
    >
      {alertSuccess.open ? alertSuccess.message : alertMsg.open?alertMsg.message:alertbatchMsg.open?alertbatchMsg.message:null}
    </Alert>
  )}
      </Snackbar>

      <Grid container spacing={2} justifyContent="left">
        <Grid item xs={1} sx={{ mb: 3, mr: 3 }}>
          <Tooltip title="Add Batch" arrow>
            <Button
              onClick={() => {
                setopen(true);
              }}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <Dialog open={open}>
        <DialogContent>
          <Box sx={{ minWidth: 120, mb: 1 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Course"
                value={data.Course}
                onChange={(e) => {
                  handleChange(e, "Course");
                }}
              >
                <MenuItem value={"React"}>React</MenuItem>
                <MenuItem value={"Node"}>Node</MenuItem>
                <MenuItem value={"AWS"}>AWS</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"C++"}>C++</MenuItem>
                <MenuItem value={"Python"}>Python</MenuItem>
                <MenuItem value={"Mern"}>Mern</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  slotProps={{ textField: { variant: "filled", error: false } }}
                  defaultValue={id ? dayjs(data.StartDate) : null}
                  
                  sx={{ width: 500 }}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={{ minWidth: 120, mb: 1 }} fullWidth>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-multiple-checkbox-label"> Days</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={data.Days || []}
                onChange={handleChange1}
                fullWidth
                input={<FilledInput />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={menuprops}

              >
                {DaysArr.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={data.Days && data.Days.indexOf(name) > -1}
                    />

                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["TimePicker"]} fullWidth>
                <TimePicker
                  label="Batch Timings"
                  slotProps={{ textField: { variant: "filled", error: false } }}
                  sx={{ width: 500 }}
                  defaultValue={id ? dayjs(data.BatchTime) : null}
                  // value={id ? dayjs(data.StartDate) : null}

                  fullWidth
                  onChange={(val) => {
                    setdata({ ...data, BatchTime: val });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <TextField
            id="outlined-basic"
            label="Batch Name"
            variant="filled"
            value={data.batchName}
            onChange={(e) => {
              handleChange(e, "batchName");
            }}
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />

          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handlesubmit();
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      
      <Box sx={{ mx: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ position: "sticky", left: 0, backgroundColor: "white" }}
                >
                  Course
                </TableCell>

                <TableCell align="center">Start Date</TableCell>

                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Batch Time</TableCell>
                <TableCell align="center">Batch Name</TableCell>

                <TableCell align="center" colSpan={2}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {arr &&
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
                      {row.Course}
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
                    <TableCell align="center">{row.batchName}</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit" arrow>
                        <Button
                          onClick={() => {
                            setopen(true);
                            setdata(row);
                            setid(row._id);
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Complete" arrow>
                        <Button
                          color="success"
                          onClick={() => {
                            setid(row._id);
                            handleClickOpen2();
                          }}
                        >
                          <DoneAllIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
      </Box>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Complete Batch"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Want To to complete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button
            onClick={() => {
              axios
                .post(
                  `http://localhost:5000/batchEvent/completedBevent?id=${id}`,
                  {},
                  jwttoken()
                )
                .then((data) => {
                  doUpdate(!update);
                  handleClick1({ vertical: "top", horizontal: "center" });
        
                  setAlertSuccess({
                    open: true,
                    message: "Completed Successfully",
                    severity: "success",
                  });
                  handleClose2();
                  
                  console.log("data completed", data);
                })
                .catch((err) => {
                  console.log("error", err);
                  if (err.response.data) {
                    handleClick1({ vertical: "top", horizontal: "center" });
        
                    setalertbatchMsg({
                      open: true,
                      message: err.response.data.error.details[0],
                      
                    });
                    

                  }
                });
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Addcourse;
