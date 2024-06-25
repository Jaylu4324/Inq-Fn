import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import Alert from '@mui/material/Alert';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/Table";
// import Table from "@mui/material/Table";

// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow"
import AddIcon from "@mui/icons-material/Add";

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
  const[alertMsg,setAlertMsg]=React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const[alertSuccess,setAlertSuccess]=React.useState({
    open:false
,message:"",  severity:""});


  const [id, setId] = React.useState();

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
          setTimeout(()=>{
            setAlertSuccess("");
          },3000);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          if(err.response.data){
            setAlertMsg({
              open:true,
              message:err.response.data.error.details[0].message
            })
            // setAlertMsg(err.response.data.error.details[0].message)
          setTimeout(()=>{
            setAlertMsg("");
          },3000)
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
          setTimeout(()=>{
            setAlertSuccess("");
          },3000);
       
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          if(err.response.data){
            setAlertMsg({
              open:true,
              message:err.response.data.error.details[0].message
            })
            
          setTimeout(()=>{
            setAlertMsg("");
          },3000)
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
          if(err.response.data){
            setAlertMsg({
              open:true,
              message:err.response.data.error.details[0].message
            })
            // setAlertMsg(err.response.data.error.details[0].message)
          setTimeout(()=>{
            setAlertMsg("");
          },3000)
          }
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
  // console.log(parent);

  // const TableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //     textAlign: "center", // Ensure the header text is centered
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //     textAlign: "center", // Ensure the body text is centered
  //   },
  // }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3} md={2.1}>
          <Button
            variant="outlined"
            onClick={handleopen}
            disabled={parent._id ? false : true}
          >
            <AddIcon /> Add Event Inquiry
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        {alertMsg.open && (<Alert severity="error" sx={{zIndex:9999}}>{alertMsg.message}</Alert>)}

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
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["DatePicker"]} fullWidth>
                <DatePicker
                  label="Choose Your Date"
                  defaultValue={id ? dayjs(data.Date) : null}
                  sx={{ width: 530 }}
                  slotProps={{ textField: { variant: 'filled' } }}
          
                  onChange={(newval) => {
                    setData({ ...data, Date: newval });
                  }}
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
             handleClose()
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
      {alertSuccess.open  ? (
        <Alert>{alertSuccess.message}</Alert>
      ) : (
        <div></div>
      )}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={11}>
          <Box sx={{ mt: 2 }}>
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
                variant="filled"
            
                // sx={{fullWidth}}
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
          <Grid>

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
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Reject</TableCell>
                  <TableCell align="center">Confirm</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {ong &&
                  ong.map((row) => (
                    <TableRow key={row._id}  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center">
                        {row.FullName}
                      </TableCell>
                      <TableCell align="center">
                        {row.Contact}
                      </TableCell>
                      <TableCell align="center">
                        {row.Email}
                      </TableCell>
                      <TableCell align="center">
                        {row.Date}
                      </TableCell>
                      <TableCell align="center">
                        {row.CollageName}
                      </TableCell>
                      <TableCell align="center">
                        {row.FollowUp}
                      </TableCell>
                      <TableCell align="center">
                        {row.Interaction}
                      </TableCell>
                      <TableCell align="center">
                        {row.Description}
                      </TableCell>
                      <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpen(true);
                      setData(row);
                      setId(row._id);

                    }}
                  >
                    Edit
                  </Button>
                </TableCell>


                <Dialog
                    open={true}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Delete Event"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                              Are you confirm to delete?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose1}>Cancel</Button>
                      <Button onClick={()=>{
                        // axios.post(`http://localhost:5000/Eventinquiry/RejectedInquiry?id=${row._id}`)
                        // handleClose1()
                        setOpen1(true);


                        }} >
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>      

                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      
                      axios.post(`http://localhost:5000/Eventinquiry/RejectedInquiry?id=${row._id}`)


                      .then((data)=>{
                        console.log(data)
                        doUpdate(!update)
                      })
                        .catch((err)=>{
                          console.log(err)
                        })
                      
                    }}
                  >
                    Reject
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      axios.post(`http://localhost:5000/Eventinquiry/ConfimInquiry?id=${row._id}`)
                      .then((data)=>{
                        console.log(data)
                        doUpdate(!update)
                      })
                        .catch((err)=>{
                          console.log(err)
                        })
                      
                    }}
                  >
                    confirmed
                  </Button>
                </TableCell>

                
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          </Grid>
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
                  <TableCell align="center">Delete</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {reject &&
                  reject.map((row) => (
                    <TableRow key={row._id}  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center">
                        {row.FullName}
                      </TableCell>
                      <TableCell align="center">
                        {row.Contact}
                      </TableCell>
                      <TableCell align="center">
                        {row.Email}
                      </TableCell>
                      <TableCell align="center">
                        {row.Date}
                      </TableCell>
                      <TableCell align="center">
                        {row.CollageName}
                      </TableCell>
                      <TableCell align="center">
                        {row.FollowUp}
                      </TableCell>
                      <TableCell align="center">
                        {row.Interaction}
                      </TableCell>
                      <TableCell align="center">
                        {row.Description}
                      </TableCell>
                      <TableCell>

              
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      axios.delete(`http://localhost:5000/Eventinquiry/Delete?id=${parent._id}`)


                      .then((data)=>{
                        console.log(data)
                        doUpdate(!update) 
                      })
                        .catch((err)=>{
                          console.log(err)
                        })
                      
                    }}
                  >
                    Delete
                  </Button>
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
              <TableBody>
                {confirm &&
                  confirm.map((row) => (
                    <TableRow key={row._id}  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center">
                        {row.FullName}
                      </TableCell>
                      <TableCell align="center">
                        {row.Contact}
                      </TableCell>
                      <TableCell align="center">
                        {row.Email}
                      </TableCell>
                      <TableCell align="center">
                        {row.Date}
                      </TableCell>
                      <TableCell align="center">
                        {row.CollageName}
                      </TableCell>
                      <TableCell align="center">
                        {row.FollowUp}
                      </TableCell>
                      <TableCell align="center">
                        {row.Interaction}
                      </TableCell>
                      <TableCell align="center">
                        {row.Description}
                      </TableCell>
          
                
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

export default Eventi;
