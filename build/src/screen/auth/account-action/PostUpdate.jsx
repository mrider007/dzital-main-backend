import React from "react";
import Ads from "../../../components/comon/Ads";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const PostUpdate = () => {
  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>SELECTED CATEGORY</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link className="active" to="/my-post">
                    My Post
                  </Link>
                </li>
                <li className="active">Update Product</li>
                {/* <li className="active">gfg</li> */}
              </ul>
            </div>
          </aside>
        </article>
      </section>
      {/* page header part end here */}
      {/* page body part start */}
      <section className="midBody">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* right part start */}
            <div className="col-md-10">
              <div className="card">
                <div className="card card-header">
                  <h5 className=" text-center ">Update Product</h5>
                </div>
                <div className="card card-body border-0">
                  <form
                    //   onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                  >
                    <div className="mb20" style={{ maxWidth: "500px" }}>
                      <h6>Title</h6>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb20" >
                      <h6>Description</h6>
                      <textarea type="text" className="form-control min-vh-40"  />
                    </div>
                    <div className="radioBx mb20">
                      <h6>fgf</h6>
                      <>
                        <React.Fragment>
                          <input
                            //   key={index}
                            type="radio"
                            className="btn-check"
                            name={"gf"}
                            id={"fgf"}
                            value={"gh"}
                          />
                          <label
                            className="btn btn-outline-primary"
                            htmlFor={"fgf"}
                          >
                            ghs
                          </label>
                        </React.Fragment>
                        <div className="row">
                          <div className="col-md-6">
                            <label>attribute :</label>
                            <input
                              type="text"
                              name={"fgs"}
                              className="form-control mt-2"
                              //   style={{width:'600px'}}
                            />
                          </div>
                          <div className="col-md-6">
                            <label >attribute :</label>
                            <input
                              type="text"
                              name={"fgs"}
                              className="form-control mt-2"
                              //   style={{width:'600px'}}
                            />
                          </div>
                        </div>
                      </>
                    </div>
                    <>
                      <h5 className="m0 text-center mt50">
                        UPLOAD UP TO 4 PHOTOS
                      </h5>
                      <div className="row mt10" >
                        {/* photo */}
                        <div className="col-sm-3">
                          <div className="fileBx mt-2">
                            <input
                              type="file"
                              name="photo"
                              id="photo"
                              style={{ display: "none" }}
                              //   onChange={(e) => handlePhotoChange(e)}
                              required
                            />
                            <label htmlFor="photo">
                              <img height={70} width={100} alt="photo" />
                            </label>
                          </div>
                        </div>
                        {/* img1 */}
                        <div className="col-sm-3">
                          <div className="fileBx mt-2">
                            <input
                              type="file"
                              name="img1"
                              id="img1"
                              style={{ display: "none" }}
                              //   onChange={(e) => handleImg_1Change(e)}
                            />
                            <label htmlFor="img1">
                              <img
                                height={70}
                                width={100}
                                src={""}
                                alt="Img_1"
                              />
                            </label>
                          </div>
                        </div>
                        {/* img2 */}
                        <div className="col-sm-3">
                          <div className="fileBx mt-2">
                            <input
                              type="file"
                              name="img2"
                              id="img2"
                              //   onChange={(e) => handleImg_2Change(e)}
                              style={{ display: "none" }}
                            />
                            <label htmlFor="img2">
                              <img
                                height={70}
                                width={100}
                                src={""}
                                alt="image_2"
                              />
                            </label>
                          </div>
                        </div>
                        {/* img3 */}
                        <div className="col-sm-3">
                          <div className="fileBx mt-2">
                            <input
                              type="file"
                              name="img3"
                              id="img3"
                              style={{ display: "none" }}
                              //   onChange={(e) => handleImg_3Change(e)}
                            />
                            <label htmlFor="img3">
                              {/* {formData.image_3 ? ( */}
                              <img
                                height={70}
                                width={100}
                                src={"hg"}
                                alt="image_3"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                    {/* <>
                      <h5 className="m0">UPLOAD file</h5>
                      <div className="row" style={{ maxWidth: "700px" }}>
                        <div className="col-sm-3">
                          <div className="fileBx mt-2">
                            <input
                              type="file"
                              name="uploadfile"
                              id="img"
                              //   onChange={(e) => handleimageChange(e)}
                              style={{ display: "none" }}
                              required
                            />
                            <label htmlFor="img">
                              <img
                                height={70}
                                width={100}
                                src={""}
                                alt="photo"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </> */}

                    <Button type="submit" className="text text-white mt30 ">
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            {/* right part end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>
  );
};

export default PostUpdate;
