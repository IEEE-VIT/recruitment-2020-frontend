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
        <Typography>
          - Please ensure to read all the instruction before you sit for your
          recruitment process.
        </Typography>
        <Typography>
          - Do not disclose any information regarding any rounds upon
          completion.
        </Typography>
        <Typography>
          - Do not disclose any information regarding the tasks given to you.
        </Typography>
        <Typography>
          - Any evidence found of the above will result in immediate
          disqualification.
        </Typography>
        <Typography>
          - Extension of project deadlines and rescheduling of slots will not be
          encouraged under any circumstances.
        </Typography>
        <Typography>
          - Videos must be kept on during all rounds of the recruitment process.
          Kindly take necessary measures to ensure this. Failing to do so will
          result in immediate disqualification.
        </Typography>
        <Typography>
          - Please ensure while attending the interviews to have a stable
          internet connection and minimum background noise.
        </Typography>
        <Typography>
          - DO NOT contact us on our socials to know your progress. All progress
          updates will be visible to you on the portal. Please use the chatbot
          to ask any queries.
        </Typography>
        <Typography>
          - In case of any immediate need of information or update we will
          contact you via your phone number or email address. KEEP CHECKING FOR
          UPDATES.
        </Typography>
        <Typography>
          - Clicking "I am ready" or ant similar button is just you let the
          interviewer know you are ready. You will receive the link via email
          when an interviewer is free and ready to take your interview. Please
          keep checking your mail for that duration.
        </Typography>
        <Typography>
          - Any misbehavior or misconduct of any sort will be dealt with extreme
          seriousness.
        </Typography>
        <Typography>
          - Use of any unparliamentary or foul language will not be tolerated.
        </Typography>
        <Typography>
          - We have the right to reject or disqualify any participant and no
          complaints or queries regarding the same will be entertained.
        </Typography>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default Instructions;
