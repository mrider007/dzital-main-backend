import React from 'react'
import { Link } from 'react-router-dom'

const LessonItem = ({ item }) => {

  const limitDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 14).join(' ') + '...';
    }
    return description;
  };

  
  // console.log('item', item)
  return (
    <>
      <div className="col-md-6">
        <div className="lCItem">
          {/* <div className="shadow3" /> */}
          {/* <div className="shadow2" /> */}
          {/* <div className="shadow1" /> */}
          <div className="innerBx">
            <div className="titelBx">
              <i className="fa fa-lightbulb-o" />
              <h4>{item.title}</h4>
            </div>
            <div className="textCont">
              <h5 className="mb-1 text16">
                <b>{item.title}</b>
              </h5>
              <h6 className="mb-3 text14">
                {/* 5 Lessons <span className="theme-text">3:00 hours</span> */}
              </h6>
              <p>
                {limitDescription(item.description)}
              </p>
              <Link
                className="btn btnTheme width100"
                to={`/lessons-courses-detail/${item._id}`}
                style={{ background: "var(--theme-color)" }}
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

export default LessonItem ;