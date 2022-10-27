import { InfoRounded, Visibility, VisibilityOff } from "@mui/icons-material";
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
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  allManagers,
  allReviewers,
  allRoles,
  createNewUser,
  createNewUserDetails,
  managers,
  resetCreateNewUserDetails,
  reviewers,
  roles,
} from "../../store";
import { authConstant } from "./AuthConstant";
import "../styles/login.css";

const NewUserComponent = () => {
  const dispatch = useDispatch();
  const newUserDetails = useSelector(createNewUser);
  const allRole = useSelector(allRoles);
  const allManager = useSelector(allManagers).filter(
    (item) => item.empId !== "N/A"
  );
  const allReviewer = useSelector(allReviewers).filter(
    (item) => item.empId !== "N/A"
  );

  useEffect(() => {
    axios.get("http://localhost:9099/roles").then((response) => {
      if (response.data) dispatch(roles({ roles: response.data }));
      else console.log("No Roles");
    });
    axios.get("http://localhost:9099/managers").then((response) => {
      if (response.data) dispatch(managers({ managers: response.data }));
      else console.log("No managers");
    });
    axios.get("http://localhost:9099/reviewers").then((response) => {
      if (response.data) dispatch(reviewers({ reviewers: response.data }));
      else console.log("No Reviewers");
    });
    return () => dispatch(resetCreateNewUserDetails());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generatePassword = () => {
    if (newUserDetails.employeeId !== "" && newUserDetails.userName !== "") {
      const generatedPassword =
        newUserDetails.userName.replace(/\s+/g, "").slice(0, 3) +
        newUserDetails.employeeId;
      dispatch(
        createNewUserDetails({
          createNewUser: {
            ...newUserDetails,
            isGeneratedButtonDisabled: true,
            password: generatedPassword,
            error: {
              ...newUserDetails.error,
              errorPassword: false,
              errorGeneratebutton: false,
            },
          },
        })
      );
    } else {
      let errorEmployeeId = false;
      let errorUserName = false;
      if (newUserDetails.employeeId === "") errorEmployeeId = true;
      if (newUserDetails.userName === "") errorUserName = true;
      dispatch(
        createNewUserDetails({
          createNewUser: {
            ...newUserDetails,
            error: { ...newUserDetails.error, errorEmployeeId, errorUserName },
          },
        })
      );
    }
  };

  const handleChange = (prop, errorType) => (event) => {
    event.preventDefault();
    dispatch(
      createNewUserDetails({
        createNewUser: {
          ...newUserDetails,
          [prop]: event.target.value,
          isGeneratedButtonDisabled:
            prop === "userName" || prop === "employeeId"
              ? false
              : newUserDetails.isGeneratedButtonDisabled,
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
    if (
      newUserDetails.reviewerName === "" &&
      newUserDetails.role === authConstant.assosiateRoleId
    )
      error = { ...error, errorReviewerName: true };
    if (
      newUserDetails.managerName === "" &&
      (newUserDetails.role === authConstant.assosiateRoleId ||
        newUserDetails.role === authConstant.reviewerRoleId)
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
      if (!newUserDetails.isGeneratedButtonDisabled) {
        dispatch(
          createNewUserDetails({
            createNewUser: {
              ...newUserDetails,
              error: { errorGeneratebutton: true },
            },
          })
        );
      } else {
        const requestData = {
          employeeId: newUserDetails.employeeId,
          email: newUserDetails.email,
          userName: newUserDetails.userName,
          password: newUserDetails.password,
          roleId: newUserDetails.role,
          reviewerEmpId:
            newUserDetails.role === authConstant.assosiateRoleId
              ? newUserDetails.reviewerName
              : "N/A",
          managerEmpId:
            newUserDetails.role === authConstant.assosiateRoleId ||
            newUserDetails.role === authConstant.reviewerRoleId
              ? newUserDetails.managerName
              : "N/A",
        };
        axios
          .post("http://localhost:9099/user_add", requestData)
          .then((response) => {
            console.log(response.data);
          });
      }
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
                variant="caption"
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
                variant="caption"
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
                  readOnly: true,
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <Tooltip
                          title="Password will be generated based on EmployeeID and Employee Name.
  Ex: EmployeeID - 123456, Employee Name - x test
  Generated Password - xte123456"
                        >
                          <IconButton>
                            <InfoRounded />
                          </IconButton>
                        </Tooltip>
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
                    </>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                disabled={newUserDetails.isGeneratedButtonDisabled}
                onClick={generatePassword}
                style={{ marginTop: "10px" }}
              >
                Generate Password
              </Button>
              <Typography
                variant="caption"
                color={
                  newUserDetails.error.errorGeneratebutton ? "red" : "black"
                }
              >
                Please generate password
              </Typography>
              {allRole && (
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
                  {allRole.map((data) => {
                    return (
                      <MenuItem value={data.id} key={data.id}>
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              <Typography
                variant="caption"
                color={newUserDetails.error.errorRole ? "red" : "black"}
              >
                Please select the role for the user
              </Typography>
              {newUserDetails.role === authConstant.assosiateRoleId &&
                allReviewer && (
                  <>
                    <Select
                      margin="dense"
                      displayEmpty
                      id="reviewer"
                      value={newUserDetails.reviewerName}
                      error={newUserDetails.error.errorReviewerName}
                      size="small"
                      fullWidth
                      onChange={handleChange(
                        "reviewerName",
                        "errorReviewerName"
                      )}
                      style={{ marginTop: "1.5rem" }}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                      }}
                      //   inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        Reviewer Name
                      </MenuItem>
                      {allReviewer.map((data) => {
                        return (
                          <MenuItem value={data.empId} key={data.empId}>
                            {data.reviewerName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography
                      variant="caption"
                      color={
                        newUserDetails.error.errorReviewerName ? "red" : "black"
                      }
                    >
                      Please select the Reviewer Name
                    </Typography>
                  </>
                )}
              {(newUserDetails.role === authConstant.assosiateRoleId ||
                newUserDetails.role === authConstant.reviewerRoleId) &&
                allManager && (
                  <>
                    <Select
                      margin="dense"
                      displayEmpty
                      id="manager"
                      value={newUserDetails.managerName}
                      error={newUserDetails.error.errorManagerName}
                      size="small"
                      fullWidth
                      onChange={handleChange("managerName", "errorManagerName")}
                      style={{ marginTop: "1.5rem" }}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                      }}
                      //   inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        Manager Name
                      </MenuItem>
                      {allManager.map((data) => {
                        return (
                          <MenuItem value={data.empId} key={data.empId}>
                            {data.managerName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography
                      variant="caption"
                      color={
                        newUserDetails.error.errorManagerName ? "red" : "black"
                      }
                    >
                      Please select the Manager Name
                    </Typography>
                  </>
                )}
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={newUserDetails.isLoginButonDisabled}
                onClick={handleNewUser}
              >
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
