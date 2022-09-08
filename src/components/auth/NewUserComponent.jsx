import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createNewUser,
  createNewUserDetails,
  resetCreateNewUserDetails,
} from "../../store";
import "../styles/login.css";

const NewUserComponent = () => {
  const dispatch = useDispatch();
  const newUserDetails = useSelector(createNewUser);
  useEffect(() => {
    return () => dispatch(resetCreateNewUserDetails());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (prop, errorType) => (event) => {
    event.preventDefault();
    dispatch(
      createNewUserDetails({
        createNewUser: {
          ...newUserDetails,
          [prop]: event.target.value,
          error: { ...newUserDetails.error, [errorType]: false },
        },
      })
    );
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    let error = {};
    if (newUserDetails.email === "") error = { ...error, errorEmail: true };
    if (newUserDetails.employeeId === "")
      error = { ...error, errorEmployeeId: true };
    if (newUserDetails.reviewerName === "" && newUserDetails.role === "1")
      error = { ...error, errorReviewerName: true };
    if (
      newUserDetails.managerName === "" &&
      (newUserDetails.role === "1" || newUserDetails.role === "2")
    )
      error = { ...error, errorManagerName: true };
    if (newUserDetails.role === "") error = { ...error, errorRole: true };
    if (newUserDetails.userName === "")
      error = { ...error, errorUserName: true };
    if (newUserDetails.password === "")
      error = { ...error, errorPassword: true };
    dispatch(
      createNewUserDetails({
        createNewUser: { ...newUserDetails, error },
      })
    );
    if (JSON.stringify(error) === "{}") {
      const requestData = {
        id: 4,
        employeeId: newUserDetails.employeeId,
        email: newUserDetails.email,
        userName: newUserDetails.userName,
        password: newUserDetails.password,
        roleId: Number(newUserDetails.role),
        reviewerName:
          newUserDetails.role === "1" ? newUserDetails.reviewerName : "",
        managerName:
          newUserDetails.role === "1" || newUserDetails.role === "2"
            ? newUserDetails.managerName
            : "",
      };
      console.log(requestData);
      // axios
      //   .post("http://localhost:9099/user_add", requestData)
      //   .then((response) => {
      //     console.log(response.data);
      //   });
    } else console.log("Error");
  };

  const handleClickShowPassword = () => {
    if (!newUserDetails.showPassword)
      document.getElementById("password").type = "text";
    else document.getElementById("password").type = "password";
    dispatch(
      createNewUserDetails({
        createNewUser: {
          ...newUserDetails,
          showPassword: !newUserDetails.showPassword,
        },
      })
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="pt-3"
        style={{ marginBottom: "10rem" }}
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
                value={newUserDetails.employeeId}
                error={newUserDetails.error.errorEmployeeId}
                onChange={handleChange("employeeId", "errorEmployeeId")}
              />
              <Typography
                variant="body2"
                color={newUserDetails.error.errorEmployeeId ? "red" : "black"}
              >
                Please enter IBM employee ID in 6 character. Eg: xxxxxx
              </Typography>
              <TextField
                margin="dense"
                label="Email Id"
                type="email"
                fullWidth
                variant="standard"
                value={newUserDetails.email}
                error={newUserDetails.error.errorEmail}
                onChange={handleChange("email", "errorEmail")}
              />
              <Typography
                variant="body2"
                color={newUserDetails.error.errorEmail ? "red" : "black"}
              >
                Please enter IBM employee mail id
              </Typography>
              <TextField
                margin="dense"
                label="Employee Name"
                type="text"
                fullWidth
                variant="standard"
                value={newUserDetails.userName}
                error={newUserDetails.error.errorUserName}
                onChange={handleChange("userName", "errorUserName")}
              />
              <TextField
                id="password"
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={newUserDetails.password}
                error={newUserDetails.error.errorPassword}
                onChange={handleChange("password", "errorPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {newUserDetails.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                margin="dense"
                displayEmpty
                id="role"
                value={newUserDetails.role}
                error={newUserDetails.error.errorRole}
                size="small"
                fullWidth
                onChange={handleChange("role", "errorRole")}
                style={{ marginTop: "1.5rem" }}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
                //   inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  UserRole
                </MenuItem>
                <MenuItem value="1">Associate</MenuItem>
                <MenuItem value="2">Reviewer</MenuItem>
                <MenuItem value="3">Manager</MenuItem>
              </Select>
              <Typography
                variant="body2"
                color={newUserDetails.error.errorRole ? "red" : "black"}
              >
                Please select the role for the user
              </Typography>
              {newUserDetails.role === "1" && (
                <TextField
                  margin="dense"
                  label="Reviewer Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.reviewerName}
                  error={newUserDetails.error.errorReviewerName}
                  onChange={handleChange("reviewerName", "errorReviewerName")}
                />
              )}
              {(newUserDetails.role === "1" || newUserDetails.role === "2") && (
                <TextField
                  margin="dense"
                  label="Manager Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.managerName}
                  error={newUserDetails.error.errorManagerName}
                  onChange={handleChange("managerName", "errorManagerName")}
                />
              )}
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
