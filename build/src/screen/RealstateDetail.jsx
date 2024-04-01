import React, { useEffect, useState } from "react";
import Ads from "./../components/comon/Ads";
import GalerySlider from "../components/sliders/GalerySlider";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import CallAction from "../components/comon/CallAction";
import ShareModal from "../components/modal/ShareModal";

const RealstateDetail = () => {
  const { id } = useParams();
  const { getPropertyDetail, propertyDetail, wishListAdd } = useAppContext();
  const [colorMap, setColorMap] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addWhishlist = (id) => {
    wishListAdd(id);
    setColorMap(prevColorMap => ({
      ...prevColorMap,
      [id]: true
    }));
  };


  useEffect(() => {
    const fetchData = async () => {
      await getPropertyDetail(id);
    };
    fetchData();
  }, [id]);

  const {
    description,
    image_1,
    image_2,
    image_3,
    photo,
    title,
    product_id,
    attribute_values
  } = propertyDetail.data || {};
  const img = [photo, image_1, image_2, image_3];


  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>{title}</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/real_estate">Realestate</Link>
                </li>
                <li className="active">{title}</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      <section className="midBody bgtheme">
        <article className="container-fluid">
          <article className="row">
            <Ads />
            {propertyDetail.isLoad && (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {!propertyDetail.isLoad && (
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="mb20">{title}</h5>
                        <GalerySlider img={img} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card card-sm mb15">
                      <div className="card-body p5">
                        <ul className="list-group list-group-horizontal list-inline">
                          <li>
                            <b>Share</b>
                          </li>
                          <li>    </li>
                          <li>
                            <div className="iconWish">
                              <i className="fa fa-share-alt text20 " onClick={openModal} />
                              <ShareModal isOpen={isModalOpen} onClose={closeModal} />
                            </div>
                          </li>
                          <li>    </li>
                          <li>
                            <Link className="iconWish" onClick={() => addWhishlist(product_id)}>
                              <i className={colorMap[product_id] ? 'fa fa-heart' : 'fa fa-heart-o'} />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* location */}
                    <div className="card card-sm mb15">
                      <div className="card-body p5">
                        <h5 className="mb0 text16 theme-text">
                          <i className="fa fa-calendar" /> <b>Posted On</b> 05 Nov
                          2023
                        </h5>
                        <p className="text-muted mb5">
                          <b>Location :</b> Berliner Festspiele, Germany
                        </p>
                        <div>
                          <iframe
                            allowFullScreen
                            height="350"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19429.71981350022!2d13.274301454071658!3d52.50239880695637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a850f9c36ee8a5%3A0xe2db0292ab5e1528!2sBerliner%20Festspiele!5e0!3m2!1sen!2sin!4v1699431152474!5m2!1sen!2sin"
                            style={{
                              border: "0",
                            }}
                            width="100%"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card card-sm">
                      <CallAction />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt10">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="property-attributes">
                            <div className="attr-list">
                              <h4>Property Specification</h4>
                              <table className="table table-bordered table-striped">
                                <tbody>
                                  {
                                    Array.isArray(attribute_values) && attribute_values.map((item) => (
                                      <tr key={item._id} >
                                        <td>
                                          <strong>{item.attribute}</strong>
                                        </td>
                                        <td>{item.value}</td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="property-description">
                            <h4>{title}</h4>
                            <div className="mt25">
                              <h5>Property Description :</h5>
                              <p>{description} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Ads />
          </article>
        </article>
      </section>
    </>
  );
};

export default RealstateDetail;
