import { Grid, Typography } from "@mui/material";
import React from "react";
import TemplateSummary from "./TemplateSummary";
import CheckListStepper from "./CheckListStepper";

const OnBoardingCheckList = () => {
  return (
    <>
      <Grid container direction="row" style={{ backgroundColor: "white" }} className="pt-3">
        <Grid item xs={12}>
          <Typography
            style={{ margin: "20px" }}
            variant="span"
            color="black"
            sx={{ textDecoration: "underline" }}
          >
            <strong>Template Change Control Summary of Changes</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TemplateSummary />
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ margin: "20px" }}
            variant="span"
            color="red"
            sx={{ textDecoration: "underline" }}
          >
            <strong>
              Prudential Retirement Services On-boarding Checklist
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CheckListStepper />
        </Grid>
      </Grid>
    </>
  );
};

export default OnBoardingCheckList;
