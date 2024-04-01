import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const FreelancerItem = ({ item }) => {

  const limitDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return description;
  };


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
      <div className="card mb20" key={item._id}>
        <div className="card-body jobeItemBx">
          <div className="row">
            <div  className="col-md-9">
              <h4>{item.title}</h4>
              <p className="text-muted mb5">
                <i className="fa fa-clock-o" /> Posted on : {formattedDuration} ago
              </p>
              <p className='mb-4'>
              {limitDescription(item.description)}
              </p>
              {/* <Link className="btn btnTheme btn-sm mx-1" to="#." style={{background:"var(--theme-color)"}}>{item.skills[1]}</Link> */}
            </div>
            <div className="col-md-3 viewBx" align="center">
              {/* <h4>
                <b>{item.budget}/ Hr</b>
              </h4>
              <p className="text14">APPROX: 7 HRS</p> */}
              {/* <p>9 PROPOSALS</p> */}
              <Link
                className="btn btn-outline-primary width100"
                to={`/freelancer-detail/${item._id}`}
              >
                View &amp; Apply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FreelancerItem