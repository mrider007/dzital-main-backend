import React from "react";
import "./Skeleton.css";

const SubCatSkeleton = () => {
  return (
      <li>
        <div id="content">
          <div id="content-title" class="shimmer"></div>
          <div id="content-desc">
            <div class="line shimmer"></div>
          </div>
        </div>
      </li>
  );
};

export default SubCatSkeleton;
