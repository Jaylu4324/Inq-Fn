import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

import Dialog from "@mui/material/Dialog";
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
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import utc from "dayjs/plugin/utc";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";

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

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import SortIcon from "@mui/icons-material/Sort";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, alpha } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
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
  const [coursearr, setcoursearr] = React.useState([]);
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
  const [order, setorder] = React.useState(1);
  const [order1, setorder1] = React.useState(1);

  const handlechange = (e, type) => {
    setData({ ...data, [type]: e.target.value });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/batchEvent/DisplayBevent")
      .then((data) => {
        setcoursearr(data.data.data);
        console.log("arr is set");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(coursearr);
    if (!parent._id) {
      axios
        .get("http://localhost:5000/student/Alldata")
        .then((data) => {
          setarr(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (parent._id) {
      axios
        .get(`http://localhost:5000/student/allStuden?id=${parent._id}`)
        .then((data) => {
          setarr(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [parent, update]);

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
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:5000/student/stuadd", {
          ...data,
          CourseId: parent._id,
        })
        .then((data) => {
          console.log("data posted", data);
          doupdate(!update);
          setAlertSuccess({
            open: true,
            message: "Added Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setAlertSuccess("");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setOpen(!open);
    setData({});
    setId("");
  };


  const handleFileUpload = (event) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      const baseString = reader.result;
      setData((prevData) => ({ ...prevData, baseString }));
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  console.log(data.baseString);

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
        setTimeout(() => {
          setAlertSuccess("");
        }, 3000);
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
  console.log(arr);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        
      >
  <Grid item xs={12} sm={3} sx={{ display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"}}>
          <Box sx={{display:'flex',mt:1}}>
          <div>
          <Tooltip title="Add Student Details" arrow>
            <Button
            
        
              onClick={() => {
                handleopen();
              }}
            >
        <AddIcon/>
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
                    axios
                      .get(
                        `http://localhost:5000/student/filtermonth?perentId=${
                          parent._id ? parent._id : ""
                        }&month=${montharr[index]}&sort=${order1}`
                      )
                      .then((data) => {
                        console.log(data);
                        setarr(data.data);

                        setorder1(order1 == 1 ? -1 : 1);
                      })

                      .catch((err) => {
                        console.log(err);
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
                      `http://localhost:5000/student/fillter?key=Date&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setarr(data.data.data);
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
                      `http://localhost:5000/student/fillter?key=Name&sortby=${order}&courseid=${
                        parent._id ? parent._id : ""
                      }`
                    )
                    .then((data) => {
                      console.log(data);
                      setorder(order == 1 ? -1 : 1);
                      setarr(data.data.data);
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
                      setarr(data.data.data);
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
          </div>
          </Box>
          </Grid>
       
        <Grid
           item xs={12} sm={5}

        >
           <Box sx={{ mx: 2 }}>
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
                  sx={{
                    height:50,
                    minWidth:'100%',
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
                  renderValue={(data) => {
                    return (parent._id && data.Course) || "";
                  }}
                >
                  {coursearr &&
                    coursearr.map((row) => (
                      <MenuItem key={row._id} value={row}>
                        <TableRow>
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

        
        <Grid
       xs={12} sm={4} 
          sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
        >
          <Box sx={{ width: 400,ml:3,mt:2 }}>
            <TextField
              // value={searchname}

              id="filled-hidden-label-small"
              placeholder="Search Students..."
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
                "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none", // Remove underline on hover
                },
              }}
            />
          </Box>
          <Box sx={{mt:2}}>
          <Tooltip title="Search" arrow>
            <Button sx={{ color: "#0063cc" }}>
              <SearchIcon
                onClick={() => {
                  console.log("hi");
                }}
              />
            </Button>
          </Tooltip>
          </Box>
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
            type="number"
            id="outlined-basic"
            label="Total Fees"
            variant="filled"
            value={data.Tfees}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              handlechange(e, "Tfees");
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
            sx={{ mb: 1 }}
            onChange={(e) => {
              handlechange(e, "AcademicCourse");
            }}
          />


          <Box sx={{mb:1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Choose Your Date"
                  slotProps={{ textField: { variant: "filled" } }}
                  onChange={handleDateChange}
                  defaultValue={id ? dayjs(data.Date) : null}
                  sx={{ width: 530}}
                  fullWidth
                ></DatePicker>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["TimePicker"]} fullWidth>
                <TimePicker
                  label="Batch Timings"
                  defaultValue={id ? dayjs(data.btime) : null}
                  slotProps={{ textField: { variant: "filled" } }}
                  sx={{ width: 530,mb:1 }}
                  fullWidth
                  onChange={(val) => {
                    setData({ ...data, btime: val });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box>
            <FormControl variant="filled" sx={{ mt: 2 }} fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Batch days
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={data.days || []}
                onChange={handleChange1}
                
                fullWidth
                input={<FilledInput />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {days &&
                  days.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={data.days && data.days.indexOf(name) > -1}
                      />
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
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                />
              </Button>
          
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setId();
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
        </DialogActions>
      </Dialog>

      <Box sx={{ mx: 2, my: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650, mx: 3 }} aria-label="simple table">
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
                  Student Name
                </TableCell>
                <TableCell align="center">Contact</TableCell>

                <TableCell align="center">Parent Contact</TableCell>
                <TableCell align="center">Total Fees</TableCell>
                
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">College Name</TableCell>
                <TableCell align="center">Academic Course</TableCell>
                <TableCell align="center">Course</TableCell>
                
                <TableCell align="center">Paid Fees</TableCell>
                <TableCell align="center">Remaining Fees</TableCell>
                <TableCell align="center">Total Fees</TableCell>
                
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Batch Days</TableCell>
                <TableCell align="center">Batch Timing</TableCell>


                <TableCell align="center" colSpan={3}>
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
                      {row.Name}
                    </TableCell>
                    <TableCell align="center">{row.Contact}</TableCell>
                    <TableCell align="center">{row.Parentcontact}</TableCell>
                    <TableCell align="center">{row.Tfees}</TableCell>
                    
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">{row.CollegeName}</TableCell>
                    <TableCell align="center">{row.AcademicCourse}</TableCell>
                    <TableCell align="center">{row.CourseId && row.CourseId.Course}</TableCell>

                    <TableCell align="center">{row.Pfees}</TableCell>
                    <TableCell align="center">{row.Rfees}</TableCell>
                    <TableCell align="center">{row.Tfees}</TableCell>
                        
                    <TableCell align="center">
                      {row.Date && row.Date.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">{row.days}</TableCell>
                    <TableCell align="center">
                      {row.btime && convertToIST(row.btime)}
                    </TableCell>
                    <TableCell align="center">
                                            <Tooltip title="Download Aadhar">
                                              <Button
                                              onClick={() => {
                                                var a = document.createElement("a"); //Create <a>
                                                a.href = row.baseString; //Image Base64 Goes here
                                                console.log(row);
                                                a.download =   `${row.Name}Aadhar.png`//File name Here
                                                a.click(); //Downloaded file
                                              }}
                                              


                                              >
                        
                    <DownloadIcon/>
                          
                          </Button>
                          
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit" arrow>
                        <Button
         onClick={() => {
                            handleupdate(row);
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete" arrow>
                        <Button
                          color="error"
                          onClick={() => {
                            handledelete(row);
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
      </Box>
    </React.Fragment>
  );
}

export default SD;
{
  /* {alertSuccess.open  ? (
        <Alert>{alertSuccess.message}</Alert>
      ) : (
        <div></div>
      )} */
}
