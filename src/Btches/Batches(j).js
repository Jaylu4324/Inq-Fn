import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, FilledInput, TableBody } from '@mui/material';
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// let str="2024-07-01T12:00:99"

// let newdate=str.split('T')[0].split("-").reverse().join("/")


import axios from "axios";
import Paper from "@mui/material/Paper";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';

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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Batches() {
  const [parent, setParent] = React.useState({});
  const [data, setData] = React.useState({ StuName: [] });
  const [id, setId] = React.useState("");
  const [value, setValue] = React.useState(0);
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

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
  const [update, doupdate] = React.useState(false);
  const [open, setopen] = React.useState(false);
  const [arr, setarr] = React.useState([]);
  const [map, maparr] = React.useState([]);
  const [arr1, seteventarr] = React.useState([]);
  const [confirm, setconfirm] = React.useState([]);
  const[alertMsg,setAlertMsg]=React.useState("");
  const[alertSuccess,setAlertSuccess]=React.useState({
    open:false,message:"",severity:"",
  })

  React.useEffect(() => {
    
    axios
      .get("http://localhost:5000/event/Displayevent")
      .then((data) => {
        seteventarr(data.data.data);
    console.log('first api')
        console.log("arr is set ", arr);
      })
      .catch((err) => {
        console.log(err);
      });
      
      if (parent._id) {
        axios
          .get(`http://localhost:5000/Batch/Display?id=${parent._id}`)
          .then((data) => {
            console.log(data.data.data);
      console.log('second api')
            maparr(data.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
    if (parent._id) {
      axios
        .get(`http://localhost:5000/Eventinquiry/getisAdded?id=${parent._id}`)

        .then((data) => {
          console.log(data);
console.log('thid api')

          setarr(data.data.data);

          console.log("confirm batches is set",data.data.data);
        })
        .catch((err) => {
          console.log(err);
          if(err.response.data){
            // setAlertMsg(err.response.data.error.details[0].message)
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

    }
  }, [parent._id, update]);

  const handleOpen = () => {
    // Check if id is present (editing mode)
    if (id) {
      // Clear the selected values by setting data.StuName to an empty array
      setData((prevData) => ({
        ...prevData,
        StuName: [],
      }));
    }
    setId("")

    setData({ StuName: [] })
    setopen(false);
    doupdate(!update);

  };

  const handleparent = (e) => {
    setParent({ ...e.target.value });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChange = (event) => {
    const { target: { value } } = event;
    const newStuNames = value.map((item, index) => {
      const [FullName, Contact, _id] = item.split("-");


      return { FullName, Contact, _id };
    });
    let s = newStuNames.length - 1





    console.log("ah", newStuNames)
    setData((prevData) => ({
      ...prevData,
      StuName: newStuNames,
    }));
  };

  // console.log(data.StuName)

  const renderSelectedValue = (selected) => {

    if (selected.length === 0) {
      return <em>Placeholder</em>;
    } else if (selected.length > 0) {
      const selectedNames = selected.map((val) =>
        val.split("-").slice(0, 2).join("-")
      );
      return selectedNames.join(", ")
    }
  };
  console.log(confirm);

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
    <>
   <Grid container spacing={2}>
   <Grid item  xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
   <Box sx={{mt:1}}>
  <Tooltip title="Add Batches" arrow>
          <Button
       disabled={parent._id?false:true}
            onClick={() => {
              setarr([...arr])
              console.log(arr)

              setopen(true);
              setData({ StuName: [] })
              setId("");
            }}
          >
    <AddIcon/>
          </Button>
          </Tooltip>
          </Box>
       </Grid>
     <Grid xs={5}></Grid>
   <Grid item xs={5}>
       
   <Box sx={{ mr: 3 }}>
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
            renderValue={(data)=>{return(parent._id && data.Course || '')}}
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
            {arr1 &&
              arr1.map((row) => (
                <MenuItem value={row}>
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{row.Course}</TableCell>

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
                  </TableRow>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
</Grid>




</Grid>
      <Box>
        <Box sx={{ mt: 4 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"
                  sx={{ position: "sticky", left: 0, backgroundColor: "white", zIndex: 1,
                  }}
                  
                  >Student Name</TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Days</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Batch Time</TableCell>

                  <TableCell align="center" colSpan={3}>
                Actions
              </TableCell>
              
                </TableRow>
              </TableHead>
<TableBody sx={{height:map && map.length<1?220:0}}>
              {map &&
                map.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" sx={{ position: "sticky", left: 0, backgroundColor: "white", zIndex: 1,
                                    }}
                  >
                      {row.StuName.map((data, index) => (
                     <Box align="center">
                          <TableCell align="center"> {data.FullName}</TableCell>
                          </Box>
                      ))}
                    </TableCell>

                    <TableCell align="center">
                      {row.StuName.map((data) => (
                  <Box align="center">
                          <TableCell align="center">{data.Contact}</TableCell>
                          </Box>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {row.EventId.Days &&
                        row.EventId.Days.map((data) => (
                          <Box align="center">
                            {data}
                            </Box>
                        ))}
                    </TableCell>
                    <TableCell align="center">
                    <Box align="center">
                        <TableCell align="center">
                          {row.EventId.StartDate.split("T")[0]}
                        </TableCell>
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                    <Box align="center">
                        <TableCell align="center">
                          {row.EventId.BatchTime.split("T")[1]
                            .split(".")[0]
                            .slice(0, 5)}
                        </TableCell>
                        </Box>
                    </TableCell>
<Box sx={{display:'flex',justifyContent:'center',mt:2}}>
                    <TableCell align="center">
                    <Tooltip title="Edit" arrow>
                      
                      <Button
                   
                        onClick={() => {
                          console.log("row")

                          setData({ ...row });
                          setId(row._id);
                          console.log("rwow", arr)
                          // setData({...row,StuName:[...data.StuName]})
                          // console.log(...data.StuName,...arr)
                          console.log("wdfd", row, "arr", ...arr)
                          setarr([...row.StuName, ...arr])

                          setopen(true);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      </Tooltip>
                    </TableCell>
                    
                    <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Batch"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do You Want To delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button
           onClick={() => {
           
            axios
              .delete(
                `http://localhost:5000/Batch/Delete?id=${row._id}`
              )
              .then((data) => {
                console.log("delet", data);
                doupdate(!update);
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
        <DialogTitle id="alert-dialog-title">{"Complete Batch"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do You Want To Complete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancel</Button>
          <Button
         onClick={() => {
          axios
            .post(
              `http://localhost:5000/Batch/isCompleted?id=${row._id}`
            )
            .then((data) => {
              doupdate(!update);

              console.log(data);
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
                    <TableCell align="center">
                    <Tooltip title="Delete" arrow>
                    
                      <Button
                  onClick={()=>{handleClickOpen2()}}
                        color="error"
                      
                      >
                        
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                  
                    </TableCell>
                   
                    <TableCell align="center">
                    <Tooltip title="Complete" arrow>
                      <Button
                    onClick={()=>{handleClickOpen3()}}
                        color="success"
                       
                      >
                    <DoneAllIcon/>
                      </Button>
                      </Tooltip>
                    </TableCell>
                    </Box>
                  </TableRow>
                ))}
</TableBody>
            </Table>
          </TableContainer>
        </Box>

       
      </Box>

      <Dialog open={open}>
        <DialogContent>
        {alertMsg.open && (
            <Alert severity="error" sx={{ zIndex: 9999 }}>
              {alertMsg.message}
            </Alert>
          )}
          <Grid container spacing={2} justifyContent="left">
            <Grid item xs={4}>
              <Box>
                <FormControl sx={{ width: 560, mt: 3 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select Students
                  </InputLabel>

                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={data.StuName && data.StuName.map(
                      (item) => `${item.FullName}-${item.Contact}-${item._id}`
                    )}
                    onChange={handleChange}
                  
                    sx={{ width: 530 }}
                    fullWidth
                    input={<FilledInput/>}
                    renderValue={renderSelectedValue}
                    MenuProps={MenuProps}
                  >
                    {arr.map((name) => (
                      <MenuItem
                        key={name._id}
                        value={`${name.FullName}-${name.Contact}-${name._id}`}
                      >
                        <Checkbox
                          checked={
                            data.StuName && data.StuName.findIndex(
                              (item) =>
                                item.Contact == name.Contact &&
                                item.FullName == name.FullName &&
                                item._id == name._id
                            ) > -1
                          }
                         
                        />
                        <ListItemText
                          primary={`${name.FullName}  ${name.Contact}`}
                        />
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <DialogActions>
            <Button
              onClick={() => {
                handleOpen();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (id) {
                  axios
                    .post(`http://localhost:5000/Batch/Update?id=${id}`, {...data,EventId:parent._id})
                    .then((data) => {
                      console.log(arr);
                      setId("");
                      setData({ StuName: [] });
                      console.log(data.StuName)
                      setopen(false);
                      doupdate(!update);
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
                    .post("http://localhost:5000/Batch/addbatch", {
                      ...data,
                      EventId: parent._id,
                    })
                    .then((data1) => {

                      console.log(arr);

                      setopen(false);
                      setId("");
                      setData({ StuName: [] })
                      doupdate(!update);

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
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {alertSuccess.open  ? (
        <Alert>{alertSuccess.message}</Alert>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Batches;
