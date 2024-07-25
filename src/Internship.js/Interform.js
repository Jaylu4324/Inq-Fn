import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AddIcon from "@mui/icons-material/Add";
import jwttoken from '../Token'

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormLabel from "@mui/material/FormLabel";

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

function Interform() {
  const [open, setopen] = React.useState(false);
  const [data, setdata] = React.useState({
    StartDate: dayjs(''),
    EndtDate: dayjs(''),
    Days: [],
  });

  const [arr, setarr] = React.useState([]);
  const [id, setid] = React.useState();
  const [update, doUpdate] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState({ open: false, message: "" });
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [alertbatchMsg, setalertbatchMsg] = React.useState({ open: false, message: "",severity:"" });
  
  const [alertSuccess, setAlertSuccess] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

 

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleChange = (e, type) => {
    if (type == "TypeOfPayment" && e.target.value == "Free") {
      setdata({ ...data, [type]: e.target.value, Amount: 0 });
    } else {
      setdata({ ...data, [type]: e.target.value });
    }
  };
  const handleClose = () => {
    setopen(false);
    setdata({});
    setid("");
  };

  const handlesubmit = (e) => {
    if (id) {
      axios
        .post(`http://localhost:5000/event/Updateevent?id=${id}`, data,jwttoken())
        .then((data) => {
          handleClose();

          doUpdate(!update);
          setAlertSuccess({
            open: true,
            message: "Updated Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);

          console.log("data is updated", data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
            // setAlertMsg(err.response.data.error.details[0].message)
            setAlertMsg({
              open: true,
              message: err.response.data.error.details[0].message,
            });
            setTimeout(() => {
              setAlertMsg("");
            }, 3000);
          }
        });
    } else {
      console.log(data);
      axios
        .post(`http://localhost:5000/event/addevent`, data,jwttoken())
        .then((data) => {
          doUpdate(!update);
          setAlertSuccess({
            open: true,
            message: "Added Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);
          console.log("Alert State is changed");
          handleClose();
          // handledelete(row);
          // setAlertMsg({
          //   open:true,
          //   message:"Data Added Successfully"
          // })

          console.log("data posted", data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
            setAlertMsg({
              open: true,
              message: err.response.data.error.details[0].message,
            });
            // setAlertMsg(err.response.data.error.details[0].message)
            setTimeout(() => {
              setAlertMsg("");
            }, 3000);
          }
        });
    }
  };

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

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/event/Displayevent",jwttoken())
      .then((data) => {
        setarr(data.data.data);
        console.log("arr is set ");
      })
      .catch((err) => {
        console.log(err);
        console.log(data);
      });
  }, [update]);

  dayjs.extend(utc);
  const handleDateChange = (val, type) => {
    const selectedDate = new Date(val);
    const timezoneOffset = 5.5 * 60; // 5.5 hours in minutes
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();

    setdata({ ...data, [type]: formattedDate });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="left">
        <Grid item xs={1} sx={{ mb: 3, mr: 1 }}>
          <Tooltip title="Add Events">
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
          <Box sx={{ minWidth: 120, mb: 2 }}>
            {alertMsg.open && (
              <Alert severity="error" sx={{ zIndex: 9999 }}>
                {alertMsg.message}
              </Alert>
            )}

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
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Type Of Event
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type Of Event"
                value={data.TypeOfEvent}
                onChange={(e) => {
                  handleChange(e, "TypeOfEvent");
                }}
              >
                <MenuItem value={"Internship"}>Internship</MenuItem>
                <MenuItem value={"Workshop"}>Workshop</MenuItem>
                <MenuItem value={"Seminar"}>Seminar</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ my: 2 }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Type Of Payment
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => {
                  handleChange(e, "TypeOfPayment");
                }}
                defaultValue={data.TypeOfPayment}
              >
                <FormControlLabel
                  value="Free"
                  control={<Radio />}
                  label="Free"
                />
                <br />
                <FormControlLabel
                  value="Paid"
                  control={<Radio />}
                  label="Paid"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {data.TypeOfPayment == "Paid" ? (
            <TextField
              id="outlined-basic"
              type="number"
              label="Amount"
              variant="filled"
              value={data.Amount}
              onChange={(e) => {
                handleChange(e, "Amount");
              }}
              fullWidth
              sx={{ mb: 2 }}
            />
          ) : null}

          <Box sx={{ mb: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  slotProps={{ textField: { variant: "filled" } }}
                  defaultValue={id ? dayjs(data.StartDate) : null}
                  sx={{ width: 500 }}
                  onChange={(val) => {
                    handleDateChange(val, "StartDate");
                  }}
                ></DatePicker>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="End Date"
                  slotProps={{ textField: { variant: "filled" } }}
                  defaultValue={id ? dayjs(data.EndtDate) : null}
                  sx={{ width: 500 }}
                  onChange={(val) => {
                    handleDateChange(val, "EndtDate");
                  }}
                ></DatePicker>
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
                  slotProps={{ textField: { variant: "filled" } }}
                  sx={{ width: 500 }}
                  defaultValue={id ? dayjs(data.BatchTime) : null}
                  fullWidth
                  onChange={(val) => {
                    setdata({ ...data, BatchTime: val });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={(event) => {
                event.stopPropagation();

                handlesubmit(event);
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      
      {alertSuccess.open && (
        <Alert severity={alertSuccess.severity}>{alertSuccess.message}</Alert>
      )}
      {alertbatchMsg.open && (
        <Alert severity={alertbatchMsg.severity}>{alertbatchMsg.message}</Alert>
      )}
      <Box sx={{ mx: 2 }}>
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
                    zIndex: 1,
                  }}
                >
                  Course
                </TableCell>
                <TableCell align="center">Type Of Event</TableCell>
                <TableCell align="center">Type Of Payment</TableCell>

                <TableCell align="center">Amount</TableCell>

                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>

                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Batch Time</TableCell>

                <TableCell align="center" colSpan={2}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: arr && arr.length < 1 ? 300 : 0 }}>
              {arr &&
                arr.map((row) => (
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
                    <TableCell align="center">{row.TypeOfEvent}</TableCell>
                    <TableCell align="center">{row.TypeOfPayment}</TableCell>

                    <TableCell align="center">{row.Amount}</TableCell>

                    <TableCell align="center">
                      {row.StartDate && row.StartDate.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      {row.EndtDate && row.EndtDate.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      {row.Days.map((val) => (
                        <Box>{val}</Box>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {row.BatchTime && convertToIST(row.BatchTime)}
                    </TableCell>

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

          
                    <TableCell>
                      <Tooltip title="Complete" arrow>
                        <Button
                          onClick={() => {
                            setid(row._id);
                            handleClickOpen2();
                          }}
                          color="success"
                        >
                          <DoneAllIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Complete Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Want To Complete Event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button
            onClick={() => {
              axios
                .post(`http://localhost:5000/event/Completed/?id=${id}`,{},jwttoken())
                .then((data) => {
                  console.log("event completed", data);
                  doUpdate(!update);
                  setAlertSuccess({
                    open: true,
                    message: "Confirmed Successfully",
                    severity: "success",
                  });
                  setTimeout(() => {
                    setAlertSuccess("");
                  }, 3000);
                  handleClose2();
              
                })
                .catch((err) => {
                  console.log(err);
                  if (err.response.data) {
                            
                    setalertbatchMsg({
                      open: true,
                      message: err.response.data.error.details[0],
                      severity: "error"
                    });
                    setTimeout(() => {
                      setalertbatchMsg("");
                    }, 3000);
                  }
                });
              
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default Interform;
