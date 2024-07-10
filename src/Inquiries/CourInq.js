import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import CloseIcon from "@mui/icons-material/Close";

import utc from "dayjs/plugin/utc";

import DoneIcon from "@mui/icons-material/Done";
import {
  Container,
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import SortIcon from "@mui/icons-material/Sort";

import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import axios from "axios";

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

function Form1() {
  const [value, setValue] = React.useState(0);

  const [data, setData] = React.useState({ Date: dayjs(), Course: [] });

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

  const Co = ["React", "Node", "C", "C++", "Python", "Mern Stack", "AWS"];
  const handlecourse = (e) => {
    let value = e.target.value;
    setData({ ...data, Course: value });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/inquiry/OnGoing")
      .then((data) => {
        console.log("data received");
        setArr(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/inquiry/Reject")
      .then((data) => {
        setReject(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/inquiry/Confirm")
      .then((data) => {
        setconfirm(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

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
        .post("http://localhost:5000/inquiry/addInquiry", data)
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

  dayjs.extend(utc);
  const handleDateChange = (val) => {
    const selectedDate = new Date(val);
    const timezoneOffset = 5.5 * 60; // 5.5 hours in minutes
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();

    setData({ ...data, Date: formattedDate });
  };

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
  // const handlesearchname = (e) => {
  //   setseearchname(e.target.value);
  // };

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

  return (
    <>
      <React.Fragment>
        <Container>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={2}>
              <Button variant="outlined" onClick={handleopen}>
                <AddIcon /> Inquiry
              </Button>
            </Grid>
          </Grid>

          <Box>
            <Box sx={{ display: "flex", justifyContent: "center",mb:2 }}>
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
            <Grid container spacing={2}>
                <Grid
                  xs={10}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: 400, ml: 2 }}>
                    <TextField
                      // value={searchname}

                      id="filled-hidden-label-small"
                      placeholder="Search Ongoing Inquiries..."
                      variant="filled"
                      size="small"
                      // onChange={handlesearchname}

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
                        "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottom: "none", // Remove underline on hover
                          },
                      }}
                    />
                  </Box>

                  <Tooltip title="Search" arrow>
                    <Button sx={{ color: "#0063cc" }}>
                      <SearchIcon
                      // onClick={() => {
                      //   axios
                      //     .get(
                      //       `http://localhost:5000/invoice/searchinstu?name=${searchname}`
                      //     )
                      //     .then((data) => {
                      //       console.log(data);
                      //       setArr(data.data.filterdata);
                      //       // setseearchname("");

                      //     })
                      //     .catch((err) => {
                      //       console.log(err);
                      //     });
                      // }}
                      />
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Adjusted to 'flex-end' for right alignment
                    alignItems: "center",
                  }}
                >
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
                    {/* <Menu
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
                        `http://localhost:5000/invoice/fillterinvocemonth?courseId=${
                          parent._id ? parent._id : ""
                        }&month=${montharr[index]}&sort=${order1}`
                      )
                      .then((data) => {
                        console.log("API Response:", data);
                        setArr(data.data);

                        setorder1(order1 === 1 ? -1 : 1);
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
             */}
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
                    {/* <Menu
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
                  setParent({});
                  handleClosemenu();
                }}
              >
                All
              </MenuItem>

              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/invoice/filterinvocedate?key=invoiceDate&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
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
                      `http://localhost:5000/invoice/filterinvocedate?key=Name&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  handleClosemenu();
                }}
              >
                Sort By Name
              </MenuItem>
              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/student/fillter?key=Rfees&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  handleClosemenu();
                }}
              >
                Sort By RF
              </MenuItem>
            </Menu>
             */}
                  </div>
                </Grid>
              </Grid>
                  <Box sx={{mt:2}}>
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
                            <TableCell align="center">
                              Interested Course
                            </TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Follow-Up</TableCell>
                            <TableCell align="center">Interaction</TableCell>
                            <TableCell align="center" colSpan={3}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          sx={{ height: arr && arr.length < 1 ? 220 : 0 }}
                        >
                          {arr &&
                            arr.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
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
                                  {row.FullName}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Contact}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Email}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Date && row.Date.split("T")[0]}
                                </TableCell>
                                <TableCell align="center">
                                  {row.CollageName}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Course}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Description}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{
                                    color:
                                      row.FollowUp == "Yes" ? "green" : "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {row.FollowUp}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Interaction}
                                </TableCell>
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
                                  <Tooltip title="Reject" arrow>
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
                                      <CloseIcon />
                                    </Button>
                                  </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                  <Tooltip title="Confirm" arrow>
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
                                      <DoneIcon />
                                    </Button>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
              
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <Grid
                  xs={10}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: 400, ml: 2 }}>
                    <TextField
                      // value={searchname}

                      id="filled-hidden-label-small"
                      placeholder="Search Rejected Inquiries..."
                      variant="filled"
                      size="small"
                      // onChange={handlesearchname}

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
                        "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottom: "none", // Remove underline on hover
                          },
                      }}
                    />
                  </Box>

                  <Tooltip title="Search" arrow>
                    <Button sx={{ color: "#0063cc" }}>
                      <SearchIcon
                      // onClick={() => {
                      //   axios
                      //     .get(
                      //       `http://localhost:5000/invoice/searchinstu?name=${searchname}`
                      //     )
                      //     .then((data) => {
                      //       console.log(data);
                      //       setArr(data.data.filterdata);
                      //       // setseearchname("");

                      //     })
                      //     .catch((err) => {
                      //       console.log(err);
                      //     });
                      // }}
                      />
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Adjusted to 'flex-end' for right alignment
                    alignItems: "center",
                  }}
                >
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
                    {/* <Menu
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
                        `http://localhost:5000/invoice/fillterinvocemonth?courseId=${
                          parent._id ? parent._id : ""
                        }&month=${montharr[index]}&sort=${order1}`
                      )
                      .then((data) => {
                        console.log("API Response:", data);
                        setArr(data.data);

                        setorder1(order1 === 1 ? -1 : 1);
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
             */}
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
                    {/* <Menu
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
                  setParent({});
                  handleClosemenu();
                }}
              >
                All
              </MenuItem>

              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/invoice/filterinvocedate?key=invoiceDate&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
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
                      `http://localhost:5000/invoice/filterinvocedate?key=Name&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  handleClosemenu();
                }}
              >
                Sort By Name
              </MenuItem>
              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/student/fillter?key=Rfees&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  handleClosemenu();
                }}
              >
                Sort By RF
              </MenuItem>
            </Menu>
             */}
                  </div>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
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
                    <TableBody
                      sx={{ height: reject && reject.length < 1 ? 220 : 0 }}
                    >
                      {reject &&
                        reject.map((row) => (
                          <TableRow
                            key={row.name}
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
                              {row.FullName}
                            </TableCell>
                            <TableCell align="center">{row.Contact}</TableCell>
                            <TableCell align="center">{row.Email}</TableCell>
                            <TableCell align="center">
                              {row.Date && row.Date.split("T")[0]}
                            </TableCell>
                            <TableCell align="center">
                              {row.CollageName}
                            </TableCell>
                            <TableCell align="center">{row.Course}</TableCell>
                            <TableCell align="center">
                              {row.Description}
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Delete" arrow>
                                <Button
                                  onClick={() => {
                                    axios
                                      .delete(
                                        "http://localhost:5000/inquiry/Delete"
                                      )
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
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
            <Grid container spacing={2}>
                <Grid
                  xs={10}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: 400, ml: 2 }}>
                    <TextField
                      // value={searchname}

                      id="filled-hidden-label-small"
                      placeholder="Search Confirmed Inquiries..."
                      variant="filled"
                      size="small"
                      // onChange={handlesearchname}

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
                        "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottom: "none", // Remove underline on hover
                          },
                      }}
                    />
                  </Box>

                  <Tooltip title="Search" arrow>
                    <Button sx={{ color: "#0063cc" }}>
                      <SearchIcon
                      // onClick={() => {
                      //   axios
                      //     .get(
                      //       `http://localhost:5000/invoice/searchinstu?name=${searchname}`
                      //     )
                      //     .then((data) => {
                      //       console.log(data);
                      //       setArr(data.data.filterdata);
                      //       // setseearchname("");

                      //     })
                      //     .catch((err) => {
                      //       console.log(err);
                      //     });
                      // }}
                      />
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Adjusted to 'flex-end' for right alignment
                    alignItems: "center",
                  }}
                >
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
                    {/* <Menu
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
                        `http://localhost:5000/invoice/fillterinvocemonth?courseId=${
                          parent._id ? parent._id : ""
                        }&month=${montharr[index]}&sort=${order1}`
                      )
                      .then((data) => {
                        console.log("API Response:", data);
                        setArr(data.data);

                        setorder1(order1 === 1 ? -1 : 1);
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
             */}
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
                    {/* <Menu
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
                  setParent({});
                  handleClosemenu();
                }}
              >
                All
              </MenuItem>

              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/invoice/filterinvocedate?key=invoiceDate&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
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
                      `http://localhost:5000/invoice/filterinvocedate?key=Name&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  handleClosemenu();
                }}
              >
                Sort By Name
              </MenuItem>
              <MenuItem
                onClick={() => {
                  axios
                    .get(
                      `http://localhost:5000/student/fillter?key=Rfees&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setArr(data.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  handleClosemenu();
                }}
              >
                Sort By RF
              </MenuItem>
            </Menu>
             */}
                  </div>
                </Grid>
              </Grid>


                  <Box sx={{mt:2}}>
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
                            <TableCell align="center">
                              Interested Course
                            </TableCell>
                            <TableCell align="center">Description</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          sx={{
                            height: confirm && confirm.length < 1 ? 220 : 0,
                          }}
                        >
                          {confirm &&
                            confirm.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
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
                                <TableCell align="center">
                                  {row.Contact}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Email}
                                </TableCell>
                                <TableCell align="center">
                                  {row.date && row.Date.split("T")[0]}
                                </TableCell>
                                <TableCell align="center">
                                  {row.CollageName}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Course}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Description}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
             
            </CustomTabPanel>
          </Box>
        </Container>

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

            <Box sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    slotProps={{ textField: { variant: "filled" } }}
                    label="Choose Your Date"
                    defaultValue={id ? dayjs(data.Date) : null}
                    onChange={handleDateChange}
                    sx={{ width: 530 }}
                  />
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

            <Box sx={{ mt: 1 }}>
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
                  onChange={handlecourse}
                  input={<FilledInput />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {Co &&
                    Co.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={
                            data.Course && data.Course.indexOf(name) > -1
                          }
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
                <InputLabel id="demo-simple-select-label">
                  Interaction
                </InputLabel>
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
                  setData({});
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

        {alertSuccess.open ? (
          <Alert>{alertSuccess.message}</Alert>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    </>
  );
}
export default Form1;
