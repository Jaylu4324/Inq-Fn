import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Menu from "@mui/material/Menu";

import SortIcon from "@mui/icons-material/Sort";

import SearchIcon from "@mui/icons-material/Search";

import Tooltip from "@mui/material/Tooltip";

import utc from "dayjs/plugin/utc";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import axios from "axios";

import Paper from "@mui/material/Paper";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

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

function Eventi() {

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

  const [parent, setParent] = React.useState({});

  const [value, setValue] = React.useState(0);

  const [data, setData] = React.useState({ Date: dayjs("") });
  const [open, setOpen] = React.useState(false);
  const [arr, setArr] = React.useState([]);
  const [ong, setong] = React.useState([]);

  const [reject, setReject] = React.useState([]);
  const [confirm, setconfirm] = React.useState([]);
  const [update, doUpdate] = React.useState(false);
  
  const [alertMsg, setAlertMsg] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [deleteId, setDeleteId] = React.useState("");

  const [id, setId] = React.useState(0);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleChange = (e, type) => {
    setData({ ...data, [type]: e.target.value });
  };
  const handlesubmit = () => {
    if (id) {
      axios
        .post(`http://localhost:5000/Eventinquiry/Update?id=${id}`, data)
        .then((data) => {
          doUpdate(!update);
          setAlertSuccess({
            open: true,
            message: "Updated Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
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
      axios
        .post("http://localhost:5000/Eventinquiry/addInquiry", {
          ...data,
          eventId: parent._id,
        })
        .then((data) => {
          console.log(data);
          doUpdate(!update);
          setAlertSuccess({
            open: true,
            message: "Added Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);

          handleClose();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
            setAlertMsg({
              open: true,
              message: err.response.data.error.details[0].message,
            });

            setTimeout(() => {
              setAlertMsg("");
            }, 3000);
          }
        });
    }
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/event/Displayevent")
      .then((data) => {
        setArr(data.data.data);
        console.log("arr is set ");
      })
      .catch((err) => {
        console.log(err);
        console.log(data);
      });

    if (parent._id) {
      axios
        .get(`http://localhost:5000/Eventinquiry/OnGoing?id=${parent._id}`)

        .then((data) => {
          setong(data.data.data);
          console.log("ongoing data");
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`http://localhost:5000/Eventinquiry/Reject?id=${parent._id}`)

        .then((data) => {
          setReject(data.data.data);
          console.log("reject is set");
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`http://localhost:5000/Eventinquiry/Confirm?id=${parent._id}`)

        .then((data) => {
          setconfirm(data.data.data);
          console.log("confirm is set");
        })
        .catch((err) => {
          console.log(err);
          // if (err.response.data) {
          //   setAlertMsg({
          //     open: true,
          //     message: err.response.data.error.details[0].message,
          //   });
            
          //   setTimeout(() => {
          //     setAlertMsg("");
          //   }, 3000);
          // }

        });
    }
  }, [update, parent._id]);

  const handleopen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
    setData({});
    setId();
  };
  const handlechange1 = (event, newValue) => {
    setValue(newValue);
  };

  const handleparent = (e) => {
    setParent({ ...e.target.value });
  };
  
  dayjs.extend(utc);
  const handleDateChange = (val, type) => {
    const selectedDate = new Date(val);
    const timezoneOffset = 5.5 * 60;
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();

    setData({ ...data, Date: formattedDate });
  };

  const [type, settype] = React.useState("");
  const [searchname, setseearchname] = React.useState("");
  const handlesearchname = (e) => {
    setseearchname(e.target.value);
  };
  console.log(searchname);

  console.log(value);
  React.useEffect(() => {
    if (value == 0) {
      settype("onGoing");
    } else if (value == 1) {
      settype("Reject");
    } else {
      settype("Confirm");
    }
  }, [value]);
  console.log(type);

  const [order, setorder] = React.useState(1);

  const [order1, setorder1] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openmenu = Boolean(anchorEl);
  const handleClickmenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosemenu = () => {
    setAnchorEl(null);
  };
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const openmenu1 = Boolean(anchorEl1);
  const handleClickmenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClosemenu1 = () => {
    setAnchorEl1(null);
  };
  console.log('ong:',ong);
  console.log('reject:',reject);
  console.log('confirm:',confirm);

  const montharr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthname = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [open2, setOpen2] = React.useState(false);
  
  const [open3, setOpen3] = React.useState(false);
  
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
      <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start", // Adjusted for right alignment
            alignItems: "flex-start",
          }}
        >
          <Box sx={{display:'flex',mt:1}}>
          <div>
          <Tooltip title="Add Event Inquiries">
            <Button onClick={handleopen} disabled={parent._id ? false : true}>
              <AddIcon />
            </Button>
          </Tooltip>
          </div>
          <div>
            <Tooltip title="Filter" arrow>
              <Button
                id="basic-button"
                aria-controls={openmenu1 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openmenu1 ? "true" : undefined}
                onClick={handleClickmenu1}
              >
                <FilterAltIcon sx={{ color: "#0063cc" }} />
              </Button>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl1}
              open={openmenu1}
              onClose={handleClosemenu1}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {montharr.map((val, index) => (
                <MenuItem
                  onClick={() => {
                    console.log("clicked1");

                    axios
                      .get(
                        `http://localhost:5000/Eventinquiry/filterbyMonth?month=${montharr[index]}&sortby=${order1}&type=${type}`)
                      .then((data) => {
                        console.log(data)
                        if(type=='onGoing')
                          {
                            setong(data.data)
                            setorder1(order1 === 1 ? -1 : 1);
                          }
                          else if(type=='Reject')
                          {
                            setReject(data.data)
                            setorder1(order1 === 1 ? -1 : 1);
                          }
                          else{
                            setconfirm(data.data)
                            setorder1(order1 === 1 ? -1 : 1);
                          }
                     

                      
                      })
                      .catch((error) => {
                        console.error("API Request Error:", error);
                      });

                    handleClosemenu1();
                  }}
                >
                  {monthname[index]}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div>
            <Tooltip title="Sort" arrow>
              <Button
                id="basic-button"
                aria-controls={openmenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openmenu ? "true" : undefined}
                onClick={handleClickmenu}
              >
                <SortIcon sx={{ color: "#0063cc" }} />
              </Button>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openmenu}
              onClose={handleClosemenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
              axios.get(`http://localhost:5000/Eventinquiry/alldata?key=${type}`)
              .then((data) => {
                console.log(data)
                if(type=='onGoing')
                  {
                    setong(data.data.allData)
                   
                  }
                  else if(type=='Reject')
                  {
                    setReject(data.data.allData)
                
                  }
                  else{
                    setconfirm(data.data.allData)
                  
                  }
              
              })
              .catch((error) => {
                console.error("API Request Error:", error);
              });
                  handleClosemenu();
                }}
              >
                All
              </MenuItem>

              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/Eventinquiry/sortby?eventId=${parent._id ? parent._id : ""}&key=Date&sortBy=${order}&type=${type}`)
                      .then((data) => {
                        console.log(data)
                        if(type=='onGoing')
                          {
                            setong(data.data.sortData)
                            setorder(order == 1 ? -1 : 1);
                          }
                          else if(type=='Reject')
                          {
                            setReject(data.data.sortData)
                            setorder(order == 1 ? -1 : 1);
                          }
                          else{
                            setconfirm(data.data.sortData)
                            setorder(order == 1 ? -1 : 1);
                          }
                      
                      })
                      .catch((error) => {
                        console.error("API Request Error:", error);
                      });
                  handleClosemenu();
                  
                }}
              >
                Sort By Date
              </MenuItem>
              <MenuItem
                 onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/Eventinquiry/sortby?eventId=${parent._id ? parent._id : ""}&key=FullName&sortBy=${order}&type=${type}`)
                      .then((data) => {
                        console.log(data)
                        if(type=='onGoing')
                          {
                            setong(data.data.sortData)
                            setorder(order == 1 ? -1 : 1);
                          }
                          else if(type=='Reject')
                          {
                            setReject(data.data.sortData)
                            setorder(order == 1 ? -1 : 1);
                          }
                          else{
                            setconfirm(data.data.sortData)
                            setorder(order == 1 ? -1 : 1);
                          }
                      
                      })
                      .catch((error) => {
                        console.error("API Request Error:", error);
                      });
                  handleClosemenu();
                  
                }}
              >
                Sort By Name
              </MenuItem>
            
            </Menu>
          </div>
          </Box>
        </Grid>
      
        <Grid item xs={12} sm={5}>
          <Box sx={{ mx: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {" "}
                Select Event Type
              </InputLabel>
              <Select
                onChange={(e) => {
                  handleparent(e);
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                renderValue={(data)=>{return (parent._id && data.Course || '')}}
                sx={{
                  height:50,
                  borderRadius: "16px",
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: '2px solid #0063cc', // Default border color
                    },
                    '&:hover fieldset': {
                      border: '2px solid #0063cc', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #0063cc', // Border color when focused
                    },
                  },
                }}
              >
                {arr &&
                  arr.map((row) => (
                    <MenuItem value={row}>
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.Course}</TableCell>

                        <TableCell align="center">{row.TypeOfEvent}</TableCell>
                        <TableCell align="center">
                          {row.TypeOfPayment}
                        </TableCell>

                        <TableCell align="center">{row.Amount}</TableCell>

                        <TableCell align="center">
                          {row.StartDate && row.StartDate.split("T")[0]}
                        </TableCell>
                        <TableCell align="center">
                          {row.EndtDate && row.EndtDate.split("T")[0]}
                        </TableCell>
                        <TableCell align="center">
                          {row.Days.map((val) => (
                            <TableCell align="center">{val}</TableCell>
                          ))}
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
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 400, ml: 3 }}>
            <TextField
              value={searchname}
              id="filled-hidden-label-small"
              placeholder="Search Students..."
              variant="filled"
              size="small"
              onChange={handlesearchname}
              sx={{
                width: "100%",
                maxWidth: 400,
                "& .MuiFilledInput-root": {
                  borderRadius: "16px",
                  border: "2px solid #0063cc",
                  backgroundColor: "white",
                  padding: "0 16px", // Ensure background color is consistent
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white",
                  },
                  "& input": {
                    padding: "12px 0", // Adjust vertical padding to center text
                    // Center the text horizontally
                  },
                },
                "& .MuiFilledInput-underline:before": {
                  borderBottom: "none", // Remove the default underline before focus
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottom: "none", // Remove the default underline after focus
                },
                "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none", // Remove underline on hover
                },
              }}
            />
          </Box>
          <Tooltip title="Search" arrow>
            <Button sx={{ color: "#0063cc" }}>
              <SearchIcon
              onClick={() => {
                axios
                  .get(
                    `http://localhost:5000/Eventinquiry/search?FullName=${searchname}&type=${type}`
                  )
                  .then((data) => {
                    console.log(data);
                    if(type=='onGoing')
                    {
                      setong(data.data.filterdata)
                      
                    }
                    else if(type=='Reject')
                    {
                      setReject(data.data.filterdata)
                    }
                    else{
                      setconfirm(data.data.filterdata)
                    }
                    console.log('coorect')
                    setseearchname("");

                  })
              .catch((err)=>{
                console.log(err)
              })
            }}

              />
            </Button>
          </Tooltip>
        </Grid>
       
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {alertMsg.open && (
            <Alert severity="error" sx={{ zIndex: 9999 }}>
              {alertMsg.message}
            </Alert>
          )}

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
              console.log(e);
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
            sx={{ mb: 1 }}
          />

          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["DatePicker"]} fullWidth>
                <DatePicker
                  label="Choose Your Date"
                  defaultValue={id ? dayjs(data.Date) : null}
                  sx={{ width: 533 }}
                  slotProps={{ textField: { variant: "filled" } }}
                  onChange={handleDateChange}
                  fullWidth
                ></DatePicker>
              </DemoContainer>
            </LocalizationProvider>
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

          <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Follow-Up</InputLabel>
              <Select
                value={data.FollowUp}
                variant="filled"
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
                value={data.Interaction}
                variant="filled"
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
            label="Description"
            value={data.Description}
            variant="filled"
            id="fullWidth"
            sx={{ mb: 2 }}
            onChange={(e) => {
              handleChange(e, "Description");
            }}
          />
          <Button
            onClick={() => {
              handleClose();
            }}
            sx={{ ml: 45 }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handlesubmit();
            }}
          >
            Submit
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Tabs
            value={value}
            onChange={handlechange1}
            aria-label="basic tabs example"
          >
            <Tab label="onGoing" {...a11yProps(0)} />
            <Tab label="Reject" {...a11yProps(1)} />
            <Tab label="Confirmed" {...a11yProps(2)} />
          </Tabs>
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
                      zIndex: 1,
                    }}
                  >
                    Full Name
                  </TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Collage Name</TableCell>
                  <TableCell align="center">FollowUp</TableCell>
                  <TableCell align="center">Interaction</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center" colSpan={3}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ height: ong && ong.length < 1 ? 220 : 0 }}>
                {ong &&
                  ong.map((row) => (
                    <TableRow
                      key={row._id}
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
                        {row.FullName}
                      </TableCell>
                      <TableCell align="center">{row.Contact}</TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">
                        {row.Date && row.Date.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{row.CollageName}</TableCell>
                      <TableCell align="center">{row.FollowUp}</TableCell>
                      <TableCell align="center">{row.Interaction}</TableCell>
                      <TableCell align="center">{row.Description}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit" arrow>
                          <Button
                   
                            onClick={() => {
                              setOpen(true);
                              setData(row);
                              setId(row._id);
                            }}
                          >
                            <EditIcon />
                          </Button>
                        </Tooltip>
                      </TableCell>
     
                      <TableCell>
                        <Tooltip title="Reject" arrow>
                          <Button
                           
                            color="error"
                            onClick={()=>{setId(row._id);handleClickOpen2()}}
                          >
                            <CloseIcon />
                          </Button>
                        </Tooltip>
                      </TableCell>

                      <TableCell>
                        <Tooltip title="Confirm" arrow>
                          <Button
                         color="success"
                         onClick={()=>{setId(row._id);handleClickOpen3()}}
                          >
                            <DoneIcon />
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
                  <TableCell align="center">Full Name</TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Collage Name</TableCell>
                  <TableCell align="center">FollowUp</TableCell>
                  <TableCell align="center">Interaction</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ height: reject && reject.length < 1 ? 220 : 0 }}>
                {reject &&
                  reject.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.FullName}</TableCell>
                      <TableCell align="center">{row.Contact}</TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">
                        {row.Date && row.Date.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{row.CollageName}</TableCell>
                      <TableCell align="center">{row.FollowUp}</TableCell>
                      <TableCell align="center">{row.Interaction}</TableCell>
                      <TableCell align="center">{row.Description}</TableCell>
                      <TableCell>
                        <Tooltip title="Delete" arrow>
                          <Button
                            
                            color="error"
                            onClick={() => {
                              handleClickOpen1();
                              setDeleteId(row._id);
                            }}
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
                  <TableCell align="center">Full Name</TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Collage Name</TableCell>
                  <TableCell align="center">FollowUp</TableCell>
                  <TableCell align="center">Interaction</TableCell>
                  <TableCell align="center">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ height: confirm && confirm.length < 1 ? 220 : 0 }}
              >
                {confirm &&
                  confirm.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.FullName}</TableCell>
                      <TableCell align="center">{row.Contact}</TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">
                        {row.Date && row.Date.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{row.CollageName}</TableCell>
                      <TableCell align="center">{row.FollowUp}</TableCell>
                      <TableCell align="center">{row.Interaction}</TableCell>
                      <TableCell align="center">{row.Description}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>

      {alertSuccess.open ? <Alert>{alertSuccess.message}</Alert> : <div></div>}

      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Student"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do You Want To delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button
            onClick={() => {
              axios
                .delete(
                  `http://localhost:5000/Eventinquiry/Delete?id=${deleteId}`
                )
                .then((data) => {
                  console.log(data);
                  doUpdate(!update);
                })
                .catch((err) => {
                  console.log(err);
                });

              handleClose1();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reject Student"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do You Want To Reject?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button
            onClick={() => {
              axios
                .post(
                  `http://localhost:5000/Eventinquiry/RejectedInquiry?id=${id}`
                )

                .then((data) => {
                  console.log(data);
                  doUpdate(!update);
                })
                .catch((err) => {
                  console.log(err);
                });
                handleClose2()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        
      <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Student"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do You Want To Confirm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancel</Button>
          <Button
             onClick={() => {
              axios
                .post(
                  `http://localhost:5000/Eventinquiry/ConfimInquiry?id=${id}`
                )
                .then((data) => {
                  console.log(data);
                  doUpdate(!update);
                })
                .catch((err) => {
                  console.log(err);
                });
                handleClose3()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Eventi;
