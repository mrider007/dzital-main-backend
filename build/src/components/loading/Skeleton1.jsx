import React from "react";
import "./Skeleton.css";

const Skeleton1 = () => {
  return (
    <div className="card mb20">
      <div className="card-body jobeItemBx">
        <div className="row">
          <div className="col-md-12">
            <div id="container1">
              <div id="content">
                <div id="content-title" className="shimmer"></div>
                <div id="content-desc">
                  <div className="line shimmer"></div>
                  <div className="line shimmer"></div>
                  <div className="line shimmer"></div>
                  <div className="line shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton1;
