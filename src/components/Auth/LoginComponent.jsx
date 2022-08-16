import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assosiateAuth } from "../../json/assosiateAuth";
import { managerAuth } from "../../json/managerAuth";
import { reviewerAuth } from "../../json/reviewerAuth";
import { login } from "../../store";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmpId(e.target.value);
  };

  const handleLogin = () => {
    if (empId === "000GM1") {
      dispatch(
        login({
          token: assosiateAuth.Token,
          userDetails: {
            name: assosiateAuth.Name,
            role: assosiateAuth.Roles,
            reviewer: assosiateAuth.Reviewer,
            manager: assosiateAuth.Manager,
            empId: empId,
          },
        })
      );
      navigate("/");
    }
    if (empId === "009YHJ") {
      dispatch(
        login({
          token: reviewerAuth.Token,
          userDetails: {
            name: reviewerAuth.Name,
            role: reviewerAuth.Roles,
            manager: reviewerAuth.Manager,
            empId: empId,
          },
        })
      );
      navigate("/");
    }
    if (empId === "123456") {
      dispatch(
        login({
          token: managerAuth.Token,
          userDetails: {
            name: managerAuth.Name,
            role: managerAuth.Roles,
            empId: empId,
          },
        })
      );
      navigate("/");
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6">
            <strong>Prudential Retirement</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                autoFocus
                margin="dense"
                label="Employee id"
                type="text"
                fullWidth
                variant="standard"
                value={empId}
                onChange={handleChange}
              />
              <Typography variant="body2" color="text.secondary">
                Please enter your IBM employee ID in 6 character. Eg: xxxxxx
              </Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginComponent;
