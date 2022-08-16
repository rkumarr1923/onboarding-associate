import { AddCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import moment from "moment/moment.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { comments, userComments, userDetails } from "../../store";

const CommentComponent = () => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userDetails);
  const allComments = useSelector(userComments);
  const empId = "000GM1";

  useEffect(() => {
    axios.get("http://localhost:9094/comment/" + empId).then((result) => {
      if (result.data)
        dispatch(
          comments({
            comments: result.data,
          })
        );
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]);

  const handleClickOpen = () => {
    setError(false);
    setComment("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertDate = (date) => {
    let updatedDate = moment(new Date(date));
    return updatedDate.calendar(null, {
      lastWeek: "[Last] ddd hh:mm A",
      lastDay: "[Yesterday at] hh:mm A",
      sameDay: function (now) {
        if (moment(date).isSame(moment(new Date()).format())) {
          return "[Now]";
        } else {
          return "[Today at] hh:mm A";
        }
      },
      sameElse: "YYYY/MM/DD hh:mm A",
    });
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleAddComments = () => {
    if (comment === null || comment === "") setError(true);
    else {
      let updatedComments = {
        empId: empId,
        who: user.name,
        role: user.role,
        comments: comment,
        date: moment(new Date()).format(),
      };
      axios
        .post("http://localhost:9094/comment/add-comment", updatedComments)
        .then((result) => {
          if (result.data)
            dispatch(
              comments({
                comments: [result.data, ...allComments],
              })
            );
        });
      setError(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Grid container direction="row" style={{ backgroundColor: "white" }}>
        <Grid item xs={12} position="fixed" style={{ zIndex: "998" }}>
          <Grid
            container
            direction="row"
            position="fixed"
            style={{ backgroundColor: "black" }}
          >
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{ margin: "10px", color: "white" }}
              >
                <strong>Comments</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "end" }}>
              <Button
                size="small"
                disableRipple
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleClickOpen}
                style={{ margin: "10px" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "2.7rem" }}>
          {allComments.length !== 0 ? (
            <List>
              {allComments.map((data, index) => {
                return (
                  <Fragment key={`comments-${index}`}>
                    <ListItem alignItems="flex-start" key={index}>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="h6"
                              color="black"
                              style={{ margin: 0 }}
                            >
                              <Grid container direction="row">
                                <Grid item xs={6}>
                                  {user.role === data.role ? (
                                    <strong>You</strong>
                                  ) : (
                                    <>
                                      <Grid
                                        container
                                        textAlign="center"
                                        alignItems="center"
                                      >
                                        <Grid item xs="auto">
                                          <strong>{data.who}:</strong>
                                        </Grid>
                                        <Grid item xs>
                                          <Tooltip
                                            title={data.role}
                                            placement="right"
                                          >
                                            <Avatar
                                              alt="Role Information"
                                              style={{
                                                width: "15px",
                                                height: "15px",
                                                fontSize: "0.5rem",
                                              }}
                                            >
                                              {data.role.charAt(0)}
                                            </Avatar>
                                          </Tooltip>
                                        </Grid>
                                      </Grid>
                                    </>
                                  )}
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: "end" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    {convertDate(data.date)}
                                  </span>
                                </Grid>
                              </Grid>
                            </Typography>
                          </>
                        }
                        secondary={
                          <Typography
                            sx={{ display: "inline" }}
                            variant="span"
                            color="black"
                          >
                            {data.comments}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="li" />
                  </Fragment>
                );
              })}
            </List>
          ) : (
            "No comments"
          )}
        </Grid>
      </Grid>
      <Dialog open={open}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={handleComment}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddComments}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentComponent;
