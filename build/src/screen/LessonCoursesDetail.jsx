import React, { useEffect, useState } from "react";
import Ads from './../components/comon/Ads'
import { Link, useParams } from 'react-router-dom'
import LessonItemRelated from "../components/lessons-courses/LessonItemRelated";
import { useAppContext } from "../contextApi/AppContext";
import ShareModal from "../components/modal/ShareModal";

const LessonCoursesDetail = () => {
  const { id } = useParams()
  const { getLessonDetail, lessonDetail } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // console.log('lessondetail', lessonDetail)

  useEffect(() => {
    const fetchData = async () => {
      await getLessonDetail(id)
    }
    fetchData()
  }, [id])

  const { description, title, attribute_values } = lessonDetail.data || {};

  // function to get data of lessonDetail, videos, quizzes, hours
  const getAttributeValue = (attributeName) => {
    if (!Array.isArray(attribute_values)) return null;
    const attribute = attribute_values.find(item => item.attribute === attributeName);
    if (attribute && attribute.value) {
      const number = parseInt(attribute.value);
      if (!isNaN(number)) {
        return number;
      }
    }
    return null;
  };

  const lessons = getAttributeValue("Lessons");
  const videos = getAttributeValue("Videos");
  const quizzes = getAttributeValue("Quizzes");
  const hours = getAttributeValue("Hours");


  // function to get all Video link
  const getVideoLinks = () => {
    if (!Array.isArray(attribute_values)) return [];
    return attribute_values.filter(item => {
      return item.value.startsWith('https://youtu.be');
    });
  };
  const videoLinks = getVideoLinks();

  const convertToEmbedLink = (youtubeLink) => {
    const videoId = youtubeLink.split('/').pop().split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };




  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4></h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/lesson_courses">Lessons &amp; Courses</Link>
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
            {/* mid body part start */}
            {lessonDetail.isLoad && (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            
            {!lessonDetail.isLoad && (
              <div className="col-md-10">
                {/* heading box part start */}
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="mb-3">{title}</h2>
                  </div>
                  <div className="col-md-4" align="right">
                    <div className="col-md-4" align="right">
                      <i className="fa fa-share-alt text20 " onClick={openModal} />
                      <ShareModal isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                  </div>
                </div>
                <hr className="mt0" />
                {/* heading box part end */}
                <div className="row mb-3">
                  <div className="col-md-8">
                    <div className="card freelanceDtls mb-3 " style={{ background: "#feffdb" }}>
                      <div className="card-body">
                        <ul>
                          <li>
                            <i className="fa fa-file-text-o" />
                            <h6>
                              <b>{lessons || 'Not Mentioned'}</b>
                            </h6>
                            <p>Lessons</p>
                          </li>
                          <li>
                            <i className="fa fa-play" />
                            <h6>
                              <b>{videos || 'Not Mentioned'}</b>
                            </h6>
                            <p>Videos</p>
                          </li>
                          <li>
                            <i className="fa fa-question" />
                            <h6>
                              <b>{quizzes || 'Not Mentioned'}</b>
                            </h6>
                            <p>Quizzes</p>
                          </li>
                          <li>
                            <i className="fa fa-clock-o" />
                            <h6 className="text-success">
                              <b>{hours ? `${hours} : 00` : 'Not Mentioned' || 'Not Mentioned'}</b>
                            </h6>
                            <p>Hours</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <h3 className="card-title">
                          Description for {title}
                        </h3>
                        {/* <h6 className="text-success">FREE Course</h6> */}
                        {description}
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        {videoLinks.map((video, index) => (
                          <div key={index} className="video-responsive">
                            <iframe
                              width="100%"
                              height="100%"
                              src={convertToEmbedLink(video.value)}
                              title={`YouTube video ${index + 1}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h5 className="mt-3">Related Courses</h5>
                    <hr className="mt0" />
                    <div className="row">
                      <LessonItemRelated />
                      <LessonItemRelated />
                      <LessonItemRelated />
                      <LessonItemRelated />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* mid body part end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>

    </>
  );
};

export default LessonCoursesDetail;