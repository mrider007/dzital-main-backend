import React from 'react'
import { Link } from 'react-router-dom'

const JobItem = ({ item }) => {


  
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
  const formattedDuration = formatDuration(item.createdAt);
  return (
    <>
      <div className="col-md-6">
        <Link className="jobeItem" to={`/job-detail/${item._id}`}>
          <div className="card mb20">
            <div className="card-body" style={{height: '170px'}}>
              <div className="row">
                <div className="col-md-9 col-sm-12">
                  <h5>{item.title}</h5>
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
              {/* <ul className="list-inline divider mb5">
                <li>
                  <i className="fa fa-briefcase" /> 2-6 Yrs
                </li>
                <li>
                  <i className="fa fa-inr" /> Not disclosed
                </li>
                <li>
                  <i className="fa fa-map-marker" /> Kolkata
                </li>
              </ul> */}
              <p className="m0 mb10 mt20">
                <i className="fa fa-file-text-o" /> {' '}
                {item.description}
              </p>
              <div className="row footBx mt20">
                <div className="col">
                  <span className="text-muted">{formattedDuration} Ago</span>
                </div>
                <div className="col text14" align="right">
                  <i className="fa fa-bookmark-o" /> Save
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default JobItem