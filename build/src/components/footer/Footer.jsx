import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        {/* Footer Top Start */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <h5>Useful Links</h5>
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/">
                          <i className="fa fa-caret-right" /> Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/about-us">
                          <i className="fa fa-caret-right" /> About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact-us">
                          <i className="fa fa-caret-right" /> Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">
                          <i className="fa fa-caret-right" /> Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq">
                          <i className="fa fa-caret-right" /> FAQs
                        </Link>
                      </li>

                      <li>
                        <Link to="#." >
                          <i className="fa fa-caret-right" /> Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/terms-and-conditions">
                          <i className="fa fa-caret-right" /> Terms &amp;
                          Conditions
                        </Link>
                      </li>

                      <li>
                        <Link to="#.">
                          <i className="fa fa-caret-right" /> Refund & Cancellation Policy
                        </Link>
                      </li>
                      <li>
                        <Link to="/customer_support">
                          <i className="fa fa-caret-right" /> Customer Support
                        </Link>
                      </li>
                      <li>
                        <Link to="/disclaimer">
                          <i className="fa fa-caret-right" /> Disclaimer
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <h5>Social Links</h5>
                <ul className="social-icon">
                  <li>
                    <Link to="#." title="" target="_blank">
                      <p>
                        <i className="fa fa-facebook-f" />
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="#." title="" target="_blank" className="mx-1">
                      <p>
                        <i className="fa fa-twitter" />
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="#." title="" target="_blank" >
                      <p>
                        <i className="fa fa-linkedin" />
                      </p>
                    </Link>
                  </li>
                </ul>
                <h5 className="mt20">Download App</h5>
                <Link to='#'>
                  <img
                    src="./assets/images/google-play.png"
                    width={120}
                    alt=""
                  />
                </Link>
                <Link to='#'>
                  <img src="./assets/images/app-store.png" width={120} alt="" className="mx-1" />
                </Link>
              </div>
              <div className="col-md-4 addressBx">
                <h5>Office Address</h5>
                <ul>
                  <li>
                    <i className="fa fa-home" />{" "}
                    <span className="text16">Dizital</span>
                  </li>
                  <li>
                    <i className="fa fa-map-marker" /> 12345 Brückrachdorf
                    Germany
                  </li>
                  <li>
                    <i className="fa fa-phone" />{" "}
                    <Link to="tel:03341816636">03341816636</Link>
                  </li>
                  <li>
                    <i className="fa fa-envelope" />{" "}
                    <Link to="mailto:support@dzital.de">support@dzital.de</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Top End */}
        {/* Footer Bottom Start */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-xs-12" align="center">
                © copyright 2023 dzital.de All rights reserved.
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom End */}
      </footer>
    </>
  );
};

export default Footer;
