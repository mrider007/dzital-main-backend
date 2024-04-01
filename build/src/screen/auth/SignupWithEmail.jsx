import React, { useState } from "react";
import Ads from "../../components/comon/Ads";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { toast } from 'react-toastify';

const SignupWithEmail = () => {
  const { RegisterUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [pname, setPname] = useState("");
  const navigate = useNavigate()

  const handelSignup = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!email || !password || !cpassword ||!pname) {
       toast.info("Please fill in all required fields");
       return;
    }

    if (!emailRegex.test(email)) {
        toast.info("Please input a valid Email");
        return; 
      }
      
      if (password.length < 8 || !passwordRegex.test(password)) {
        toast.info("Password must be at least 8 characters long and contain a special character");
        return;
      }

    if (password==!cpassword) {
        toast.info("password did not match with confirm password");
        return; 
      }else {
        RegisterUser(pname, email, password);
        navigate("/login");
        setEmail("");
        setPassword("");
        setcPassword("");
        setPname("");
        toast.success("Successfully registered!");
    } 
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
                  <p className="mb5">
                    <Link className="text-muted" to="/login">
                      <i className="fa fa-long-arrow-left" /> Back
                    </Link>
                  </p>
                  <h3>Sign up with Dzital</h3>
                  <div className="formBx">
                    <form className="px-md-1 mt30">
                      <div className="form-outline mb-4">
                        <label htmlFor="">
                          <b>Name</b> <span className="text text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          value={pname}
                          onChange={(e) => setPname(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="form-outline mb-3">
                        <label htmlFor="">
                          <b>Email</b> <span className="text text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="">
                          <b>Password</b> <span className="text text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="">
                          <b>Confirm Password</b> <span className="text text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          value={cpassword}
                          onChange={(e) => setcPassword(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="row mb-2 ">
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btnTheme width100 mb-1 mt-0"
                            style={{ background: "var(--theme-color)" }}
                            onClick={handelSignup}
                          >
                            Continue
                          </button>
                        </div>
                        <p className="text text-center mt20">
                      Already Have An Account ? <Link to={"/login"}> LogIn</Link>{" "}
                    </p>
                      </div>
                    </form>
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

export default SignupWithEmail;
