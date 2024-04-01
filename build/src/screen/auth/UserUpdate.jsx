import React, { useEffect, useState } from "react";
import Ads from "../../components/comon/Ads";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const UserUpdate = () => {
  const navigate = useNavigate();
  const { UserUpdate, userData } = useAppContext();

  const [email, setEmail] = useState(userData ? userData.email : "");
  const [gender, setGender] = useState(userData ? userData.gender : "");
  const [cpassword, setcPassword] = useState("");
  const [image, setImage] = useState(userData ? userData.image : "");
  const [mobile, setMobile] = useState(userData ? userData.mobile : "");
  const [pname, setPname] = useState(userData ? userData.name : "");

  console.log(userData);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    UserUpdate(pname, email, mobile, image, gender);
  };

  useEffect(() => {
    // If userData changes, update the state variables
    if (userData) {
      setEmail(userData.email);
      setGender(userData.gender);
      setImage(userData.image);
      setMobile(userData.mobile);
      setPname(userData.name);
    }
  }, [userData]);

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
                    <Link className="text-muted" to="/account">
                      <i className="fa fa-long-arrow-left" /> Back
                    </Link>
                  </p>
                  <h3>Update Your Profile</h3>
                  <div className="formBx">
                    <form className="px-md-1 mt30">
                      <div className="form-outline mb-3">
                        <b>Profile</b>
                        <label className="btn btn-outline-secondary col-md-12">
                          {image ? (
                            <div>
                              <img
                                src={image ? image : URL.createObjectURL(image)}
                                alt="Image 1"
                                height={50}
                                width={50}
                                className="img img-responsive mr-2"
                              />
                            </div>
                          ) : (
                            <div>
                              <i class="fa-regular fa-image"></i>
                              <span className="plus-sign">+</span>
                            </div>
                          )}
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            hidden
                          />
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="">
                          <b>Name</b>
                        </label>
                        <input
                          type="text"
                          value={pname}
                          onChange={(e) => setPname(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <Form.Group controlId="formGender">
                          <Form.Label>
                            <b>Gender</b>
                          </Form.Label>

                          <Form.Select
                            value={gender}
                            onChange={handleGenderChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </div>

                      <div className="form-outline mb-3">
                        <label htmlFor="">
                          <b>Email</b>
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
                          <b>Mobile</b>
                        </label>
                        <input
                          type="mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="row mb-2">
                        <div className="col-md-6">
                          <button
                            type="submit"
                            className="btn btnTheme width100 mb-1 mt-0"
                            style={{ background: "var(--theme-color)" }}
                            onClick={handelUpdate}
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
                        type="button"
                        id="button-addon2"
                      >
                        Button
                      </button>
                    </div>
                    {/* Forgot Password part start */}
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

export default UserUpdate;
