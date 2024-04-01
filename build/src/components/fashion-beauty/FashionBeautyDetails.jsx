import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Ads from "../comon/Ads"
import CallAction from "../comon/CallAction";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FashionGallerySlider from "../sliders/FashionGallerySlider";
import { useAppContext } from "../../contextApi/AppContext";
import ShareModal from "../modal/ShareModal";



const FashionBeautyDetails = () => {
  const { id } = useParams()
  const [color, setColor] = useState(false)
  const { getFashionBeautyDetails, fashionDetail, wishListAdd } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log('fashiondetail', fashionDetail)


  const addWhishlist = (id) => {
    wishListAdd(id)
    setColor(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getFashionBeautyDetails(id)
    }
    fetchData()
  }, [id])

  const {
    description, attribute_values, image_1, image_2, image_3, photo,
    product_id, title
  } = fashionDetail.data || {};
  const img = [photo, image_1, image_2, image_3];

  // console.log('fashion', fashionDetail)

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
                  <Link to="/fashion_beauty">Fashion &amp; Beauty</Link>
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
            {fashionDetail.isLoad && (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {!fashionDetail.isLoad && (
              <div className="col-md-10">
                {/* product details part start here */}
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="sticky-top">
                          <FashionGallerySlider img={img} />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="row">
                          <div className="col-md-10 col-sm-12">
                            <h3>
                              {brand || ''}
                            </h3>
                          </div>
                          <div className="col-md-2 col-sm-12" align="right">
                            <Link className="wishList" onClick={() => addWhishlist(product_id)} >
                              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
                            </Link>
                            <div className="iconWish">
                              <i className="fa fa-share-alt text20 " onClick={openModal} />
                              <ShareModal isOpen={isModalOpen} onClose={closeModal} />
                            </div>
                          </div>
                          <h4 className="text-muted">{title}</h4>
                          <h5 className="text-success">Special price</h5>
                          <h5><span className="text28"><i className="fa fa-inr"> </i> {price || 'Not Disclosed'}</span></h5>
                          {/* <h4><span className="badge rounded-pill text-bg-success">3.8 <i className="fa fa-star"></i></span> <span className="text18 text-muted">148 ratings and 11 reviews</span></h4> */}
                          {/* <ul className="sizeList mt20 mb20" style={{ marginLeft: '4px' }} >
                            <li><b className="text18">Size</b>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li>
                              <input type="radio" className="btn-check" name="options-base" id="option5" autoComplete="off" checked />
                              <label className="btn" htmlFor="option5">Small</label>
                            </li>
                            <li>
                              <input type="radio" className="btn-check" name="options-base" id="option6" autoComplete="off" />
                              <label className="btn" htmlFor="option6">Medium</label>
                            </li>
                            <li>
                              <input type="radio" className="btn-check" name="options-base" id="option7" autoComplete="off" />
                              <label className="btn" htmlFor="option7">Large</label>
                            </li>
                            <li>
                              <input type="radio" className="btn-check" name="options-base" id="option8" autoComplete="off" />
                              <label className="btn" htmlFor="option8">Extra Large</label>
                            </li>
                          </ul> */}
                        </div>
                        <div className="row">
                          <CallAction item={fashionDetail} />
                        </div>
                        <h4 className="mt-3">product description</h4>
                        <p align="justify">{description}</p>
                        <hr />
                        {
                          Array.isArray(attribute_values) && attribute_values.map((item) => (
                            <p key={item._id}>
                              <b>{item.attribute} : </b>{item.value}
                            </p>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {/* product details part end here */}
                {/* related product part start here */}
                <h4 className="mt20">Related Products</h4>
                <hr className="mt0" />
                <div className="swiper productSlider">
                  <Swiper
                    loop={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* <img src={img} alt="" /> */}
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* <img src={img} alt="" /> */}
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* <img src={img} alt="" /> */}
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* <img src={img} alt="" /> */}
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
  );
};

export default FashionBeautyDetails;