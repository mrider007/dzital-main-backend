import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import noPostar from '../../assets/no-poster.png'


const Jobs = ({ item }) => {
  const { jobList, wishListAdd, wishListRemove } = useAppContext();
  const [colorMap, setColorMap] = useState({});


  const addWhishlist = (id) => {
    if (colorMap[id]) {
      wishListRemove(id);
    } else {
      wishListAdd(id);
    }
    setColorMap((prevColorMap) => ({
      ...prevColorMap,
      [id]: !prevColorMap[id],
    }));
  };

  const limitDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 14).join(' ') + '...';
    }
    return description;
  };

  return (
    <>
      <section className="">
        <article className="container pt-4 pb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">{item.title}</h4>
            <Link
              className="text text-decoration-none "
              to={`/${item.title}`}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--theme-color)")
              }
              onMouseLeave={(e) => (e.target.style.color = "black")}
            >
              View All
            </Link>
          </div>
          <aside className="row pt-2">
            {/* item start */}
            {Array.isArray(jobList) && jobList.slice(0, 4).map((jobItem) => (
              <div className="col-md-3 col-12 proBx" key={jobItem._id}>
                <div className="card mb-3">
                  <div className="imgBx">
                    <Link to={`/job-detail/${jobItem._id}`}>
                      <img
                        src={jobItem.image || noPostar}
                        className="card-img-top allImg"
                        alt=""
                      />
                    </Link>
                    <Link
                      className="iconWish"
                      onClick={() => addWhishlist(jobItem.product_id)}
                    >
                      <i
                        className={
                          colorMap[jobItem.product_id]
                            ? "fa fa-heart"
                            : "fa fa-heart-o"
                        }
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/job-detail/${jobItem._id}`}>
                        {jobItem?.title}
                      </Link>
                    </h5>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {limitDescription(jobItem.description)}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* item end */}
          </aside>
        </article>
      </section>
    </>
  );
};

export default Jobs;
