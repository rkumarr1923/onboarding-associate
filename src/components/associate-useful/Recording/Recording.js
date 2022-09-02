import RecordingList from "./RecordingList";
import { Grid, Typography } from "@mui/material";
import * as React from "react";

const Recording = () => {
    return (
      <div className="checklist-container">
        <Grid container direction="row" style={{ backgroundColor: "white" }} className="pt-3">          
          <Grid item xs={12}>
            <Typography
              style={{ margin: "20px" }}
              variant="span"
              color="black"
              sx={{ textDecoration: "underline" }}
            >
              <strong>Recording Links</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RecordingList />
          </Grid>
        </Grid>
      </div>
    );
  };
  
  export default Recording;
  