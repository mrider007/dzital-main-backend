import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Ads from '../../components/comon/Ads';

const ContactUs = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(true);
      }, 2000);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Contact Us</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">Contact Us</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      {/* page header part end here */}
      {/* page body part start */}
      <section className="midBody bgtheme">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/**************** Body part start ****************/}
            {loading === false ? (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="col-md-10">
                {/* first part start */}
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="m0">Get in touch with us</h4>
                      </div>
                      <form className="card-body">
                        <div className="form-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="nm"
                            placeholder="Name"
                            required=""
                            autoFocus=""
                          />
                        </div>
                        <div className="form-group form_left mb-4">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="em"
                            placeholder="Email"
                            required=""
                          />
                        </div>
                        <div className="form-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            maxLength={10}
                            placeholder="Mobile No."
                            required=""
                          />
                        </div>
                        <div className="form-group mb-4">
                          <textarea
                            className="form-control textarea-contact"
                            rows={5}
                            id="comment"
                            name="FB"
                            placeholder="Type Your Message/Feedback here..."
                            required=""
                            defaultValue={""}
                          />
                          <br />
                          <button className="btn btnTheme" type="submit" style={{ background: "var(--theme-color)" }}>
                            {" "}
                            Submit Message <span className="fa fa-send" />{" "}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5071.152286297458!2d7.677349994282403!3d50.542054854758454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be85ab5e065037%3A0x2116fb58113383e5!2s56269%20Dierdorf-Br%C3%BCckrachdorf%2C%20Germany!5e0!3m2!1sen!2sin!4v1702715002839!5m2!1sen!2sin"
                      width="100%"
                      height={480}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                {/* first part end */}
                {/* information part start here */}
                <div className="row">
                  {/* item start */}
                  <div className="col-md-4">
                    <div className="addIfoBx">
                      <div className="card mt-3">
                        <div className="card-body">
                          <i className="fa fa-envelope mb-3" />
                          <h5 className="card-title">Email Id</h5>
                          <p className="card-text">
                            <a to="mailto:support@dzital.de">support@dzital.de</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="col-md-4">
                    <div className="addIfoBx">
                      <div className="card mt-3">
                        <div className="card-body">
                          <i className="fa fa-phone mb-3" />
                          <h5 className="card-title">Phone No.</h5>
                          <p className="card-text">
                            <a to="tel:03341816636">03341816636</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="col-md-4">
                    <div className="addIfoBx">
                      <div className="card mt-3">
                        <div className="card-body">
                          <i className="fa fa-location-dot mb-3" />
                          <h5 className="card-title">Office Address</h5>
                          <p className="card-text">12345 Brückrachdorf Germany</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                </div>
                {/* information part end here */}
              </div>
            )}
            {/**************** Body part end ****************/}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>

  )
}

export default ContactUs