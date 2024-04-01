import React, { useState } from "react";
import Ads from "./../../components/comon/Ads";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { auth, provider, facebookProvider } from "../../components/firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const { LoginUser, SocialLoginUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotEmail, setShowForgotEmail] = useState(false);

  const handelGmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.info("Please fill in all required fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.info("Please input a valid Email");
      return;
    }
    LoginUser(email, password);
  };

  const handelchange = (e) => {
    setEmail(e.target.value);
  };

  const handelPchnage = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.info("Please enter your email");
      return;
    }

    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        toast.success("Password reset email sent. Please check your mail.");
        setForgotEmail("");
        setShowForgotEmail(false);
      })
      .catch((error) => {
        toast.error("Error sending password reset email");
      });
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        SocialLoginUser(result.user.email, result.user.uid, 'google', result.user.displayName, result.user.photoURL,)
      }).catch((error) => {
      });
  };

  const handleLoginface = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        SocialLoginUser(result.user.email, result.user.uid, 'facebook');
      }).catch((error) => {
      });
  };

  const toggleForgotEmail = () => {
    setShowForgotEmail(!showForgotEmail);
  };

  return (
    <>
      <section className="midBody">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* mid part start */}
            <div className="col-md-10">
              <div className="box-form">
                <div
                  className="left"
                  style={{
                    background:
                      "url(./assets/images/login-bg.jpg) center bottom",
                  }}
                >
                  <div className="overlay">
                    <h1>Success starts here</h1>
                    <ul>
                      <li>Over 600 categories</li>
                      <li>Pay per project, not per hour</li>
                      <li>Access to talent and businesses across the globe</li>
                    </ul>
                  </div>
                </div>
                <div className="right">
                  <h3>Sign in to your account</h3>
                  <div className="formBx mt-5">
                    <div className="formBx">
                      <form className="px-md-1 ">
                        <div className="form-outline mb-3">
                          <label htmlFor="">
                            <b>Email or username</b>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={handelchange}
                            className="form-control"
                            required={true}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="">
                            <b>Password</b>
                          </label>
                          <input
                            type="password"
                            value={password}
                            onChange={handelPchnage}
                            className="form-control"
                            required={true}
                          />
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-6">
                            <button
                              type="submit"
                              className="btn btnTheme width100 mb-1 mt-0"
                              style={{ background: "var(--theme-color)" }}
                              onClick={handelGmailLogin}
                            >
                              Continue
                            </button>
                          </div>
                          <div className="col-md-6">
                            <p className="mt-1" align="right">
                              <Link
                                className="text14 text-muted"
                                onClick={toggleForgotEmail}
                                to="#"
                              >
                                Forgot Password
                              </Link>
                            </p>
                          </div>
                        </div>
                        {showForgotEmail && (
                          <div className="form-outline mb-3">
                            <label htmlFor="">
                              <b>Recipient's email</b>
                            </label>
                            <input
                              type="email"
                              value={forgotEmail}
                              onChange={(e) => setForgotEmail(e.target.value)}
                              className="form-control"
                              required={true}
                            />
                          </div>
                        )}
                        {showForgotEmail && (
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <button
                                type="button"
                                className="btn btnTheme width100 mb-1 mt-0"
                                style={{ background: "var(--theme-color)" }}
                                onClick={handleForgotPassword}
                              >
                                Send Reset Email
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                    <h4 className="text-muted mb40 " align="center">
                      OR
                    </h4>
                    <div className="row">
                      <div className="col-sm-12 col-lg-6">
                        <Link onClick={handleLogin} className="btn btn-light width100 mb20 d-flex gap-1 mb-20 align-items-center justify-content-center" to="#.">
                          <img src="./assets/images/google.svg" width="16" alt="" className="google-icon" />
                          <span>Google</span>
                        </Link>
                      </div>
                      <div className="col-sm-12 col-lg-6">
                        <button
                          className="btn btn-light width100 mb20 d-flex gap-1 mb-20 align-items-center justify-content-center"
                          onClick={handleLoginface}
                        >
                          <img
                            src="./assets/images/facebook.svg"
                            width={16}
                            alt=""
                          />
                          <span>Facebook</span>
                        </button>
                      </div>
                    </div>
                    <p className="text text-center">
                      Don't An have Accout ? <Link to={"/singup"}> SignUp</Link>{" "}
                    </p>
                  </div>
                  <p className="text14 text-muted">
                    By joining, you agree to the Dzital Terms of Service and to
                    occasionally receive emails from us. Please read our Privacy
                    Policy to learn how we use your personal data.
                  </p>
                </div>
              </div>
            </div>
            {/* mid part end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>
  );
};

export default Login;
