import React, { useEffect, useState } from "react";
import instance from "../../apis/recruitmentApi";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Redirect } from "react-router-dom";
import { toastError, toastSuccess } from "../../utils/userHelperFuncs";
import StaticDashboardCard from "../../uiComponents/StaticDashboardCard/StaticDashboardCard";
import NonStaticDashboardCard from "../../uiComponents/NonStaticDashboardCard/NonStaticDashboardCard";
import instr_logo from "../../assets/instr_logo.svg";

//materialuistuff

//end of materialuistuff

// import RoundDetails from "../../uiComponents/RoundDetails/RoundDetails";
// import InterviewReady from "../../uiComponents/Modal/InterviewReady";

import "./dashboard.css";
import Instructions from "../../uiComponents/Modal/Instructions";

const Dashboard = (props) => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [showInstr, setShowInstr] = useState(false);
  const [name, setName] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [prev, setPrev] = useState(false);
  const [goToForm, setGoToForm] = useState(false);
  const [goToLanding, setGoToLanding] = useState(false);
  const [round1Status, setRound1Status] = useState("LD");
  const [round2MgmtStatus, setRound2MgmtStatus] = useState("LD");
  const [round2NonMgmtStatus, setRound2NonMgmtStatus] = useState("LD");
  const [round3Status, setRound3Status] = useState("LD");

  const [round1StartTime, setRound1StartTime] = useState("");
  const [round1EndTime, setRound1EndTime] = useState("");
  const [round1Date, setRound1Date] = useState("");

  const [round2MgmtStartTime, setRound2MgmtStartTime] = useState("");
  const [round2MgmtEndTime, setRound2MgmtEndTime] = useState("");
  const [round2MgmtDate, setRound2MgmtDate] = useState("");

  const [round2NonMgmtStartTime, setRound2NonMgmtStartTime] = useState("");
  const [round2NonMgmtEndTime, setRound2NonMgmtEndTime] = useState("");
  const [round2NonMgmtDate, setRound2NonMgmtDate] = useState("");

  const [round3StartTime, setRound3StartTime] = useState("");
  const [round3EndTime, setRound3EndTime] = useState("");
  const [round3Date, setRound3Date] = useState("");

  const [round1SlotTime, setRound1SlotTime] = useState(false);
  const [round2MgmtSlotTime, setRound2MgmtSlotTime] = useState(false);

  const [round2MgmtGDPLink, setRound2MgmtGDPLink] = useState("");

  const [round2TechProjectLink, setRound2TechProjectLink] = useState(null);
  const [round2TechMeetLink, setRound2TechMeetLink] = useState("");
  const [round2TechProjectTitle, setRound2TechProjectTitle] = useState(null);

  const history = useHistory();

  /*useEffect(() => {
    if (props.location.state == null) {
    } else if (props.location.state.redirected === true) {
      setShowInstr(true);
    }
  }, [props.location.state]);*/

  //checking if form filled or not -redirect accordingly

  useEffect(() => {
    if (cookies.token === "undefined" || cookies.token == null) {
      setLoadingScreen(false);
      setPrev(true);
    } else {
      const checkFilled = async () => {
        instance
          .get("/api/r0/filledform", {
            headers: { Authorization: `Bearer ${cookies.token}` },
          })
          .then((response) => {
            if (!response.data.data) {
              setLoadingScreen(false);
              setGoToForm(true);
            } else {
            }
          })
          .catch(() => {
            setLoadingScreen(false);
            setPrev(true);
          });
      };
      checkFilled();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    instance
      .get("/api/user/dashboard", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(function (response) {
        const { data } = response.data;
        // console.log(data.round0Status);
        if (!data.round0Status) {
          setLoadingScreen(false);
          return history.push("/form-screen");
        }
        // console.log("dashboard", data);
        setName(data.user.name);

        setRound1Status(data.round1Status);
        setRound2MgmtStatus(data.round2MgmtStatus);
        // setRound2MgmtStatus("RD");
        setRound2NonMgmtStatus(data.round2NonMgmtStatus);
        setRound3Status(data.round3Status);

        if (data.round1Status === "RD") {
          setRound1StartTime(data.slots.round1.timeFrom);
          setRound1EndTime(data.slots.round1.timeTo);
          setRound1Date(data.slots.round1.date);
        }

        if (data.project && data.project.puid && data.project.puid !== 1) {
          // console.log("project dedo");
          setRound2NonMgmtStatus("RD");
          setRound2TechProjectLink(data.user.projectLink);
          setRound2TechProjectTitle(data.project.title);
        }

        if (data.round2NonMgmtStatus === "RD") {
          // console.log("round 2 non mgmt");
          setRound2TechProjectLink(data.user.projectLink);
          setRound2TechMeetLink(data.adminMeetLink);
          // console.log("project", data.user.projectLink);
          // console.log("admin meet", data.adminMeetLink);
          setRound2TechProjectTitle(data.project.title);
        }

        if (data.slots.round2Mgmt) {
          // console.log("supposed to happen - round2management");
          setRound2MgmtStartTime(data.slots.round2Mgmt.timeFrom || "");
          setRound2MgmtEndTime(data.slots.round2Mgmt.timeTo || "");
          setRound2MgmtDate(data.slots.round2Mgmt.date || "");
          setRound2MgmtGDPLink(data.slots.round2Mgmt.gdpLink);
        } else {
          // console.log("yay");
        }

        if (data.slots.round2NonMgmt) {
          setRound2NonMgmtStartTime(data.slots.round2NonMgmt.timeFrom || "");
          setRound2NonMgmtEndTime(data.slots.round2NonMgmt.timeTo || "");
          setRound2NonMgmtDate(data.slots.round2NonMgmt.date || "");
        } else {
          // console.log("yay");
        }

        if (data.slots.round3) {
          setRound3StartTime(data.slots.round3.timeFrom || "");
          setRound3EndTime(data.slots.round3.timeTo || "");
          setRound3Date(data.slots.round3.date || "");
        } else {
          // console.log("yay");
        }
        setLoadingScreen(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoadingScreen(false);
        toastError("Something went wrong. Please try again!");
      });
  }, [cookies.token, history]);

  // round 1

  useEffect(() => {
    if (round1Status === "RD") {
      // console.log("Checking R1 slottime");

      instance
        .get("/api/r0/verifyslotTime", {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(function (response) {
          const { data } = response.data;
          setRound1SlotTime(data);
          // console.log("Round1 slot verify", data);
        })
        .catch(function (err) {
          console.log(err);
          // toastError("Something went wrong, Please try again ");
        });
    }
  }, [cookies.token, round1Status]);

  const onR1Ready = () => {
    instance
      .get("/api/r1/ready", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(function (response) {
        const { data } = response.data;
        // console.log("! am readyyy", data);
        if (data) {
          toastSuccess(
            "Great. You’ll receive an email shortly, keep checking your inbox for the meeting link. You can not give an interview if your slot has passed"
          );
        }
      })
      .catch(function (err) {
        console.log(err);
        toastError("Something went wrong, Please try again ");
      });
  };

  // round 2

  useEffect(() => {
    if (round2MgmtStatus === "RD") {
      // console.log("Checking R2 mgmt slottime");
      instance
        .get("/api/r2/verifyslotTime", {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(function (response) {
          const { data } = response.data;
          setRound2MgmtSlotTime(data);
          // console.log("Round1 slot verify", data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [cookies.token, round2MgmtStatus]);

  const onLogout = () => {
    removeCookie("token");
    setGoToLanding(true);
  };

  if (loadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <div id="dashboard-container">
      {goToLanding ? <Redirect push to="/" /> : null}
      <div id="dashboard-header">
        <div
          id="instr-logo"
          style={{ "align-self": "center" }}
          onClick={() => {
            // console.log("supposedto show");
            setShowInstr(true);
          }}
        >
          <img src={instr_logo} alt="i" />
        </div>
        <div id="logout-btn" onClick={onLogout}>
          Logout
        </div>
      </div>
      <div id="dashboard-body">
        <div id="dashboard-welcome-message">
          <h1>Hi {name},</h1>
          <p>
            Here is the roadmap for IEEE VIT’s core committee selections. Make
            sure to keep an eye on your progress regularly.
          </p>
        </div>
        <div id="round-details" className="blue-scroll">
          {round1Status.match(/^(AR|RR|PR|LD|MS|ER)$/) ? (
            <StaticDashboardCard status={round1Status} roundNo="1" />
          ) : (
            <NonStaticDashboardCard
              status={round1Status}
              roundNo="1"
              toastError={toastError}
              date={round1Date}
              startTime={round1StartTime}
              endTime={round1EndTime}
              btnDisabled={!round1SlotTime}
              btnOnClick={onR1Ready}
            />
          )}
          {round2MgmtStatus.match(/^(AR|RR|PR|LD|MS|ER)$/) ? (
            <StaticDashboardCard
              status={round2MgmtStatus}
              roundNo="2 (Management)"
            />
          ) : (
            <NonStaticDashboardCard
              status={round2MgmtStatus}
              // if round no is changed please change in component too
              roundNo="2 (Management)"
              toastError={toastError}
              date={round2MgmtDate}
              startTime={round2MgmtStartTime}
              endTime={round2MgmtEndTime}
              btnDisabled={!round2MgmtSlotTime}
              round2MgmtGDPLink={round2MgmtGDPLink}
            />
          )}
          {round2NonMgmtStatus.match(/^(AR|RR|PR|LD|MS|ER)$/) ? (
            <StaticDashboardCard
              status={round2NonMgmtStatus}
              roundNo="2 (Tech/Design)"
            />
          ) : (
            <NonStaticDashboardCard
              status={round2NonMgmtStatus}
              // if round no is changed please change in component too
              roundNo="2 (Tech/Design)"
              toastError={toastError}
              date={round2NonMgmtDate}
              startTime={round2NonMgmtStartTime}
              endTime={round2NonMgmtEndTime}
              projectLink={round2TechProjectLink}
              round2TechMeetLink={round2TechMeetLink}
              round1Status={round1Status}
              round2TechProjectTitle={round2TechProjectTitle}
            />
          )}
          {round3Status.match(/^(AR|RR|PR|LD|MS|ER)$/) ? (
            <StaticDashboardCard status={round3Status} roundNo="3" />
          ) : (
            <NonStaticDashboardCard
              status={round3Status}
              toastError={toastError}
              roundNo="3"
              date={round3Date}
              startTime={round3StartTime}
              endTime={round3EndTime}
            />
          )}

          {/* <InterviewReady /> */}
          {prev ? <Redirect push to="/" /> : null}
          {goToForm ? <Redirect push to="/form-screen" /> : null}
          {!showInstr ? null : (
            <Instructions setShowInstr={setShowInstr} showInstr={showInstr} />
          )}
          <div className="absolute-pos">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              style={{ padding: "12px 12px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
