import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
function Dashboard() {
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
  const [date, setdate] = React.useState("");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[new Date(date).getDay()];
  const [arr, setarr] = React.useState([]);
  const [stu, setstu] = React.useState([]);
  const [id, setid] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("displayname", "Dashboard");
    if (day) {
      axios
        .get(`http://localhost:5000/Dashboard/CourseData?day=${day}`)
        .then((data) => {
          console.log(data);
          setarr(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (id) {
      axios
        .get(`http://localhost:5000/Dashboard/StudentDetails?courseId=${id}`)
        .then((data) => {
          console.log(data);
          data &&
            data.data.data.map((val) => {
              setstu(val.StuName);
            
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [date, id]);
  console.log(stu);
  const handleDateChange = (e) => {
    setdate(e.$d);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={4}>
          <Box sx={{  ml: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(e) => {
                  handleDateChange(e);
                }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid xs={12} sm={5}>
         
        </Grid>
        <Grid xs={12} sm={3}>
          <Box
            sx={{mx: 2 }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Student Name</TableCell>
                    <TableCell align="center">Contact</TableCell>
                  </TableRow>
                </TableHead>

                {stu &&
                  stu.map((row) => (
                    <TableBody sx={{ height: arr && arr.length < 1 ? 200 : 0 }}>
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.FullName}</TableCell>
                        <TableCell align="center">{row.Contact}</TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mx: 2, mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ position: "sticky", left: 0, backgroundColor: "white" }}
                >
                  Batch Name
                </TableCell>

                <TableCell align="center">Start Date</TableCell>

                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Batch Time</TableCell>
                <TableCell align="center">Batch Name</TableCell>

                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            {arr &&
              arr.map((row) => (
                <TableBody sx={{ height: arr && arr.length < 1 ? 200 : 0 }}>
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
                      {row.batchName}
                    </TableCell>

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
                    <TableCell align="center">{row.batchName}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => {
                          setid(row._id);
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Dashboard;
