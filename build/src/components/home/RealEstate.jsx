import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import noPostar from '../../assets/no-poster.png'


const RealEstate = ({ item }) => {
  const { property, wishListAdd, wishListRemove } = useAppContext();
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
            <Link className="text text-decoration-none " to={`/${item.title}`} onMouseEnter={(e) => (e.target.style.color = "var(--theme-color)")} onMouseLeave={(e) => e.target.style.color = "black"}>
              View All
            </Link>
          </div>
          <aside className="row pt-2">
            {/* item start */}
            {Array.isArray(property) && property.slice(0, 4).map((item) => (
              <div className="col-md-3 col-12 proBx" key={item._id}>
                <div className="card mb-3" style={{height: ' 350px'}} >
                  <div className="imgBx">
                    <Link to={`/realstate-detail/${item._id}`}>
                      <img
                        src={item.photo || noPostar}
                        className="card-img-top allImg"
                        alt=""
                      />
                    </Link>
                    <Link
                      className="iconWish"
                      onClick={() => addWhishlist(item.product_id)}
                      
                    >
                      <i
                        className={
                          colorMap[item.product_id]
                            ? "fa fa-heart"
                            : "fa fa-heart-o"
                        }
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/realstate-detail/${item._id}`}>
                        {item.title}
                      </Link>
                    </h5>
                    <p className="card-text">
                      <small className="text-body-secondary">{limitDescription(item.description)}</small>
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
  )
}

export default RealEstate