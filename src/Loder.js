import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
export default function CircularIndeterminate() {
  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",

        height: window.innerHeight,
      }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </Grid>
  );
}
