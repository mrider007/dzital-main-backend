import React from "react";
import "./Skeleton.css";
import { useLocation } from "react-router-dom";

export const Skeleton = ({ col }) => {
  const location = useLocation()
  let height = location.pathname === '/jobs' || location.pathname === '/freelancer' ? 170 : 250
  let change = location.pathname === '/freelancer' ? "170px" : "100%"
  return (
    <div className={`col-md-${col} mb-4 overflow-hidden `} style={{ minHeight: height, width: location.pathname === '/freelancer' &&'100%' }}>
      <div className="card placeholder-glow p-1" aria-hidden="true" style={{ height: "100%", borderRadius: 8 }}>
        <div className="placeholder " style={{ height: change, borderRadius: 4 }}></div>
      </div>
    </div>
  );
};

export const Skeleton2 = ({ col }) => {
  return (
    <div className={`col-md-${col} mb-4 overflow-hidden `} style={{ aspectRatio: 1 }}>
      <div className="card placeholder-glow p-1" aria-hidden="true" style={{ height: "100%", borderRadius: 8 }}>
        <div className="placeholder" style={{ height: "50%", borderRadius: 4 }}></div>
        <div className="d-grid gap-3 p-2">
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
          <button tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></button>
        </div>
      </div>
    </div>

  );
}

export const Skeleton3 = () => {
  return (
    <div className='mb-3 overflow-hidden '>
      <div className="card placeholder-glow p-1 responsble-skeleton" aria-hidden="true" >
        <div className="placeholder outer-div"></div>
        <div className="d-flex gap-3 p-2 position-relative " style={{ flex: 1, flexDirection: 'column' }}>
          <span className="placeholder" style={{height: 20, width: '80%'}}></span>
          <span className="placeholder" style={{height: 20, width: '70%'}}></span>
          <span className="placeholder" style={{height: 20, width: '50%'}}></span>
          <button tabIndex="-1" className="btn btn-primary disabled placeholder position-absolute " 
          style={{height: 30, width: '60%', bottom: "6px"}}></button>
        </div>
      </div>
    </div>
  )
}

