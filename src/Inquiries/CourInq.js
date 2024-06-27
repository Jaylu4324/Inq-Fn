import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

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

import dayjs from "dayjs";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Alert from "@mui/material/Alert";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import axios from "axios";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Edit } from "@mui/icons-material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Form1() {
  const [value, setValue] = React.useState(0);
  const [parent, setParent] = React.useState({});

  const [data, setData] = React.useState({ Date: dayjs(), Course: [] });
  const [addcourse, setaddcourse] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [arr, setArr] = React.useState([]);
  const [reject, setReject] = React.useState([]);
  const [confirm, setconfirm] = React.useState([]);
  const [update, doUpdate] = React.useState(false);
  const [id, setId] = React.useState();
  const handleChange = (e, type) => {
    setData({ ...data, [type]: e.target.value });
  };
  const [alertSuccess, setAlertSuccess] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleopen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlechange1 = (event, newValue) => {
    setValue(newValue);
  };

  const Co = ["React", "Node", "C", "c++", "Python", "Mern Stack"];
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    let val = typeof value === "string" ? value.split(",") : value;
    setData({ ...data, Course: val });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/batchEvent/DisplayBevent")
      .then((data) => {
        // console.log("add course data received", data);

        setaddcourse(data.data.data);
      })

      .catch((err) => {
        console.log(err);
      });

    if (parent._id) {
      axios
        .get(`http://localhost:5000/inquiry/OnGoing?id=${parent._id}`)
        .then((data) => {
          console.log("data received");
          setArr(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`http://localhost:5000/inquiry/Reject?id=${parent._id}`)
        .then((data) => {
          setReject(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`http://localhost:5000/inquiry/Confirm?id=${parent._id}`)
        .then((data) => {
          setconfirm(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("parent data is not received");
    }
  }, [update, parent._id]);

  console.log("arr is setted", arr);
  const handlesubmit = () => {
    if (id) {
      axios
        .post(`http://localhost:5000/inquiry/Update?id=${id}`, data)
        .then((data1) => {
          doUpdate(!update);

          setOpen(false);
          setData({});
          setId();
          setAlertSuccess({
            open: true,
            message: "Updated Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);
          console.log("data is upfated", data1);
          // doUpdate(!update)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:5000/inquiry/addInquiry", {
          ...data,
          parentId: parent._id,
        })
        .then((data) => {
          doUpdate(!update);
          setOpen(false);
          setData({});
          setId();
          setAlertSuccess({
            open: true,
            message: "Added Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);
          console.log("data posted", data);
          console.log(parent._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  };
  // console.log("addcoursedata:", addcourse);

  const handleparent = (e) => {
    setParent({ ...e.target.value });
  };
  // console.log('parent data:',parent);

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

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4} md={2.5}>
          <Button variant="outlined" onClick={handleopen}>
            <AddIcon /> Inquiry
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="filled"
            value={data.FullName}
            onChange={(e) => {
              handleChange(e, "FullName");
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Contact"
            variant="filled"
            value={data.Contact}
            onChange={(e) => {
              handleChange(e, "Contact");
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="filled"
            value={data.Email}
            onChange={(e) => {
              handleChange(e, "Email");
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          <Box sx={{ mb: 2 }} fullWidth>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DemoContainer components={["DatePicker"]} fullWidth>
                  <DatePicker
                    slotProps={{ textField: { variant: "filled" } }}
                    label="Choose Your Date"
                    defaultValue={id ? dayjs(data.Date) : null}
                    onChange={(newval) => {
                      setData({ ...data, Date: newval });
                    }}
                    fullWidth
                  ></DatePicker>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Box>

          <TextField
            id="outlined-basic"
            label="College Name"
            value={data.CollageName}
            variant="filled"
            onChange={(e) => {
              handleChange(e, "CollageName");
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ minWidth: 120, my: 2 }} fullWidth>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Interested Course
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                fullWidth
                multiple
                value={data.Course || []}
                onChange={handleChange1}
                input={<FilledInput />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {Co.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={data.Course && data.Course.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, mb: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Follow-Up</InputLabel>
              <Select
                variant="filled"
                value={data.FollowUp}
                onChange={(e) => {
                  handleChange(e, "FollowUp");
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Interaction</InputLabel>
              <Select
                variant="filled"
                value={data.Interaction}
                onChange={(e) => {
                  handleChange(e, "Interaction");
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
              >
                <MenuItem value={"Office"}>Office</MenuItem>
                <MenuItem value={"Oncall"}>On-Call</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            variant="filled"
            label="Description"
            value={data.Description}
            id="fullWidth"
            sx={{ mb: 2 }}
            onChange={(e) => {
              handleChange(e, "Description");
            }}
          />
          <Grid container spacing={2} justifyContent="right" sx={{ mt: 0.5 }}>
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
          </Grid>
        </DialogContent>
      </Dialog>

      {alertSuccess.open ? <Alert>{alertSuccess.message}</Alert> : <div></div>}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={11}>
          <Box sx={{ mt: 2 }}>
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
                {addcourse &&
                  addcourse.map((row) => (
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

      <Box sx={{ width: "100%", ml: "10" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Grid container spacing={2} justifyContent="center" sx={{ my: 2 }}>
            <Grid item xs={4}>
              <Tabs
                value={value}
                onChange={handlechange1}
                aria-label="basic tabs example"
              >
                <Tab label="onGoing" {...a11yProps(0)} />
                <Tab label="Reject" {...a11yProps(1)} />
                <Tab label="Confirmed" {...a11yProps(2)} />
              </Tabs>
            </Grid>
          </Grid>
        </Box>

        <CustomTabPanel value={value} index={0}>
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
                    Full Name
                  </TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">College Name</TableCell>
                  <TableCell align="center">Interested Course</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Follow-Up</TableCell>
                  <TableCell align="center">Interaction</TableCell>
                  <TableCell align="center" colSpan={3}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arr.map((row) => (
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
                        
                        zIndex: 1

                      }}
                    >
                      {row.FullName}
                    </TableCell>

                    <TableCell align="center">{row.Contact}</TableCell>
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">
                      {row.Date && row.Date.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">{row.CollageName}</TableCell>
                    <TableCell align="center">{row.Course}</TableCell>
                    <TableCell align="center">{row.Description}</TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: row.FollowUp == "Yes" ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {row.FollowUp}
                    </TableCell>
                    <TableCell align="center">{row.Interaction}</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit" arrow>
                        <Button
                          onClick={() => {
                            setData(row);
                            setId(row._id);
                            setOpen(true);
                          }}
                          variant="contained"
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Delete" arrow>
                        <Button
                          onClick={() => {
                            axios
                              .post(
                                `http://localhost:5000/inquiry/RejectedInquiry?id=${row._id}`
                              )
                              .then((data) => {
                                console.log(data);
                                doUpdate(!update);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          variant="contained"
                          color="error"
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Complete" arrow>
                        <Button
                          onClick={() => {
                            axios
                              .post(
                                `http://localhost:5000/inquiry/ConfimInquiry?id=${row._id}`
                              )
                              .then((data) => {
                                doUpdate(!update);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          variant="contained"
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
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
                    Full Name
                  </TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">College Name</TableCell>

                  <TableCell align="center">Interested Course</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reject &&
                  reject.map((row) => (
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
                          zIndex: 1
                        
                        }}
                      >
                        {row.FullName}
                      </TableCell>
                      <TableCell align="center">{row.Contact}</TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">
                        {row.Date && row.Date.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{row.CollageName}</TableCell>

                      <TableCell align="center">{row.Course}</TableCell>
                      <TableCell align="center">{row.Description}</TableCell>
                      <TableCell>
                        <Tooltip title="Delete" arrow>
                          <Button
                            onClick={() => {
                              axios
                                .delete("http://localhost:5000/inquiry/Delete")
                                .then((data) => {
                                  doUpdate(!update);

                                  console.log(data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            variant="contained"
                            color="error"
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
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
                    Full Name
                  </TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">College Name</TableCell>

                  <TableCell align="center">Interested Course</TableCell>
                  <TableCell align="center">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {confirm.map((row) => (
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
                      }}
                    >
                      {row.FullName}
                    </TableCell>
                    <TableCell align="center">{row.Contact}</TableCell>
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">
                      {row.date && row.Date.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">{row.CollageName}</TableCell>

                    <TableCell align="center">{row.Course}</TableCell>
                    <TableCell align="center">{row.Description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>
    </React.Fragment>
  );
}

export default Form1;
