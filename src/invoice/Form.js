import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Img from "./Tnlogo.png";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
import Stack from "@mui/material/Stack";
import FilledInput from "@mui/material/FilledInput";

// import DatePicker from "react-datepicker";

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

    axios
      .get("http://localhost:5000/invoice/Display")
      .then((data) => {
        setArr(data.data.data);
      })
      .catch((err) => {
        console.log("error ", err);
      });

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
  }, [update, parent]);
  const [open, setOpen] = React.useState(false);
  console.log(stuarr);
  const [data, setData] = React.useState({ invoiceDate: dayjs() });
  const [id, setId] = React.useState();
  //   const [startDate, setStartDate] = React.useState(new Date());
  const handleChange = (e, type) => {
    setData({ ...data, [type]: e.target.value });
  };

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
      console.log(data)

      axios
        .post(`http://localhost:5000/invoice/Update?id=${id}`,data)
        .then((data) => {
          doUpdate(!update);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      
      axios
        .post("http://localhost:5000/invoice/addinfo", data)
        .then((data) => {
          doUpdate(!update);
          console.log("data post api ", data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setData({});
    setId();
    setSeverity(severity);
    setMessage(message);
    setalertopen(true);

    setOpen(false);
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
  console.log("NORMAL data", arr);
console.log(id)
const[value,setvalue]=React.useState('kalpshah')

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={2} sx={{ mb: 3 }}>
          <Button variant="outlined" onClick={handleopenclose}>
            Add Invoice
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box>
            <FormControl sx={{my: 2 }} fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Students
              </InputLabel>

              <Select
                labelId="demo-multiple-checkbox-label"
                disabled={id==undefined?false:true}
                  // value={id!==undefined?value:null}

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
                    <MenuItem  key={row._id} value={row._id}>
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

          {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DemoContainer components={["DatePicker"]} fullWidth>
                <DatePicker
                  defaultValue={id ? dayjs(data.invoiceDate) : null}
                  slotProps={{ textField: { variant: "filled" } }}
                  label="Choose Your Date"
                  sx={{ width: 530 }}
                  fullWidth
                  onChange={(newVal) => {
                    setData({ ...data, invoiceDate: newVal });
                  }}
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
              <TextField
                id="outlined-basic"
                label="Description"
                variant="filled"
                value={data.Description}
                sx={{ mt: 2 }}
                onChange={(e) => {
                  handleChange(e, "Description");
                }}
                fullWidth
              />{" "}
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Student Name</TableCell>
                <TableCell align="center">Amount(current amount)</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">TypeOfPayment</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Total(total cf)</TableCell>
                <TableCell align="center">Remaining</TableCell>

                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { arr && arr.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.stuId && row.stuId.Name}</TableCell>
                  <TableCell align="center">{row.Amount}</TableCell>
                  <TableCell align="center">
                    {row.invoiceDate && row.invoiceDate.split("T")[0]}
                  </TableCell>
                  <TableCell align="center">{row.stuId &&row.stuId.course}</TableCell>
                  <TableCell align="center">{row.TypeOfPayment}</TableCell>
                  <TableCell align="center">{row.Description}</TableCell>
                  <TableCell align="center">{row.stuId && row.stuId.Tfees}</TableCell>
                  <TableCell align="center">{row.stuId &&row.stuId.Rfees}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setData(row);
                        setId(row._id);

                        setOpen(true);
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
                        axios
                          .delete(
                            `http://localhost:5000/invoice/Delete?id=${row._id}`
                          )
                          .then((data) => {
                            doUpdate(!update);
                            console.log(data);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <Button
                      variant="contained"
                      color="info"
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
                          "Invoice",
                          doc.internal.pageSize.width / 2,
                          40,
                          { align: "center" }
                        );

                        // Create a table with 2 columns and 8 rows
                        const table = {
                          headers: ["Field", "Value"],
                          body: [
                            ["Invoice ID", row._id],
                            ["Date", row.invoiceDate && row.invoiceDate.split('T')[0]],
                            ["Student Name", row.stuId.Name],
                            ["Course Name", row.stuId.course],
                            ["Payment Method", row.TypeOfPayment]
                            
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
                          "Email - info@technishal.com",
                          "Contact Number - +91 9313386475",
                          "Address - H-1210, Titanium City Center Business Park, Nr. Prahlad Nagar Rd, Jodhpur Village, Ahmedabad, Gujarat 380015.",
                        ];
                        doc.setFontSize(10);
                        doc.setTextColor(0, 0, 0);
                        doc.text(
                          footerText,
                          1,
                          doc.internal.pageSize.height - 17,
                          { hyperlink: { url: "mailto:info@technishal.com" } }
                        );

                        // Copyright notice
                        doc.setTextColor(100);
                        doc.setFontSize(8);
                        doc.text(
                          "© 2023 TechNishal. All Rights Reserved.",
                          doc.internal.pageSize.width - 80,
                          doc.internal.pageSize.height - 20
                        );

                        // Save the PDF
                        doc.save(`${row.stuId.Name}-${row.stuId.course}.pdf`);
                      }}
                    >
                      Download
                    </Button>
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

// <BrowserRouter>
// <Routes>
// <Route path='/dashBoard' element={<Navbar/>}>
// <Route path='/dashBoard/Invoice' element={<Invoice/>}/>
// </Route>

// </Routes>
// // </BrowserRouter>
// setData({...data,[type]:e.target.value})
