import React from "react";
import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";

import lock from "../../assets/lock.svg";
import check from "../../assets/check.png";
import sandGlass from "../../assets/sand-glass.svg";
import missedClock from "../../assets/missed-clock.svg";
import cross from "../../assets/cross.svg";

const useStyles = makeStyles({
  card: {
    // color: black;
    // background-color : white;
    minWidth: "275px",
    height: "275px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "1rem",
    marginLeft: 0,
  },
  header: {
    padding: "0.75rem",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#0A0A0A",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImg: {
    width: "60px",
    height: "auto",
  },
  lockedText: {
    color: "#8F8F8F",
  },
  checkText: {
    color: "#42E01B",
  },
  PRText: {
    color: "#E0D31B",
  },
  rejectText: {
    color: "#E0501B",
  },
});

const StaticDashboardCard = ({ roundNo = 0, status = "RR" }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <div className={classes.header}>Round {roundNo}</div>
      <Divider className={classes.divider} orientation="horizontal" />
      {status === "RR" ? (
        <div className={classes.cardContent}>
          <img className={classes.cardImg} src={cross} alt="reject" />
          <Typography className={classes.rejectText}>Rejected</Typography>
        </div>
      ) : status === "AR" ? (
        <div className={classes.cardContent}>
          <img className={classes.cardImg} src={check} alt="check" />
          <Typography className={classes.checkText}>Cleared</Typography>
        </div>
      ) : status === "PR" ? (
        <div className={classes.cardContent}>
          <img className={classes.cardImg} src={sandGlass} alt="sandglass" />
          <Typography className={classes.PRText}>In review</Typography>
        </div>
      ) : status === "MS" ? (
        <div className={classes.cardContent}>
          <img className={classes.cardImg} src={missedClock} alt="Missed" />
          <Typography className={classes.rejectText}>Missed</Typography>
        </div>
      ) : status === "ER" ? (
        <div className={classes.cardContent}>
          <img className={classes.cardImg} src={sandGlass} alt="sandglass" />
          <Typography className={classes.PRText}>In review</Typography>
        </div>
      ) : (
        <div className={classes.cardContent}>
          <img className={classes.cardImg} src={lock} alt="lock" />
          <Typography className={classes.lockedText}>Locked</Typography>
        </div>
      )}
    </Paper>
  );
};

export default StaticDashboardCard;
// tech+design
