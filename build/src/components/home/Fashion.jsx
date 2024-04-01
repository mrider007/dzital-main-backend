import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import noPostar from '../../assets/no-poster.png'


const Fashion = ({item}) => {
  const {fashion, wishListAdd} = useAppContext();
  const [colorMap, setColorMap] = useState({});

// console.log('fashion', fashion)
  
  const addWhishlist = (id) => {
    wishListAdd(id);
    setColorMap(prevColorMap => ({
      ...prevColorMap,
      [id]: true 
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
            <h4>Fashion &amp; Beauty</h4>
            <Link className="text text-decoration-none " to={`/${item.title}`} onMouseEnter={(e) => (e.target.style.color = "var(--theme-color)")} onMouseLeave={(e)=> e.target.style.color = "black"}>
              View All
            </Link>
          </div>
          <aside className="row pt-2">
            {/* item start */}
            {Array.isArray(fashion) && fashion.slice(0,4).map((i) =>( 
              <div  className="col-md-3 col-12 proBx" key={i._id} >
                <div className="card mb-3"  style={{height: '350px'}}>
                  <div className="imgBx">
                    <Link to={`/Fashion-Beauty-Details/${i._id}`}>
                      <img
                        src={i.photo || noPostar}
                        className="card-img-top allImg"
                        alt=""
                      />
                    </Link>
                    <Link className="iconWish" onClick={() => addWhishlist(i.product_id)} >
                      <i className={colorMap[i.product_id] ? 'fa fa-heart' : 'fa fa-heart-o'} />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/Fashion-Beauty-Details/${i._id}`}>
                        {i.title}
                      </Link>
                    </h5>
                    <p className="card-text">
                      <small className="text-body-secondary">{limitDescription(i.description || '')}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </aside>
        </article>
      </section>
    </>
  );
};

export default Fashion;

