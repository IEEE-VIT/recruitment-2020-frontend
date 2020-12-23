import React, { useState, useEffect } from "react";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import success from "../../assets/success.png";
import { Redirect, useHistory } from "react-router-dom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FormComponent1 from "../../uiComponents/FormComponent1/FormComponent1";
import FormComponent2 from "../../uiComponents/FormComponent2/FormComponent2";
import FormComponent3 from "../../uiComponents/FormComponent3/FormComponent3";
import FormComponent4 from "../../uiComponents/FormComponent4/FormComponent4";
import ChooseSlot from "../../uiComponents/ChooseSlot/ChooseSlot";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import LoadingIndicator from "../../uiComponents/LoadingIndicator/LoadingIndicator";
import instance from "../../apis/recruitmentApi";
import { ToastContainer, toast } from "react-toastify";
import { toastError } from "../../utils/userHelperFuncs";
import { useCookies } from "react-cookie";
import "./formScreen.css";

const FormScreen = () => {
  const [counter, setCounter] = useState(1);
  const [name, setName] = useState("");
  const [phNo, setPhNo] = useState("");
  const [coreDomains, setCoreDomains] = useState([]);
  const [domains, setDomains] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [chooseSlot, setChooseSlot] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [slots, setSlots] = useState({ "": [{ timeTo: "", timeFrom: "" }] });
  const [dateSelected, setDateSelected] = useState("");
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [filledForm, setFilledForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSlotSubmit, setLoadingSlotSubmit] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  /*format : {"20dec" : [{timefrom: ,timeto : ,suid : },...] , "21dec" : [{}]}*/
  const [chosenSlot, setChosenSlot] = useState("");
  //   const [questions, setQuestions] = useState([]);
  const [cookies, removeCookie] = useCookies(["token"]);
  const phNoRegex = RegExp("^[9876][0-9]{9}$");

  const history = useHistory();

  useEffect(() => {
    /*window.addEventListener('keydown',(e)=>{
      if(e.key==="ArrowUp"){
        decrCounter();
      }
      else if(e.key==="ArrowDown"){
        incrCounter();
      }
      else if(e.key==="Enter"){
        incrCounter();
      }
    }) ---> gives required field all the time*/
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
              instance
                .get("/api/r0/question", {
                  headers: { Authorization: `Bearer ${cookies.token}` },
                })
                .then((response) => {
                  setQuestions(response.data.data);
                  let answersObj = [];
                  for (let i = 0; i < response.data.data.length; i++) {
                    answersObj.push({
                      quid: response.data.data[i]["quid"].toString(),
                      answer: "",
                    });
                  }
                  setAnswers(answersObj);
                  setLoadingScreen(false);
                })
                .catch((err) => {
                  setLoadingScreen(false);
                  toastError("Something went wrong. Please try again!");
                });
            } else {
              setLoadingScreen(false);
              setNext(true);
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
  function onKeyDownFunction(e) {
    /*if (e.key === "ArrowUp") {
      decrCounter();
    } else if (e.key === "ArrowDown") {
      incrCounter();
    } if (e.key === "Enter") {
      incrCounter();
    } ---disbled because uparrow,downarrow,enter all are used in the multilineanswrrs*/
  }
  function finalSubmit() {
    setLoading(true);
    setFilledForm(true);
    instance
      .get("/api/r0/allslots", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(function (response) {
        const reqJob = async () => {
          await setChosenSlot("");
          if (
            response.data.data === "" ||
            response.data.message === "No Valid Slot available"
          ) {
            toastError("Sorry. No slots available!");
          } else {
            await setDateSelected(response.data.data[0].date);
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
            await setSlots(finalSlots);
            await setChooseSlot(true);
          }
          setLoading(false);
        };
        reqJob();
      })
      .catch(function (err) {
        toastError("Something went wrong. Please try again!");
        setLoading(false);
      });
  }

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  function slotSubmit() {
    setLoadingSlotSubmit(true);
    if (chosenSlot === "") {
      toastError("Please select a slot!");
      setLoadingSlotSubmit(false);
    } else {
      let finalResp = {
        name: toTitleCase(name),
        phoneNo: phNo,
        suid: chosenSlot,
        coreDomains: coreDomains,
        specificDomains: domains,
        questions: answers,
      };
      instance
        .post("/api/r0/form", finalResp, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(function (response) {
          setLoadingSlotSubmit(false);
          setChooseSlot(false);
          setShowConfirmed(true);
          setTimeout(() => {
            setNext(true);
            history.push("/instructions");
          }, 3000);
        })
        .catch(function (err) {
          setLoadingSlotSubmit(false);
          setChooseSlot(false);
          toastError(err.response.data.message);
        });
    }
  }
  function notMoreThanOneSlot() {
    toastError("You can't select more than one slot!");
  }
  function phNoFieldToast() {
    toast.dark("Please enter a valid 10 digit Indian Phone Number!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function requiredFieldToast() {
    toast.dark("This is a required field!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function testEverythingCool() {
    if (counter === 1 && name === "") {
      requiredFieldToast();
      return false;
    } else if (counter === 2 && phNo === "") {
      requiredFieldToast();
      return false;
    } else if (counter === 2 && !phNoRegex.test(phNo)) {
      phNoFieldToast();
      return false;
    } else if (counter === 3 && domains.length === 0) {
      requiredFieldToast();
      return false;
    } else if (counter > 3) {
      if (questions[counter - 4]["mandatory"]) {
        let goForward = false;
        for (var i = 0; i < answers.length; i++) {
          if (
            answers[i]["quid"].toString() ===
            questions[counter - 4]["quid"].toString()
          ) {
            if (answers[i]["answer"].trim().length!==0) {
              goForward = true;
            }
            break;
          }
        }
        if (!goForward) {
          requiredFieldToast();
        }
        return goForward;
      } else {
        return true;
      }
    }
    return true;
  }

  function incrCounter() {
    if (counter !== questions.length + 3) {
      if (testEverythingCool()) {
        setCounter(counter + 1);
      }
    } else {
      finalSubmit();
    }
  }

  function decrCounter() {
    if (counter !== 1) {
      setCounter(counter - 1);
    }
  }

  const onLogout = () => {
    removeCookie("token");
    history.push("/");
  };

  if (loadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <div id="form-screen-container" onKeyDown={(e) => onKeyDownFunction(e)}>
      <div
        id="overlay"
        className={
          showConfirmed || chooseSlot ? "visible-comp" : "invisible-comp"
        }
        onClick={() => {
          setChooseSlot(false);
        }}
      ></div>
      <ChooseSlot
        dateSelected={dateSelected}
        setDateSelected={(date) => setDateSelected(date)}
        notMoreThanOneSlot={() => notMoreThanOneSlot()}
        slots={slots}
        slotSubmit={() => slotSubmit()}
        chosenSlot={chosenSlot}
        setChosenSlot={setChosenSlot}
        loadingSlotSubmit={loadingSlotSubmit}
        chooseSlot={chooseSlot}
        setChooseSlot={(slot) => setChooseSlot(slot)}
        onSubmitFunct={() => {
          setShowConfirmed(true);
          setChooseSlot(false);
        }}
      />
      <div
        id="confirmation-screen"
        className={
          showConfirmation && !showConfirmed ? "visible-comp" : "invisible-comp"
        }
      >
        <h2>Are you sure you want to submit ?</h2>
        <div id="confirmation-btns">
          <h4 onClick={() => setShowConfirmation(false)}>Take me back</h4>
          <div onClick={() => setShowConfirmed(true)}>Yes, submit my form</div>
        </div>
      </div>
      <div
        id="confirmed-screen"
        className={showConfirmed ? "visible-comp" : "invisible-comp"}
      >
        <img src={success} alt="success img" />
        <h2>Your form has been submitted successfully</h2>
        <h4>
          You will be redirected to{" "}
          <span
            onClick={() => setNext(true)}
            style={{ color: "#0088FF", cursor: "pointer" }}
          >
            dashboard
          </span>{" "}
          in 5 secs...
        </h4>
      </div>
      <div id="form-header">
        <a href="https://ieeevit.org" target="_blank" rel="noreferrer noopener">
          <img src={ieee_vit_logo} alt="logo" />
        </a>
        <div id="form-logout-btn" onClick={() => onLogout()}>
          Logout
        </div>
      </div>
      <div id="form-components">
        <div className={counter === 1 ? "visible-comp" : "invisible-comp"}>
          <FormComponent1 name={name} setName={(newName) => setName(newName)} />
        </div>
        <div className={counter === 2 ? "visible-comp" : "invisible-comp"}>
          <FormComponent3
            phNo={phNo}
            required={true}
            mandatory={true}
            setPhNo={(newPhNo) => setPhNo(newPhNo)}
            compno={counter}
            question="Please enter your phone number."
          />
        </div>
        <div className={counter === 3 ? "visible-comp" : "invisible-comp"}>
          <FormComponent2
            domains={domains}
            coreDomains={coreDomains}
            setCoreDomains={(newCoreDomains) => {
              setCoreDomains(newCoreDomains);
            }}
            setDomains={(domain) => {
              setDomains(domain);
            }}
          />
        </div>
        {questions.map((data, index) => {
          return (
            <div
              className={
                counter === index + 4 ? "visible-comp" : "invisible-comp"
              }
            >
              <FormComponent4
                quid={data.quid}
                counter={counter}
                answers={answers}
                setAnswers={setAnswers}
                question={data.question}
                compno={index + 4}
                mandatory={data.mandatory}
              />
            </div>
          );
        })}
      </div>
      <div id="form-footer">
        <div id="form-footer-content">
          <div
            id="form-submit-btn"
            onClick={() => finalSubmit()}
            className={
              counter !== questions.length + 3 ? "disabled-comp" : "dummy-class"
            }
          >
            {loading ? <LoadingIndicator /> : "Submit"}
          </div>
          <div id="page-arrows">
            <div
              id="icon-up"
              className={counter === 1 ? "disabled-arrow" : "dummy-class"}
              onClick={decrCounter}
            >
              <KeyboardArrowUpIcon id="icon-size" />
            </div>
            <div
              id="icon-down"
              className={
                counter === questions.length + 3
                  ? "disabled-arrow"
                  : "dummy-class"
              }
              onClick={incrCounter}
            >
              <KeyboardArrowDownIcon id="icon-size" />
            </div>
          </div>
        </div>
        <div
          id="completion-indicator"
          style={{ width: (100 * counter) / (questions.length + 3) + "vw" }}
        ></div>
      </div>
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
      {prev ? <Redirect push to="/" /> : null}
      {next ? (
        <Redirect
          push
          to={{ pathname: "/dashboard", state: { redirected: filledForm } }}
        />
      ) : null}
    </div>
  );
};

export default FormScreen;
