import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import instance from "../../apis/recruitmentApi";
import ChooseSlot from "../ChooseSlot/ChooseSlot";
import inactiveClock from "../../assets/inactive-clock.png";

import "../RoundDetails/RoundDetails.css";
import { useCookies } from "react-cookie";
import SubmitProject from "../Modal/SubmitProject";
import ViewProject from "../Modal/ViewProject";

const useStyles = makeStyles({
  card: {
    // color: black;
    // background-color : white;
    minWidth: "275px",
    maxWidth: "275px",
    height: "275px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "1rem",
    marginLeft: 0,
    paddingBottom: "0",
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
    flexWrap: "wrap",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "0 1rem",
    padding: "0 1rem",
  },
  cardTop: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    color: "#0088FF",
    fontWeight: "600",
    // marginTop: "2rem",
  },
  inactiveText: {
    marginTop: "0.75rem",
    color: "#8F8F8F",
  },
  textWrap: {
    display: "flex",
    flexWrap: "wrap",
    whiteSpace: "normal",
  },
});

const NonStaticDashboardCard = ({
  roundNo = 0,
  status,
  date,
  startTime,
  endTime,
  btnDisabled = false,
  btnOnClick,
  round2MgmtGDPLink,
  projectLink,
  round2TechMeetLink,
  toastError,
  round2TechProjectTitle,
}) => {
  const classes = useStyles();

  const [round2MgmtGDALink, setRound2MgmtGDALink] = useState("");

  const [projectModal, setProjectModal] = useState(false);
  const [viewProjectModal, setViewProjectModal] = useState(false);

  const [disableGDABtn, setDisableGDABtn] = useState(true);
  const [disableR2TechMeet, setDisableR2TechMeet] = useState(true);

  const [cookies] = useCookies(["token"]);

  //states for choose slot
  const [chooseSlot, setChooseSlot] = useState(false);
  const [slots, setSlots] = useState({ "": [{ timeTo: "", timeFrom: "" }] });
  /*format : {"20dec" : [{timefrom: ,timeto : ,suid : },...] , "21dec" : [{}]}*/
  const [chosenSlot, setChosenSlot] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  //const [showConfirmed, setShowConfirmed] = useState(false);
  const [loadingSlotSubmit, setLoadingSlotSubmit] = useState(false);

  //end of states for choose slot

  const toggleProjectModal = () => {
    setProjectModal(!projectModal);
  };

  const toggleViewProjectModal = () => {
    setViewProjectModal(!viewProjectModal);
  };

  useEffect(() => {
    if (round2TechMeetLink !== "") {
      setDisableR2TechMeet(false);
      // console.log("meet", round2TechMeetLink);
    }
  }, [round2TechMeetLink]);

  //choose slot functions

  function notMoreThanOneSlot() {
    toastError("You can't select more than one slot!");
  }
  function finalSubmit() {
    instance
      .get("/api/r2/slots", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(function (response) {
        // console.log(response.data.data);
        const reqJob = async () => {
          setChosenSlot("");
          if (
            response.data.data === "" ||
            response.data.message === "No Valid Slot available"
          ) {
            toastError("Sorry. No slots available!");
          } else {
            setDateSelected(response.data.data[0].date);
            let finalSlots = {};
            for (var i = 0; i < response.data.data.length; i++) {
              if (
                Object.keys(finalSlots).includes(
                  response.data.data[i].date.toString()
                )
              ) {
                finalSlots[response.data.data[i].date.toString()].push({
                  timeFrom: response.data.data[i].timeFrom,
                  timeTo: response.data.data[i].timeTo,
                  suid: response.data.data[i].suid,
                  filled: response.data.data[i].filled,
                });
              } else {
                finalSlots[response.data.data[i].date.toString()] = [
                  {
                    timeFrom: response.data.data[i].timeFrom,
                    timeTo: response.data.data[i].timeTo,
                    suid: response.data.data[i].suid,
                    filled: response.data.data[i].filled,
                  },
                ];
              }
            }
            setSlots(finalSlots);
            setChooseSlot(true);
          }
        };
        reqJob();
      })
      .catch(function (err) {
        toastError("Something went wrong. Please try again!");
      });
  }

  function slotSubmit() {
    setLoadingSlotSubmit(true);
    if (chosenSlot === "") {
      toastError("Please select a slot!");
    } else {
      let finalResp = {
        suid: chosenSlot,
      };
      // console.log(finalResp);
      instance
        .post("/api/r2/selectslot", finalResp, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(function (response) {
          // console.log("success");
          setLoadingSlotSubmit(false);
          setChooseSlot(false);
        })
        .then(() => {
          window.location.reload();
        })
        .catch(function (err) {
          setLoadingSlotSubmit(false);
          toastError("Something went wrong. Please try again!");
          // console.log(err);
        });
    }
  }

  //end of choose slot  functions
  useEffect(() => {
    if (round2MgmtGDPLink) {
      // console.log("hehe");
      instance
        .get("/api/r2/fetchgda", {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(function (response) {
          const { data } = response.data;
          setRound2MgmtGDALink(data.meetLink);
          // console.log("Round 2 GDA", data.meetLink);
          if (data.meetLink == null) {
            // console.log("btn disable");
            return setDisableGDABtn(true);
          }
          setDisableGDABtn(false);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [round2MgmtGDPLink, cookies.token]);

  if (roundNo === "2 (Management)") {
    return (
      <Paper className={classes.card}>
        <div className={classes.header}>Round {roundNo}</div>
        <Divider className={classes.divider} orientation="horizontal" />
        {status === "RD" ? (
          <div className={classes.cardContent}>
            <div>
              <Typography>SCHEDULED TO</Typography>
              <Typography>
                {date}, {startTime}-{endTime}
              </Typography>
              <h5 className={classes.textWrap}>
                Kindly visit the portal during your slot
              </h5>
            </div>
            <div>
              <Button
                onClick={() => {
                  window.open(round2MgmtGDPLink, "_blank");
                }}
                disabled={btnDisabled}
                className={classes.btn}
              >
                JOIN ROOM
              </Button>
              <Button
                onClick={() => {
                  window.open(round2MgmtGDALink, "_blank");
                  // console.log(disableGDABtn);
                }}
                disabled={disableGDABtn}
                className={classes.btn}
              >
                GD
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.cardContent}>
            <div
              id="overlay"
              className={chooseSlot ? "visible-comp" : "invisible-comp"}
              onClick={() => {
                setChooseSlot(false);
              }}
            ></div>
            <div className={classes.cardTop}>
              <img
                className={classes.cardImg}
                src={inactiveClock}
                alt="clock"
              />
              <Typography className={classes.inactiveText}>
                Not Scheduled
              </Typography>
            </div>
            <ChooseSlot
              dateSelected={dateSelected}
              setDateSelected={(date) => setDateSelected(date)}
              notMoreThanOneSlot={() => notMoreThanOneSlot()}
              slots={slots}
              slotSubmit={() => slotSubmit()}
              chosenSlot={chosenSlot}
              setChosenSlot={setChosenSlot}
              chooseSlot={chooseSlot}
              loadingSlotSubmit={loadingSlotSubmit}
              setChooseSlot={(slot) => setChooseSlot(slot)}
              onSubmitFunct={() => {
                setChooseSlot(false);
              }}
            />
            <Button className={classes.btn} onClick={() => finalSubmit()}>
              CHOOSE SLOT
            </Button>
          </div>
        )}
      </Paper>
    );
  }

  if (roundNo === "2 (Tech/Design)") {
    return (
      <Paper className={classes.card}>
        <div className={classes.header}>Round {roundNo}</div>
        <Divider className={classes.divider} orientation="horizontal" />
        {projectLink ? (
          <div className={classes.cardContent}>
            {date ? (
              <div>
                <Typography>SCHEDULED TO</Typography>
                <Typography>
                  {date}, {startTime}-{endTime}
                </Typography>
                <h5 className={classes.textWrap}>
                  Kindly visit the portal during your slot
                </h5>
              </div>
            ) : (
              <div>
                <Typography>CONGRATULATIONS!</Typography>
                <h5 className={classes.textWrap}>
                  Project received for review!
                </h5>
                <h5 className={classes.textWrap}>
                  We will update you about your slot through mail.
                </h5>
              </div>
            )}

            <div>
              <Button
                onClick={() => {
                  window.open(projectLink, "_blank");
                }}
                disabled={btnDisabled}
                className={classes.btn}
              >
                View Proj
              </Button>
              <Button
                onClick={() => {
                  window.open(round2TechMeetLink, "_blank");
                }}
                disabled={disableR2TechMeet}
                className={classes.btn}
              >
                Join
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.cardContent}>
            <Button
              onClick={() => {
                toggleViewProjectModal();
                // console.log("modalvalue", viewProjectModal);
              }}
              className={classes.btn}
            >
              View Project
            </Button>
            <Button
              onClick={() => {
                toggleProjectModal();
                // console.log("modalvalue", projectModal);
              }}
              className={classes.btn}
            >
              Submit Project
            </Button>
          </div>
        )}
        <SubmitProject
          openModal={projectModal}
          toggleProjectModal={toggleProjectModal}
        />
        <ViewProject
          openModal={viewProjectModal}
          toggleProjectModal={toggleViewProjectModal}
          projectTitle={round2TechProjectTitle}
        />
      </Paper>
    );
  }

  return (
    <Paper className={classes.card}>
      <div className={classes.header}>Round {roundNo}</div>
      <Divider className={classes.divider} orientation="horizontal" />
      {status === "RD" ? (
        <div className={classes.cardContent}>
          <div>
            <Typography>SCHEDULED TO</Typography>
            <Typography>
              {date}, {startTime}-{endTime}
            </Typography>
            <h5 className={classes.textWrap}>
              Kindly visit the portal during your slot
            </h5>
          </div>
          <div>
            <Button
              onClick={btnOnClick}
              disabled={btnDisabled}
              className={classes.btn}
            >
              I'M READY NOW
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.cardContent}>
          <div className={classes.cardTop}>
            <img className={classes.cardImg} src={inactiveClock} alt="clock" />
            <Typography className={classes.inactiveText}>
              Not Scheduled
            </Typography>
          </div>
          <Button className={classes.btn}>CHOOSE SLOT</Button>
        </div>
      )}
    </Paper>
  );
};

export default NonStaticDashboardCard;
