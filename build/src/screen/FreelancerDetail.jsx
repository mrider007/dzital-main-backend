import React, { useEffect, useState } from 'react'
import Ads from './../components/comon/Ads'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../contextApi/AppContext'
import ShareModal from '../components/modal/ShareModal'

const FreelancerDetail = () => {
  const { id } = useParams()
  const { getFreelancerDetails, freelancerDetail } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFreelancerDetails(id)
    }
    fetchData()
  }, [id])

  const {
    title, description, attribute_values, createdAt
  } = freelancerDetail.data || {};


  const getAttributeValue = (attributeName) => {
    if (!Array.isArray(attribute_values)) return null;
    const attribute = attribute_values.find(item => item.attribute === attributeName);
    if (attribute) {
      return attribute.value;
    } else {
      return null;
    }
  };
  const salary = getAttributeValue("Salary");
  const location = getAttributeValue("Location");
  const experience = getAttributeValue("Experience Level");
  const industry = getAttributeValue("Industry Experience");

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
              <h4>Freelancer Job Details</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Freelancer">Freelancer</Link>
                </li>
                <li className="active">Freelancer Details</li>
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
            {/* right part start */}
            {freelancerDetail.isLoad && (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            {!freelancerDetail.isLoad && (
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="mb-3">{title}</h2>
                  </div>
                  <div className="col-md-4 d-flex gap-3 align-items-center" align="right">
                    <Link className="btn btnTheme " to="#." style={{ background: "var(--theme-color)" }}>
                      <i className="fa fa-envelope " /> Send Proposal
                    </Link>
                    <div className="iconWish">
                      <i className="fa fa-share-alt text20 " onClick={openModal} />
                      <ShareModal isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-8">
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
                            <i className="fa fa-briefcase" /> {industry || experience || ''}
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
                    <div className="card ">
                      <div className="card-body">
                        <h3>Description for {title}</h3>
                        <p className="mb0" align="justify">
                          {description}
                        </p>
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
                  <div className="col-md-4">
                    <div className="card text-bg-secondery" style={{ background: "var(--theme-color-dark)" }}>
                      <div className="card-header" >
                        <h5 className='text-light'>About the Client</h5>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <i className="fa fa-globe" /> <b>Country :</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            Germany
                          </span>
                        </li>
                        <li className="list-group-item">
                          <i className="fa fa-list" /> <b>Projects Paid :</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            0
                          </span>
                        </li>
                        <li className="list-group-item">
                          <i className="fa fa-pencil-square-o" />{" "}
                          <b>Projects Posted :</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            1
                          </span>
                        </li>
                        <li className="list-group-item">
                          <i className="fa fa-thumbs-o-up" /> <b>Total Feedbacks :</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            1
                          </span>
                        </li>
                        <li className="list-group-item">
                          <i className="fa fa-thumbs-o-up" /> <b>Feedbacks :</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            1
                          </span>
                        </li>
                        <li className="list-group-item">
                          <i className="fa fa-cubes" /> <b>Total Spent :</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            ₹ 0
                          </span>
                        </li>
                        <li className="list-group-item">
                          <i className="fa fa-users" /> <b>Client Type</b>{" "}
                          <span className="badge bg-primary rounded-pill float-end">
                            Company
                          </span>
                        </li>
                      </ul>
                      <div className="card-footer text-light">Member since 15 Nov, 2023</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mt-3">Proposals</h5>
                    <hr className="mt0" />
                  </div>
                  {/* item start */}
                  <div className="col-md-6">
                    <div className="card mb-3" style={{ maxWidth: 540 }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src="assets/images/arch-dreams.jpg"
                            className="img-fluid rounded-start"
                            style={{ height: "100%" }}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">Arch Dreams</h5>
                            <p>
                              <i className="fa fa-map-marker" /> India &nbsp;&nbsp;{" "}
                              <i className="fa fa-clock-o" /> 3 hours ago
                            </p>
                            <p className="card-text">Architectural Designer</p>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Received: 18 Nov, 23 (Today)
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="col-md-6">
                    <div className="card mb-3" style={{ maxWidth: 540 }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src="assets/images/arch-dreams.jpg"
                            className="img-fluid rounded-start"
                            style={{ height: "100%" }}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">Arch Dreams</h5>
                            <p>
                              <i className="fa fa-map-marker" /> India &nbsp;&nbsp;{" "}
                              <i className="fa fa-clock-o" /> 3 hours ago
                            </p>
                            <p className="card-text">Architectural Designer</p>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Received: 18 Nov, 23 (Today)
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="col-md-6">
                    <div className="card mb-3" style={{ maxWidth: 540 }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src="assets/images/arch-dreams.jpg"
                            className="img-fluid rounded-start"
                            style={{ height: "100%" }}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">Arch Dreams</h5>
                            <p>
                              <i className="fa fa-map-marker" /> India &nbsp;&nbsp;{" "}
                              <i className="fa fa-clock-o" /> 3 hours ago
                            </p>
                            <p className="card-text">Architectural Designer</p>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Received: 18 Nov, 23 (Today)
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="col-md-6">
                    <div className="card mb-3" style={{ maxWidth: 540 }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src="assets/images/arch-dreams.jpg"
                            className="img-fluid rounded-start"
                            style={{ height: "100%" }}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">Arch Dreams</h5>
                            <p>
                              <i className="fa fa-map-marker" /> India &nbsp;&nbsp;{" "}
                              <i className="fa fa-clock-o" /> 3 hours ago
                            </p>
                            <p className="card-text">Architectural Designer</p>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Received: 18 Nov, 23 (Today)
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item end */}
                </div>
              </div>
            )}
            {/* right part end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>

    </>
  )
}

export default FreelancerDetail