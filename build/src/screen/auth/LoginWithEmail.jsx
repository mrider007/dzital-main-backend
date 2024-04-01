import React, { useState } from "react";
import Ads from "../../components/comon/Ads";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { Alert } from "react-bootstrap";
import { toast } from 'react-toastify';

const LoginWithEmail = () => {
  const { LoginUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showInvalidEmailError, setShowInvalidEmailError] = useState(false);

  const handelGmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.info("Please fill in all required fields");
      return;
    }

    // Check if the email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.info("Please input a valid Email");
      return;
    }

    // Call LoginUser if validation passes
    setShowError(false);
    setShowInvalidEmailError(false);
    LoginUser(email, password);
  };


  const handelchange = (e) => {
    setEmail(e.target.value)
    setShowError(false)
    setShowInvalidEmailError(false)
  }

  const handelPchnage = (e) => {
    setPassword(e.target.value)
    setShowError(false)
    setShowInvalidEmailError(false)
  }

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
                  <p className="mb5">
                    <Link className="text-muted" to="/login">
                      <i className="fa fa-long-arrow-left" /> Back
                    </Link>
                  </p>
                  {/* <h3>Continue with your email or username</h3> */}
                  <div className="formBx">
                    <form className="px-md-1 mt30">
                      {/* <Alert variant="danger" show={showError}>
                        Please enter both email/username and password.
                      </Alert>
                      <Alert variant="danger" show={showInvalidEmailError}>
                        Please enter a valid email address.
                      </Alert> */}
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
                              data-bs-toggle="collapse"
                              to="#forgotPassword"
                            >
                              Forgot Password
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                    {/* Forgot Password part start */}
                    <div className="input-group collapse" id="forgotPassword">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn btnTheme"
                        style={{ backgroundColor: "var(--theme-color)" }}
                        type="button"
                        id="button-addon2"
                      >
                        Button
                      </button>
                    </div>
                    {/* Forgot Password part end */}
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

export default LoginWithEmail;
