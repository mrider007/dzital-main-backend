import React, { useEffect } from "react";
import Ads from "./../components/comon/Ads";
import { Link, useParams } from "react-router-dom";
import CallAction from "../components/comon/CallAction";
import { useAppContext } from "../contextApi/AppContext";

const JobDetail = () => {
  const { id } = useParams()
  const { getJobListDetail, jobDetail } = useAppContext()


  useEffect(() => {
    const fetchData = async () => {
      await getJobListDetail(id)
    }
    fetchData()
  }, [id])

  const {
    description,
    title,
    attribute_values,
    createdAt

  } = jobDetail.data || {};

  const getAttributeValue = (attributeName) => {
    if (!Array.isArray(attribute_values)) return null;
    const attribute = attribute_values.find(item => item.attribute === attributeName);
    if (attribute) {
      return attribute.value;
    } else {
      return null;
    }
  };
  const salary = getAttributeValue("Salary Expectation");
  const location = getAttributeValue("Location");
  const experience = getAttributeValue("Experience Level");

  const formatDuration = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diff = now - createdDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 1) {
      return `${days} days`;
    } else {
      return `${hours} hours, ${minutes} minutes`;
    }
  };
  const formattedDuration = formatDuration(createdAt);

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>{title}</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/jobs`}>Jobs</Link>
                </li>
                <li className="active">{title}</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      <section className="midBody bgtheme">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* job deatils part start */}
            {jobDetail.isLoad && (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {!jobDetail.isLoad && (
              <div className="col-md-6">
                <div className="card jobeItem mb20">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>{title}</h5>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-briefcase" /> {experience}
                      </li>
                      <li>
                        <i className="fa fa-inr" /> {salary || 'Not Disclosed'}
                      </li>
                      <li>
                        <i className="fa fa-map-marker" /> {location || 'Not Mentioned'}
                      </li>
                    </ul>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mt5 mb5 text16">
                          <b>Posted :</b> {formattedDuration} ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb20">
                  <div className="card-body">
                    <h5>Job description</h5>
                    <p>{description} </p>
                    <hr />
                    {
                      Array.isArray(attribute_values) && attribute_values.map((item) => (
                        <p key={item._id}>
                          <b>{item.attribute} : </b>{item.value}
                        </p>
                      ))
                    }
                  </div>
                </div>
              </div>
            )}
            {/* job deatils part end */}
            {/* interested job part start */}
            <div className="col-md-4">
              <CallAction />
              <div className="card">
                <div className="card-body">
                  <h5>
                    <b>Similar jobs</b>
                  </h5>
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  {/* item start */}
                  <div className="jobeItem">
                    <div className="row">
                      <div className="col-md-9 col-sm-12">
                        <h5>Website Designer</h5>
                        <ul className="reviewList mb5">
                          <li>
                            <b>G Tech Web Solutions</b>
                          </li>
                          <li>
                            <i className="fa fa-star" /> <span>1.2</span>
                          </li>
                          <li className="text-muted">|</li>
                          <li>
                            <span>12 Reviews</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3 col-sm-12 logoBx">
                        <img
                          src="assets/images/g-logo.png"
                          width={44}
                          className="mt5"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-inline divider mb5">
                      <li>
                        <i className="fa fa-map-marker" /> Kolkata
                      </li>
                      <li>
                        <b>Posted : </b>
                        <span className="text-muted">30+ Days Ago</span>
                      </li>
                    </ul>
                  </div>
                  {/* item end */}
                  <hr />
                  <div align="center">
                    <Link className="btn btn-primary" to="/jobs">
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* interested job part end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>
  );
};

export default JobDetail;