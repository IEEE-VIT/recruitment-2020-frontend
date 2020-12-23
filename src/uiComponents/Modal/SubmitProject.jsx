import React, { useEffect } from "react";

import {
  Button,
  Dialog,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import instance from "../../apis/recruitmentApi";
import { toastError } from "../../utils/userHelperFuncs";
import { useCookies } from "react-cookie";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const SubmitProject = ({ openModal, toggleProjectModal }) => {
  const [open, setOpen] = React.useState(openModal);
  const [projectLink, setProjectLink] = React.useState("");
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    toggleProjectModal();
  };

  const onSubmit = () => {
    if (projectLink === "") {
      return null;
    }
    instance
      .post(
        "/api/r1/project",
        { projectLink },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      )
      .then((response) => {
        toggleProjectModal();
        // console.log("deadline passed", response.data);
        if (response.data.data.passed) {
          // console.log("deadline passed block", response.data.passed);
          return toastError("Deadline to submit the project has passed");
        }
        // console.log("submiited");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toastError("Please enter a link with https://");
      });
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Submit Project
        </DialogTitle>
        <DialogContent dividers>
          <DialogContent style={{ padding: "0.5rem 0" }}>
            <Typography
              style={{ color: "#E0501B", fontWeight: "500", textAlign: "left" }}
            >
              Once submitted cannot be changed
            </Typography>
          </DialogContent>

          <TextField
            style={{ width: "100%" }}
            label="Project Url"
            variant="outlined"
            onChange={(e) => {
              setProjectLink(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubmitProject;
