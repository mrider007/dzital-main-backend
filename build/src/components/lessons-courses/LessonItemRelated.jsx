import React from 'react'
import { Link } from 'react-router-dom'

const LessonItemRelated = () => {
  return (
    <>
    <div className="col-md-3">
            <div className="lCItem">
              <div className="shadow3" />
              <div className="shadow2" />
              <div className="shadow1" />
              <div className="innerBx">
                <div className="titelBx">
                  <i className="fa fa-lightbulb-o" />
                  <h4>Developing Scalable HubSpot Solutions</h4>
                </div>
                <div className="textCont">
                  <h5 className="mb-1 text16">
                    <b>SHORT COURSE</b>
                  </h5>
                  <h6 className="mb-3 text14">
                    5 Lessons <span className="theme-text">3:00 hours</span>
                  </h6>
                  <p>
                    In this course, you'll build the foundational skills needed
                    to create scala...
                  </p>
                  <Link
                    className="btn btnTheme width100"
                    to="/lessons-courses-detail"
                    style={{background:"var(--theme-color)"}}
                  >
                    Start course
                  </Link>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default LessonItemRelated