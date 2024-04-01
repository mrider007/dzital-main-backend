import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ads from "../../components/comon/Ads";

const AboutUs = () => { 
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
              <h4>About Us</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">About Us</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      <section className="midBody" style={{ backgroundColor: "#fff" }}>
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
              {/* about content part start */}
              <div className="row">
                <div className="col-md-8">
                  <div className="aboutus-content sticky-top">
                    <h1>
                      Welcome to <span>Dzital</span>
                    </h1>
                    <h4>Your tagline goes here</h4>
                    <p align="justify">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                    <p align="justify">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here.
                    </p>
                    <div className="row">
                      {/* item start */}
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="serviceBoxItem text-center">
                          <img src="./assets/images/vision.png" alt="" />
                          <div className="title">
                            <h4>Vision</h4>
                          </div>
                          <div className="text">
                            <span>
                              Lorem ipsum dolor sit amet, id quo eruditi
                              eloquentiam. Assum decore te sed. Elitr scripta
                              ocurreret qui ad.
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* item end */}
                      {/* item start */}
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="serviceBoxItem text-center">
                          <img src="./assets/images/mission.png" alt="" />
                          <div className="title">
                            <h4>Mission</h4>
                          </div>
                          <div className="text">
                            <span>
                              Lorem ipsum dolor sit amet, id quo eruditi
                              eloquentiam. Assum decore te sed. Elitr scripta
                              ocurreret qui ad.
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* item end */}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src="./assets/images/home-search.jpg"
                    width="100%"
                    alt=""
                  />
                  <img
                    src="./assets/images/job-search.jpg"
                    width="100%"
                    alt=""
                  />
                  <img
                    src="./assets/images/ecommerce.jpg"
                    width="100%"
                    alt=""
                  />
                  <img
                    src="./assets/images/vehicle-search.jpg"
                    width="100%"
                    alt=""
                  />
                  <img
                    src="./assets/images/online-education.jpg"
                    width="100%"
                    alt=""
                  />
                </div>
              </div>
              {/* about content part end */}
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
  );
};

export default AboutUs;
