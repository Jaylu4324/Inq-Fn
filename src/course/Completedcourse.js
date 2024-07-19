import React from "react";

import axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
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

export default function Completedcourse() {
  const [open, setOpen] = React.useState(false);
const[count,setcount]=React.useState(0)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [arr, setarr] = React.useState([]);
  const [view, setview] = React.useState(false);
  const [update, doupdate] = React.useState(false);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/ISC/getAllData")
      .then((data) => {
        console.log("data", data.data.data);
        setarr(data.data.data);

        console.log("arr is set");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  console.log(arr);
  console.log(view);
console.log(count)
  return (
    <>
      <TableContainer>
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
                Course
              </TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Batch Timings</TableCell>
              <TableCell align="center">Batch Name</TableCell>

              <TableCell colSpan={2} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {arr &&
            arr.map((row,idx) => (
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
                  {row.CourseId && row.CourseId.Course}
                </TableCell>

                <TableCell align="center">
                  {row.CourseId && row.CourseId.StartDate.split("T")[0]}
                </TableCell>

                <TableCell align="center">
                  {row.CourseId &&
                    row.CourseId.Days.map((val) => <Box>{val}</Box>)}
                </TableCell>
                <TableCell align="center">
                  {row.CourseId && convertToIST(row.CourseId.BatchTime)}
                </TableCell>
                <TableCell align="center">
                  {row.CourseId && row.CourseId.batchName}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="View Batch Students" arrow>
                    <Button color="primary" onClick={()=>{setview(!view)
                    setcount(idx)
                      setview(!view)
                    

                    }}

                    >
                      <RemoveRedEyeIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                {count==idx && view==true&& row.StudentArray && row.StudentArray.map((val) => (
         <Box>{val.FullName}</Box>
        ))}
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </TableContainer>
    </>
  );
}
{
  /* <BootstrapDialog
onClose={handleClose}
aria-labelledby="customized-dialog-title"
open={open}
>
<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
Batch Students
</DialogTitle>
<IconButton
  aria-label="close"
  onClick={handleClose}
  sx={{
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
  }}
>
  <CloseIcon />
</IconButton>
<DialogContent>
<h1>Tec nisahlllllllllllll</h1>
{row.StudentArray && row.StudentArray.map((val) => (
         <Box>{val.FullName}</Box>
        ))}
</DialogContent>

</BootstrapDialog> */
}
