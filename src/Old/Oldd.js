import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

export default function Old() {
  const [open1, setOpen1] = React.useState(false);
  const [id, setid] = React.useState();
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [arr, setarr] = React.useState([]);

  const [update, doupdate] = React.useState(false);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/event/Completedevent")
      .then((data) => {
        console.log("data r");
        setarr(data.data.data);
        console.log("arr is set");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

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
              <TableCell align="center">Type Of Event</TableCell>
              <TableCell align="center">Type Of Payment</TableCell>

              <TableCell align="center">Amount</TableCell>

              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>

              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Batch Time</TableCell>

              <TableCell align="center" colSpan={3}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

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
                  {row.Course}
                </TableCell>
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

                <TableCell align="center">
                  <Tooltip title="Delete" arrow>
                    <Button
                      onClick={() => {
                        setid(row._id);
                        handleClickOpen1();
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </TableContainer>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event"}</DialogTitle>
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
                .delete(`http://localhost:5000/event/Deleteevent?id=${id}`)
                .then((data) => {
                  doupdate(!update);
                  console.log("data delted", data);
                })
                .catch((err) => {
                  console.log("error", err);
                });
              handleClose1();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
