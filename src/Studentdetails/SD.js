import React, { useEffect } from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, FilledInput } from '@mui/material';
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Tooltip from "@mui/material/Tooltip";

import dayjs from "dayjs";
import { styled } from "@mui/material/styles";


import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

function SD() {
  const [id, setId] = React.useState();
  const [data, setData] = React.useState({
    
    Date: dayjs(),
    btime: "",
    days: [],
  });
  const [arr, setarr] = React.useState([]);
  const [update, doupdate] = React.useState(false);
  const[coursearr,setcoursearr]=React.useState([])
  const [parent, setParent] = React.useState({});
  const [alertSuccess, setAlertSuccess] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  };

  const days = [
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
    setData({ ...data, days: val });
  };

  
  const handleparent = (e) => {
    setParent({ ...e.target.value });
  };
console.log(parent)
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [open, setOpen] = React.useState(false);

  const handlechange = (e, type) => {
    setData({ ...data, [type]: e.target.value });
  };
  React.useEffect(() => {
    axios.get('http://localhost:5000/batchEvent/DisplayBevent')
    .then((data)=>{
    
    setcoursearr(data.data.data)
    console.log('arr is set')
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log(coursearr)
    if(parent._id){
    axios
      .get(`http://localhost:5000/student/allStuden?id=${parent._id}`)
      .then((data) => {
        setarr(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [parent,update]);

  const handlesubmit = () => {
    if (id) {
      axios
        .post(`http://localhost:5000/student/UpdateStu?id=${id}`, data)
        .then((data) => {
          console.log(data);
          doupdate(!update);
          setAlertSuccess({
            open: true,
            message: "Updated Successfully",
            severity: "success",
          });
          setTimeout(()=>{
            setAlertSuccess("");
          },3000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:5000/student/stuadd",{...data,CourseId:parent._id})
        .then((data) => {
          console.log("data posted", data);
          doupdate(!update);
          setAlertSuccess({
            open: true,
            message: "Added Successfully",
            severity: "success",
          });
          setTimeout(()=>{
            setAlertSuccess("");
          },3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setOpen(!open);
  };

  const handleFileUpload = (event) => {
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
      baseString = reader.result;
      setData({ ...data, baseString });
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const handleopen = () => {
    setOpen(!open);
  };
  const handledelete = (row) => {
    axios
      .delete(`http://localhost:5000/student/deleteStu?id=${row._id}`)
      .then((data) => {
        console.log("data deleted", data);
        doupdate(!update);
        setAlertSuccess({
          open: true,
          message: "Deleted Successfully",
          severity: "success",
        });
        setTimeout(()=>{
          setAlertSuccess("");
        },3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleupdate = (row) => {
    setData(row);

    setId(row._id);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="end">
        <Grid item xs={2} sx={{ mb: 3, mr: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              handleopen();
            }}
          >
            Add Student
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
          },
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Full Name"
            value={data.Name}
            variant="filled"
            id="fullWidth"
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "Name");
            }}
          />
          <TextField
            type="number"
            id="outlined-basic"
            label="Contact Info"
            variant="filled"
            value={data.Contact}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "Contact");
            }}
          />
          <TextField
            type="number"
            id="outlined-basic"
            label=" Parent Contact Info"
            variant="filled"
            value={data.Parentcontact}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "Parentcontact");
            }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="filled"
            value={data.Email}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "Email");
            }}
          />

          <TextField
            id="outlined-basic"
            label="College Name"
            variant="filled"
            value={data.CollegeName}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "CollegeName");
            }}
          />
          <TextField
            id="outlined-basic"
            label="Academic Course"
            variant="filled"
            value={data.AcademicCourse}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "AcademicCourse");
            }}
          />

          <TextField
            id="outlined-basic"
            label="Total Fees"
            type="Number"
            value={data.Tfees}
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "Tfees");
            }}
          />
         

         <Box sx={{mb: 2 }}>
            <FormControl variant="filled" sx={{width:530}}>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Course"
                value={data.course}
                onChange={(e) => {
                  handlechange(e, "course");
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
          
          <Box sx={{ my: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["DatePicker"]} fullWidth>
                <DatePicker
                  label="Choose Your Date"
                  slotProps={{ textField: { variant: "filled" } }}
                  onChange={(newval) => {
                    setData({ ...data, Date: newval });
                  }}
                  defaultValue={id ? dayjs(data.Date) : null}
                  sx={{ width: 530 }}
                  fullWidth
                ></DatePicker>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <box sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["TimePicker"]} fullWidth>
                <TimePicker
                  label="Batch Timings"
                  defaultValue={id ? dayjs(data.btime) : null}
                  slotProps={{ textField: { variant: "filled" } }}
                  sx={{ width: 530 }}
                  fullWidth
                  onChange={(val) => {
                    setData({ ...data, btime: val });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </box>

          <Box>
            <FormControl variant="filled" sx={{ width: 260, mt: 3 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Batch days
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={data.days || []}
                onChange={handleChange1}
                sx={{ width: 530 }}
                fullWidth
                input={<FilledInput/>}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {days.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={data.days.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4} sx={{ mb: 2, mt: 2 }}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 1 }}
              >
                Aadhar Card
                <VisuallyHiddenInput type="file" onChange={(e)=>{handleFileUpload(e)}} />
              </Button>
              <img src={data.baseString} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(!open);
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
      </Dialog>
      {alertSuccess.open  ? (
        <Alert>{alertSuccess.message}</Alert>
      ) : (
        <div></div>
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={11}>
          <Box sx={{ my: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {" "}
                Select Course
              </InputLabel>
              <Select
              onChange={(e) => {
                handleparent(e);
              }}
              
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                variant="filled"

                // sx={{fullWidth}}
              >
                {coursearr &&
                  coursearr.map((row) => (
                    <MenuItem value={row}>
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.Course}</TableCell>
                        <TableCell align="center">{row.Amount}</TableCell>

                        <TableCell align="center">{row.Days}</TableCell>

                        <TableCell align="center">
                          {row.StartDate && row.StartDate.split("T")[0]}
                        </TableCell>
                        <TableCell align="center">
                          {row.BatchTime && convertToIST(row.BatchTime)}
                        </TableCell>
                      </TableRow>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mx: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650, mx: 3 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"
                                   sx={{
                                    position: "sticky",
                                    left: 0,
                                    backgroundColor: "white",
                                    zIndex: 1,
                                    
                                  }}
                >Student Name</TableCell>
                <TableCell align="center">Contact</TableCell>
                <TableCell align="center">Parent Contact</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">College Name</TableCell>
                <TableCell align="center">Academic Course</TableCell>

                <TableCell align="center">Interested Course</TableCell>
                <TableCell align="center">Total Fees</TableCell>
                <TableCell align="center">Paid Fees</TableCell>

                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Batch Days</TableCell>
                <TableCell align="center">Batch Timing</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arr &&
                arr.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center"
                                       sx={{
                                        position: "sticky",
                                        left: 0,
                                        backgroundColor: "white",
                                        zIndex: 1,
                                      }}
                    
                    >{row.Name}</TableCell>
                    <TableCell align="center">{row.Contact}</TableCell>
                    <TableCell align="center">{row.Parentcontact}</TableCell>
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">{row.CollegeName}</TableCell>
                    <TableCell align="center">{row.AcademicCourse}</TableCell>

                    <TableCell align="center">{row.course}</TableCell>
                    <TableCell align="center">{row.Tfees}</TableCell>
                    <TableCell align="center">{row.Pfees}</TableCell>

                    <TableCell align="center">
                      {row.Date && row.Date.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">{row.days}</TableCell>
                    <TableCell align="center">
                      {row.btime && convertToIST(row.btime)}
                    </TableCell>

                    <TableCell align="center">
                    <Tooltip title="Edit" arrow>
                    
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleupdate(row);
                        }}
                      >
                        <EditIcon/>
                      </Button>
                    </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                    <Tooltip title="Delete" arrow>
                    
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handledelete(row);
                        }}
                      >
                        <DeleteIcon/>
                      </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
}

export default SD;
