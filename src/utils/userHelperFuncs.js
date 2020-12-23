/* eslint-disable */
import instance from "../apis/recruitmentApi";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
//testingmain
export async function toastError(errorMessage) {
  toast.dark(errorMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
export async function toastSuccess(message) {
  toast.dark(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
async function checkEmail(email) {
  const emailRegex = RegExp("^[a-zA-Z0-9.]*2020[a|b]?@vitstudent.ac.in$");
  if (!regnoRegex.test(regNo)) {
    toast.dark(
      "Please ensure you are a fresher and are using your vit email id!",
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    return false;
  }
  return true;
}
async function checkRegNo(regNo) {
  const regex = RegExp("^[2][0][b|B]([a-zA-Z]){2}([0-9]){4}$");
  if (!regex.test(regNo)) {
    toastError(
      "Please ensure you are a fresher and are entering the right registration number!"
    );
    return false;
  }
  return true;
}
export async function signUpUser(
  regNo,
  email,
  pass,
  confirmPass,
  signUpIndicator,
  cookies,
  setCookie,
  removeCookie,
  setLoading,
  recaptchaToken
) {
  return new Promise((resolve, reject) => {
    setLoading(true);
    let userdets = {};
    let path = "";
    if (signUpIndicator === true) {
      const emailRegex = RegExp("^[a-zA-Z0-9.]*2020[a|b]?@vitstudent.ac.in$");
      const regnoRegex = RegExp("^[2][0][b|B]([a-zA-Z]){2}([0-9]){4}$");
      if (regNo === "" || email === "" || pass === "") {
        toastError("Please fill all the fields!");
        setLoading(false);
        return;
      }
      if (!regnoRegex.test(regNo)) {
        toastError(
          "Please ensure you are a fresher and are entering the right registration number!"
        );
        setLoading(false);
        return;
      }
      if (!emailRegex.test(email)) {
        toastError(
          "Please ensure you are a fresher and are using your vit email id!"
        );
        setLoading(false);
        return;
      }
      if (pass.length < 8) {
        toastError("The password must be atleast 8 characters long!");
        setLoading(false);
        return;
      }
      if (pass !== confirmPass) {
        toastError("The password and confirm password don't match!");
        setLoading(false);
        return;
      }
      userdets = {
        regNo: regNo,
        email: email,
        password: pass,
        token: recaptchaToken,
      };
      path = "/api/register";
    } else {
      if (regNo === "" || pass === "") {
        toastError("Please fill all the fields!");
        setLoading(false);
        return;
      }
      const regnoRegex = RegExp("^[2][0][b|B]([a-zA-Z]){2}([0-9]){4}$");
      if (!regnoRegex.test(regNo)) {
        toastError(
          "Please ensure you are a fresher and are entering the right registration number!"
        );
        setLoading(false);
        return;
      }
      userdets = {
        regNo: regNo,
        password: pass,
      };
      path = "/api/login";
    }
    const jsonUserDets = JSON.stringify(userdets);
    instance
      .post(path, jsonUserDets, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (!signUpIndicator && resp.data.message === "Incorrect Password!") {
          toastError("Incorrect Password!");
          setLoading(false);
        } else {
          if (signUpIndicator) {
            toastSuccess(
              "We've sent you a verification mail. Kindly verify to login."
            );
            setLoading(false);
          } else {
            if (resp.data.message === "Please verify Email Address") {
              toastError("Please verify your Email Address!");
              setLoading(false);
            } else {
              setCookie("token", resp.data.data.token, { path: "/" });
              window.open("/form", "_self");
            }
          }
        }
      })
      .then(() => {
        // window.location.reload();
      })
      .catch((err) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        if (signUpIndicator) {
          toastError(
            "Please ensure all details are entered properly. If you already have an account, please log in instead of signing up!"
          );
          setLoading(false);
        } else {
          toastError(
            "Please ensure all details are entered properly. If you don't have an account, please sign up before logging in!"
          );
          setLoading(false);
        }
      });
    return;
  });
}
export async function forgotPasswordUtil(email, resendingOtp) {
  const emailRegex = RegExp("^[a-zA-Z0-9.]*2020[a|b]?@vitstudent.ac.in$");
  if (email === "") {
    toastError("Please enter an email ID!");
    return false;
  }
  if (!emailRegex.test(email)) {
    toastError(
      "Please ensure you are a fresher and are using your vit email id!"
    );
    return false;
  }

  const emailObject = {
    email: email,
  };
  const jsonEmailObject = JSON.stringify(emailObject);
  const res = await instance
    .post("/api/forgotPassword", jsonEmailObject, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {});
  if (res == null) {
    if (resendingOtp) {
      toastError("Too many requests!");
    } else {
      toastError("Please ensure you have an account here!");
    }
    return false;
  } else {
    if (res.status === 200) {
      if (resendingOtp) {
        toastSuccess("OTP resent!");
      }
      return true;
    } else if (res.status === 400) {
      if (resendingOtp) {
        toastError("Too many requests!");
      } else {
        toastError("Please ensure you have an account here!");
      }
      return false;
    } else {
      return false;
    }
  }
}

export async function otpVerifUtil(email, otp) {
  const otpRegex = RegExp("^[0-9]{6}$");
  if (otp === "") {
    toastError("Please enter the OTP!");
    return false;
  }
  if (!otpRegex.test(otp)) {
    toastError("Invalid OTP! OTP might have expired!");
    return false;
  }
  const otpObject = { emailId: email, otp: Number(otp) };
  const res = await instance
    .post("/api/verifyotp", otpObject, {})
    .catch((err) => {});
  if (res == null) {
    toastError("Invalid OTP! OTP might have expired!");
    return false;
  } else if (res.status === 200) {
    return true;
  } else {
    toastError("Invalid OTP! OTP might have expired!");
    return false;
  }
}

export async function ResetPasswordUtil(email, otp, pass, confirmPass) {
  if (pass.length < 8) {
    toastError("The password must be atleast 8 characters long!");
    return ["pass", false];
  }
  if (pass !== confirmPass) {
    toastError("The password and confirm password don't match!");
    return ["pass", false];
  }
  const restPassObject = { otp: Number(otp), emailId: email, password: pass };
  const res = await instance
    .post("/api/resetPassword", restPassObject, {})
    .catch((err) => {});
  if (res == null) {
    await toastError(
      "Please try again. OTP might have expired. Redirecting in 3 secs!"
    );
    await setTimeout(() => {
      window.href = "/forgot-password";
    }, 4000);
    return ["otp", false];
  }
  if (res.status === 200) {
    await toastSuccess(
      "Password Changed succesfully! Redirecting to login screen in 3 secs!"
    );
    await setTimeout(() => {
      window.href = "/";
    }, 4000);
    return ["otp", true];
  } else {
    await toastError(
      "Please try again. OTP might have expired. Redirecting in 3 secs!"
    );
    await setTimeout(() => {
      window.href = "/forgot-password";
    }, 4000);
    return ["otp", false];
  }
}
