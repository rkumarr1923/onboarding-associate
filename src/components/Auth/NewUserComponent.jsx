import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import '../styles/login.css';

const NewUserComponent = () => {
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [role, setRole] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleNewUser = () => {
    console.log(email, empId);
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="pt-3"
      >
        <Grid item xs={12}>
          <Typography variant="h6">
            <strong>Add New User</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} className="pt-2">
          <Card>
            <CardContent>
              <TextField
                className="btn-color"
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
                Please enter IBM employee ID in 6 character. Eg: xxxxxx
              </Typography>
              <TextField
                margin="dense"
                label="Email Id"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={handleChange}
              />
              <Typography variant="body2" color="text.secondary">
                Please enter IBM employee mail id
              </Typography>
              <Select
                margin="dense"
                displayEmpty
                id="role"
                value={role}
                size="small"
                fullWidth
                onChange={handleChange}
                style={{ marginTop: "1.5rem" }}
                //   inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  UserRole
                </MenuItem>
                <MenuItem value="Associate">Associate</MenuItem>
                <MenuItem value="Reviewer">Reviewer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
              <Typography variant="body2" color="text.secondary">
                Please select the role for the user
              </Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained" onClick={handleNewUser}>
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default NewUserComponent;
