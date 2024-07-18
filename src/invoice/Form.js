import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Img from "./Tnlogo.png";
import dayjs from "dayjs";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import autoTable from "jspdf-autotable";
import SearchIcon from "@mui/icons-material/Search";

import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import utc from "dayjs/plugin/utc";
import Menu from "@mui/material/Menu";


import Paper from "@mui/material/Paper";
import { jsPDF } from "jspdf";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Alert from "@mui/material/Alert";
import FilledInput from "@mui/material/FilledInput";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import SortIcon from "@mui/icons-material/Sort";

export default function FormDialog() {
  const [coursearr, setcoursearr] = React.useState([]);

  const [arr, setArr] = React.useState([]);
  const [update, doUpdate] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [message, setMessage] = React.useState("");
  const [alertopen, setalertopen] = React.useState(false);
  const [stuarr, setstuarr] = React.useState([]);
  const [parent, setParent] = React.useState({});
  const handleparent = (e) => {
    setParent({ ...e.target.value });
    setS("hahahh");
  };
  const [alertMsg, setAlertMsg] = React.useState({ open: false, message: "" });
  
  const [alertSuccess, setAlertSuccess] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [s, setS] = React.useState("kalpshha");

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
        .get("http://localhost:5000/invoice/Display")
        .then((data) => {
          setArr(data.data.data);
        })
        .catch((err) => {
          console.log("error ", err);
        });
    } else {
      axios
        .get(`http://localhost:5000/invoice/courseIn?parentId=${parent._id}`)
        .then((data) => {
          console.log(data);
          setArr(data.data.data);
        })
        .catch((err) => {
          console.log("error ", err);
        });
    }
    if (parent._id) {
      axios
        .get(`http://localhost:5000/student/allStuden?id=${parent._id}`)
        .then((data) => {
          setstuarr(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [update, parent, s]);

  React.useEffect(() => {}, []);

  const [open, setOpen] = React.useState(false);

  const [data, setData] = React.useState({ invoiceDate: dayjs() });
  const [id, setId] = React.useState();

  const handleChange = (e, type) => {
    setData({ ...data, [type]: e.target.value });
  };
  console.log(data);
  const handleClose = () => {
    setData({});
    setId();
    setOpen(false);
  };

  const handleopenclose = () => {
    setOpen(!open);
  };
  const AddorUpdate = (message) => {
    if (id) {
      console.log(data);

      axios
        .post(`http://localhost:5000/invoice/Update?id=${id}`, data)
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
          console.log(data);
          setData({});
          setId();
          setOpen(false);
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
      axios
        .post("http://localhost:5000/invoice/addinfo", {
          ...data,
          courseId: parent._id,
        })
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
          console.log("data post api ", data);
          setData({});
          setId();
          setOpen(false);
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
    }
    setSeverity(severity);
    setMessage(message);
    setalertopen(true);

    
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
  console.log("NORMAL datafgffgf", data);

  dayjs.extend(utc);
  const handleDateChange = (val) => {
    const selectedDate = new Date(val);
    const timezoneOffset = 5.5 * 60; // 5.5 hours in minutes
    const adjustedDate = new Date(
      selectedDate.getTime() + timezoneOffset * 60 * 1000
    );
    const formattedDate = adjustedDate.toISOString();

    setData({ ...data, invoiceDate: formattedDate });
  };

  console.log(id);
  let str = "Total Paid Fees";
  const [searchname, setseearchname] = React.useState("");

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
  const handlesearchname = (e) => {
    setseearchname(e.target.value);
  };
  console.log(searchname);
  
  console.log(arr);
  
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
    <React.Fragment>
       
     <Grid container spacing={2}>
      {/* Left Section */}
      <Grid item xs={12} sm={3} sx={{
        display: "flex",
        justifyContent: "flex-start", // Adjusted for right alignment
        alignItems: "flex-start",
      

      
      }}>
        <Box sx={{display:'flex',mt:1}}>
          <div>
            <Tooltip title="Add Invoice" arrow>
          <Button
       
       disabled={parent._id ? false : true}

       onClick={handleopenclose}
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
                      `http://localhost:5000/invoice/filterinvocedate?key=Rfees&sortby=${order}&courseid=${parent._id ? parent._id : ""}`)
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
          </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} sx={{
    
        
      }}>
  <Box>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        Select Course
      </InputLabel>
      <Select
        onChange={(e) => {
          handleparent(e);
        }}
         
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Status"
        renderValue={(data)=>{return (parent._id && data.Course) || ''}}
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
      >
        {coursearr &&
          coursearr.map((row) => (
            <MenuItem key={row.name} value={row}>
              <TableRow
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

      
        <Grid item xs={12} sm={4} sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
      
        
   
      }}>
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
                      `http://localhost:5000/invoice/searchinstu?name=${searchname}`
                    )
                    .then((data) => {
                      console.log(data);
                      setArr(data.data.filterdata);
                      setseearchname("");

                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
          <Box>
            <FormControl sx={{ my: 2 }} fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Students
              </InputLabel>

              <Select
                labelId="demo-multiple-checkbox-label"
                disabled={id ? true : false}
                // renderValue={() => (id ? selectedStudentName : '')}
                id="demo-multiple-checkbox"
                onChange={(e) => {
                  handleChange(e, "stuId");
                }}
                sx={{ width: 530 }}
                fullWidth
                input={<FilledInput />}
              >
                {stuarr &&
                  stuarr.map((row) => (
                    <MenuItem key={row._id} value={row._id}>
                      <TableCell align="center">{row.Name}</TableCell>
                      <TableCell align="center">{row.Contact}</TableCell>
                      <TableCell align="center">{row.Rfees}</TableCell>
                      <TableCell align="center">{row.Pfees}</TableCell>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
       
            
          <TextField
            id="outlined-basic"
         
            type="Number"
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
                  defaultValue={id ? dayjs(data.invoiceDate) : null}
                  slotProps={{ textField: { variant: "filled" } }}
                  label="Choose Your Date"
                  sx={{ width: 525 }}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Mode Of Payment
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="filled"
                label="TypeOfPayment"
                value={data.TypeOfPayment}
                onChange={(e) => {
                  handleChange(e, "TypeOfPayment");
                }}
              >
                <MenuItem value={"UPI"}>UPI</MenuItem>
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Cheque"}>Cheque</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
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
              AddorUpdate("data captured", console.log(message));
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {alertSuccess.open ? <Alert>{alertSuccess.message}</Alert> : <div></div>}

      <Box sx={{ mt: 3, mx: 2 }}>
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
                  Student Name
                </TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">TypeOfPayment</TableCell>

                <TableCell align="center">Invoice Amount</TableCell>
                <TableCell align="center">
                  {str && str.length < 4 ? (
                    str
                  ) : (
                    <Tooltip title="Total Paid Fees" arrow>
                      <span>{"TPF"}</span>
                    </Tooltip>
                  )}
                </TableCell>

                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Remaining</TableCell>
                <TableCell align="center" colSpan={3}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: arr && arr.length < 1 ? 300 : 0 }}>
              {arr&&arr.length>0?
            arr.map((row)=>(
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
  {row.stuId && row.stuId.Name}
</TableCell>
<TableCell align="center">
  {row.invoiceDate && row.invoiceDate.split("T")[0]}
</TableCell>
<TableCell align="center">
  {row.courseId && row.courseId.Course}
</TableCell>
<TableCell align="center">{row.TypeOfPayment}</TableCell>
<TableCell align="center">{row.Amount}</TableCell>

<TableCell align="center">
  {row.stuId && row.stuId.Pfees}
</TableCell>

<TableCell align="center">
  {row.stuId && row.stuId.Tfees}
</TableCell>
<TableCell align="center">
  {row.stuId && row.stuId.Rfees}
</TableCell>
<TableCell align="center">
  <Tooltip title="Edit" arrow>
    <Button
  
      onClick={() => {
        setData(row);
        setId(row._id);

        setOpen(true);
      }}
    >
      <EditIcon />
    </Button>
  </Tooltip>
</TableCell>

<TableCell align="center">
  {" "}
  <Tooltip title="Download Receipt" arrow>
    <Button
 
      color="warning"
      onClick={() => {
        const doc = new jsPDF();

        // Set background color
        doc.setFillColor(255, 255, 255);
        doc.rect(
          0,
          0,
          doc.internal.pageSize.width,
          doc.internal.pageSize.height,
          "F"
        );

        // Add a logo at the top center
        const logoWidth = 50;
        const logoHeight = 20;
        const centerX =
          doc.internal.pageSize.width / 2 - logoWidth / 2;
        doc.addImage(
          Img,
          "PNG",
          centerX,
          10,
          logoWidth,
          logoHeight
        );

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 110);
        doc.text(
          "Fees Receipt".toUpperCase(),
          doc.internal.pageSize.width / 2,
          40,
          { align: "center" }
        );

        // Create a table with 2 columns and 8 rows
        const table = {
          headers: ["Field", "Value"],
          body: [
            ["Invoice ID", row.invoiceId],
            [
              "Date",
              row.invoiceDate &&
                row.invoiceDate.split("T")[0],
            ],
            [
              "Student Name",
              row.stuId.Name && row.stuId.Name,
            ],
            [
              "Course Name",
              row.stuId.course && row.stuId.course,
            ],
            ["Payment Method", row.TypeOfPayment],
            ["Paid Amount", row.Amount],
          ],
        };

        // Add the table to the PDF with borders and colors
        doc.autoTable({
          startY: 60,
          head: [table.headers],
          body: table.body,
          theme: "striped",
          styles: {
            cellPadding: 3,
            fontSize: 10,
            valign: "middle",
            halign: "center",
            fontStyle: "normal",
            lineWidth: 0.1,
          },
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 110],
            fontStyle: "bold",
          },
          columnStyles: {
            0: {
              cellWidth: 40,
            },
            1: {
              cellWidth: "auto",
            },
          },
        });

        // Add footer
        const footerText = [
          "Email: info@technishal.com",
          "Contact: +91 9313386475",
          "Address: H-1210, Titanium City Center Business Park,",
          "Nr. Prahlad Nagar Rd, Jodhpur Village,",
          "Ahmedabad, Gujarat 380015.",
        ];

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        // Add horizontal line
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(
          10,
          doc.internal.pageSize.height - 30,
          doc.internal.pageSize.width - 10,
          doc.internal.pageSize.height - 30
        );

        // Add footer text with spacing
        let footerY = doc.internal.pageSize.height - 25;
        footerText.forEach((text, index) => {
          doc.text(
            text,
            doc.internal.pageSize.width / 2,
            footerY,
            { align: "center" }
          );
          footerY += 5;
        });
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(
          "This is a computer-generated invoice. Signature not required.",
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 50,
          { align: "center" }
        );

        // Copyright notice
        doc.setTextColor(100);
        doc.setFontSize(8);
        doc.text(
          "© 2023 TechNishal. All Rights Reserved.",
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 2,
          { align: "center" }
        );

        doc.save(
          `${row.stuId.Name}-${row.stuId.course}.pdf`
        );
      }}
    >
      <DownloadIcon />
    </Button>
  </Tooltip>
</TableCell>
<TableCell align="center">
  <Tooltip title="Send Email" arrow>
    <Button
      sx={{ color: "black" }}
  
      onClick={() => {
        axios
          .post("http://localhost:5000/invoice/pdf", row)
          .then((data) => {
            console.log(data);
            if(data.data){
              setAlertSuccess({
                open: true,
                message: "Email Sent Successfully",
                severity: "success",
              });
              setTimeout(() => {
                setAlertSuccess("");
              }, 3000);
              console.log(data.data)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <EmailIcon />
    </Button>
  </Tooltip>
</TableCell>
</TableRow> 
            )):
            <TableRow>
            <TableCell colSpan={14} align="center">
              No data available
            </TableCell>
          </TableRow>
            }
              

                
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
}

// <BrowserRouter>
// <Routes>
// <Route path='/dashBoard' element={<Navbar/>}>
// <Route path='/dashBoard/Invoice' element={<Invoice/>}/>
// </Route>

// </Routes>
// // </BrowserRouter>
// setData({...data,[type]:e.target.value})

