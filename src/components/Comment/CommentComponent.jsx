import { AddCircleOutline } from "@mui/icons-material";
import {
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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment/moment.js";
import axios from "axios";
import { useEffect } from "react";

const CommentComponent = () => {
  const [open, setOpen] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const empId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("empId="))
    .split("=")[1];

  useEffect(() => {
    axios.get("http://localhost:9094/comment/" + empId).then((result) => {
      if (result.data.comments)
        setAllComments(JSON.parse(result.data.comments));
    });
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
      let comments = [
        {
          who: "You",
          comment: comment,
          date: moment(new Date()).format(),
        },
        ...allComments,
      ];
      axios
        .post("http://localhost:9094/comment/add-comment", {
          empId: empId,
          comments: JSON.stringify(comments),
        })
        .then((result) => {
          if (result.data.comments)
            // setAllComments(JSON.parse(result.data.comments));
            console.log(result.data.comments);
        });
      setAllComments(comments);
      setError(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Grid container direction="row" style={{ backgroundColor: "white" }}>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6" style={{ margin: "10px" }}>
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
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {allComments && (
            <List>
              {allComments.map((data, index) => {
                return (
                  <>
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
                                  <strong>{data.who}:</strong>
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
                            {data.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="li" />
                  </>
                );
              })}
            </List>
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
