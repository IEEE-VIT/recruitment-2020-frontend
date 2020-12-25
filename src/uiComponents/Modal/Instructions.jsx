import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const Instructions = ({ setShowInstr, showInstr = true }) => {
  const history = useHistory();
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
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  return (
    <Dialog
      onClose={() => {
        if (window.location.pathname === "/instructions") {
          return history.push("/dashboard");
        }
        setShowInstr(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={showInstr}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => {
          if (window.location.pathname === "/instructions") {
            return history.push("/dashboard");
          }
          setShowInstr(false);
        }}
      >
        Instructions
      </DialogTitle>
      <DialogContent dividers>
        <ol style={{ "padding-left": "20px" }}>
          <b>
            Please ensure to read all the instruction before you sit for your
            recruitment process.
          </b>
          <li style={{ "padding-top": "15px" }}>
            Do not disclose any information regarding any rounds or the tasks
            upon completion.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Videos must be kept on during all rounds of the recruitment process.
            Kindly take the necessary measures to ensure this.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Any misbehavior or misconduct of any sort will be dealt with extreme
            seriousness.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Any evidence found of the above will result in immediate
            disqualification. - Extension of project deadlines and rescheduling
            of slots will not be encouraged under any circumstances.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Please ensure while attending the interviews to have a stable
            internet connection and minimum background noise.
          </li>
          <li style={{ "padding-top": "7px" }}>
            DO NOT contact us on our socials to know your progress. All progress
            updates will be visible to you on the portal. Please use the chatbot
            to ask any queries.
          </li>
          <li style={{ "padding-top": "7px" }}>
            In case of any immediate need for information or update, we will
            contact you via your phone number or email address. KEEP CHECKING
            FOR UPDATES.
          </li>
          <h4>Procedure for recruitments</h4>
        </ol>
        <ol>
          <li style={{ "padding-top": "7px" }}>
            Round 1: We request you to join 5 mins before your slot time. Please
            refresh once the slot time begins, the "I am ready now" button will
            be enabled. Click the button to enter the queue for your interview.
            When we are ready to take your interview you will receive a mail.
            Please ensure you regularly check your mail.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Round 2 (Management): You will be asked to choose the slot for the
            next round once you have been accepted for Round 2. During the slot
            timing, please click the "GD Pool" button to join a meet link where
            you will be instructed further about the round 2 procedure. You will
            be asked to submit the task that was given to you during round 1 so
            please keep it ready.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Round 2 (Tech): After round 1, you will have exactly 48 hours to
            submit the project that was assigned. After the deadline, you will
            not be able to submit the project and you will be disqualified. Few
            hours after you submit the project, you will receive a mail with the
            slot for your round 2 interview. Open the website during the
            assigned time to receive the link.
          </li>
          <li style={{ "padding-top": "7px" }}>
            Round 3: You will be contacted for round 3.
          </li>
        </ol>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default Instructions;
