import React, { useEffect, useState } from "react";
import Ads from "../components/comon/Ads";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import CallAction from "../components/comon/CallAction";
import ShareModal from "../components/modal/ShareModal";

const ElectronicsDetail = () => {
  const { id } = useParams()
  const [color, setColor] = useState(false)
  const { getElectronicsProductDetails, electronicsItems, wishListAdd } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // console.log('ele', electronicsItems)

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchData = async () => {
    await getElectronicsProductDetails(id)
  }
  useEffect(() => {
    fetchData()
  }, [id])

  const addWhishlist = (id) => {
    wishListAdd(id)
    setColor(true)
  }

  const {
    description,
    image_1,
    image_2,
    image_3,
    photo,
    product_id,
    title,
    attribute_values,
    _id,
  } = electronicsItems.data || {};

  const img = [photo, image_1, image_2, image_3]


  const getAttributeValue = (attributeName) => {
    if (!Array.isArray(attribute_values)) return null;
    const attribute = attribute_values.find(item => item.attribute === attributeName);
    if (attribute) {
      return attribute.value;
    } else {
      return null;
    }
  };
  const price = getAttributeValue("Price");
  const brand = getAttributeValue("Brand");


  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4></h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/electronics">Electronics</Link>
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
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* mid box start */}
            {electronicsItems.isLoad && (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            {!electronicsItems.isLoad && (
              <div className="col-md-10">
                {/* product details part start here */}
                <div className="card" >
                  <div className="card-body" key={_id}>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="swiper mainBannerSwiper">
                          <Swiper
                            loop={true}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                          >
                            {Array.isArray(img) && img.map((item, index) => (
                              <SwiperSlide key={index}>
                                <div className="swiper-slide" >
                                  <img src={item} alt="" />
                                </div>
                              </SwiperSlide>
                            ))
                            }
                          </Swiper>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="row">
                          <div className="col-md-10 col-sm-12">
                            <h2>
                              {brand || ''}
                            </h2>
                          </div>
                          <div className="col-md-10 col-sm-12">
                            <h3>
                              <h4 className="text-muted">{title}</h4>
                            </h3>
                          </div>
                          <div className="col-md-2 flex col-sm-12" align="right">
                            <div className="cursor-pointer">
                              <i className="fa fa-share-alt text20 " onClick={openModal} />
                              <ShareModal isOpen={isModalOpen} onClose={closeModal} />
                            </div>
                            &nbsp;
                            <Link className="iconWish" onClick={() => addWhishlist(product_id)} >
                              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
                            </Link>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-5 col-sm-12">
                            <h5 className="text-success">Special price</h5>
                            <h5><span className="text28"><i className="fa fa-inr"> </i> {price || 'Not Disclosed'}</span></h5>
                          </div>
                          <CallAction />
                        </div>
                      </div>
                    </div>
                    <h5>Product Description</h5>
                    <hr />
                    <p>
                      {description}
                    </p>
                    {
                      Array.isArray(attribute_values) && attribute_values.map((item) => (
                        <p key={item._id}>
                          <b>{item.attribute} : </b>{item.value}
                        </p>
                      ))
                    }
                  </div>
                </div>
                {/* product details part end here */}
                {/* related product part start here */}
                <h4 className="mt20">Related Products</h4>
                <hr className="mt0" />
                <div className="swiper productSlider">
                  <Swiper
                    loop={true}
                    slidesPerView={5}
                    spaceBetween={20}
                    keyboard={{
                      enabled: true,
                    }}
                    autoplay={{
                      delay: 3000,
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      640: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div className="swiper-slide proBx">
                        <div className="card mb-3">
                          <div className="imgBx">
                            <Link to={`/Electronics/${_id}`}>
                              <img
                                src={photo}
                                className="card-img-top"
                                alt=""
                              />
                            </Link>
                            <Link className="iconWish" onClick={() => addWhishlist(product_id)} >
                              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
                            </Link>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              <a >
                                KTM Bikes: E-Bikes and Bikes
                              </a>
                            </h5>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Waiblingen
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide proBx">
                        <div className="card mb-3">
                          <div className="imgBx">
                            <Link to={`/Electronics/${_id}`}>
                              <img
                                src={photo}
                                className="card-img-top"
                                alt=""
                              />
                            </Link>
                            <Link className="iconWish" onClick={() => addWhishlist(product_id)} >
                              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
                            </Link>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              <a >
                                KTM Bikes: E-Bikes and Bikes
                              </a>
                            </h5>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Waiblingen
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide proBx">
                        <div className="card mb-3">
                          <div className="imgBx">
                            <Link to={`/Electronics/${_id}`}>
                              <img
                                src={photo}
                                className="card-img-top"
                                alt=""
                              />
                            </Link>
                            <Link className="iconWish" onClick={() => addWhishlist(product_id)} >
                              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
                            </Link>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              <a >
                                KTM Bikes: E-Bikes and Bikes
                              </a>
                            </h5>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Waiblingen
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                {/* related product part end here */}
              </div>
            )}
            {/* mid box end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>
  )
}

export default ElectronicsDetail