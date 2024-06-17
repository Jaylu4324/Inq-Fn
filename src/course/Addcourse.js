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
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FilledInput,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import axios from "axios";

function Addcourse() {
  const [open, setopen] = React.useState(false);
  const [update, doUpdate] = React.useState(false);
  const [arr, setarr] = React.useState([]);
  const[id,setid]=React.useState(0)


  const [data, setdata] = React.useState({
    StartDate: dayjs(''),
    BatchTime:dayjs(''),
    Days: [],
  });

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

  const MenuProps = {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/batchEvent/DisplayBevent")
      .then((data) => {
        setarr(data.data.data);
        console.log(data, "arrisset", arr);
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
  };

  function convertToIST(utcDateStr) {
    const date = new Date(utcDateStr);

    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false // 24-hour format

    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  
const handlesubmit=()=>{

  const url=id?`http://localhost:5000/batchEvent/UpdateBevent?id=${id}`:'http://localhost:5000/batchEvent/addBevent'
  axios.post(url,data)
  .then((data)=>{
    doUpdate(!update)
    setopen(false)
    setdata({})
    setid(null)
    console.log(data)
  })
.catch((err)=>{
  console.log(err)
})

}
console.log(data.StartDate)
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setopen(true);
            }}
          >
            Add Event
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open}>
        <DialogContent>
          <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl variant="filled" sx={{ minWidth: 500 }}>
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

          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  slotProps={{ textField: { variant: "filled" } }}
                    defaultValue={id ? dayjs(data.StartDate) : null}

                  sx={{ width: 500 }}
                  onChange={(val) => {
                    setdata({ ...data, StartDate: val });
                  }}
                ></DatePicker>
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={{ minWidth: 120, mb: 2 }} fullWidth>
            <FormControl variant="filled">
              <InputLabel id="demo-multiple-checkbox-label"> Days</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={data.Days || []}
                onChange={handleChange1}
                sx={{ width: 500 }}
                input={<FilledInput />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
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
          <box sx={{ mt: 3 }}>
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
          </box>

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
              
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
              <TableCell align="center">Course</TableCell>
              
              <TableCell align="center">Amount</TableCell>
              
              <TableCell align="center">Start Date</TableCell>
              
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Batch Time</TableCell>
              <TableCell align="center">Edit</TableCell>
              
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Completed</TableCell>
              </TableRow>
              </TableHead>
              
              {arr &&
              arr.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              <TableCell align="center">{row.Course}</TableCell>
              
              <TableCell align="center">{row.Amount}</TableCell>
              
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
              <TableCell align="center">
              <Button
                variant="contained"
              
               onClick={()=>{
                setopen(true)
                setdata(row)
                setid(row._id)
               }}
              >
              Edit
              </Button>
              
                   </TableCell>
              
              <TableCell align="center">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  axios.delete(`http://localhost:5000/batchEvent/DeleteBevent?id=${row._id}`)
                  .then((data)=>{
                    doUpdate(!update)
                      console.log('data delted',data)
                  })
                  .catch((err)=>{
                    console.log('error',err)
              
                  })
                }}
              >
              Delete
              </Button>
              
                   </TableCell>
              
                   <TableCell align="center">
              <Button
              variant="contained"
              color="success"
              onClick={() => {
                axios.post(`http://localhost:5000/batchEvent/completedBevent?id=${row._id}`)
                .then((data)=>{
                    console.log('data completed',data)
                })
                .catch((err)=>{
                  console.log('error',err)
              
                })
              }}
              >
              Completed
              </Button>
              
                  
                  
                   </TableCell>
              
              </TableRow>
              ))}
              </Table>
              </TableContainer>
              </>
              );
              }
              
              export default Addcourse;
              
