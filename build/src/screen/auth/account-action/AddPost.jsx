import React from "react";
import Ads from "../../../components/comon/Ads";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contextApi/AppContext";
import { Button } from "react-bootstrap";

const AddPost = () => {
  const { serviceList, getSubServiceList, subServiceList, subServiceLoading } =
    useAppContext();
  const navigate = useNavigate();

  const handelsubcat = (parId) => {
    getSubServiceList(parId);
  };

  const navigateToAddTitle = (serviceId, subServiceId) => {
    try {
      navigate("/add-title", {
        state: {
          servicecategories: serviceId,
          subservicecat: subServiceId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Add Post</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">Add Post</li>
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
                  <h5>CHOOSE A CATEGORY</h5>
                </div>
                <div
                  className="card card-body border-0"
                  style={{ minHeight: "500px" }}
                >
                  <div className="postCategoryBx">
                    {Array.isArray(serviceList) &&
                      serviceList.map((item, index) => (
                        <div key={index} className="dropend">
                          <button
                            type="button"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={() => handelsubcat(item._id)}
                          >
                            {item.title}
                          </button>
                          <ul
                            className="dropdown-menu"
                            style={{ maxHeight: "250px" }}
                          >
                            <>
                              {subServiceLoading ? (
                                <div
                                  className="spinner-border text-primary text-center"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                <>
                                  {Array.isArray(subServiceList) &&
                                    subServiceList.map((item1) => (
                                      <li key={item1._id}>
                                        <Button
                                          className="dropdown-item"
                                          onClick={() =>
                                            navigateToAddTitle(
                                              item._id,
                                              item1._id
                                            )
                                          }
                                        >
                                          {item1?.title}
                                        </Button>
                                      </li>
                                    ))}
                                </>
                              )}
                            </>
                          </ul>
                        </div>
                      ))}
                  </div>
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

export default AddPost;
