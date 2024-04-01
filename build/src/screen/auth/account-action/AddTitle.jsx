import React from "react";
import Ads from "../../../components/comon/Ads";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useAppContext } from "../../../contextApi/AppContext";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css";

const AddTitle = () => {
  const { AddTitleDes } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { servicecategories, subservicecat } = location?.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newData = {
        title: data.title,
        description: data.description,
        category_id: servicecategories,
        sub_category_id: subservicecat,
      };
      const resdata = await AddTitleDes(newData);
      if (resdata.status === 200) {
        navigate("/add-product", {
          state: { id: resdata.data._id, ...newData },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                <li className="active">Add Product</li>
                {/* <li className="active">For Sale: Houses & Apartments</li> */}
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
                  <h5>INCLUDE SOME DETAILS</h5>
                </div>
                <div className="card card-body border-0">
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb20" style={{ maxWidth: "500px" }}>
                      <h6>Title</h6>
                      <input
                        type="text"
                        className="form-control"
                        {...register("title", {
                          required: "Title is required",
                          minLength: { value: 20, message: "A minimum length of 20 characters is required. Please edit the field" },
                          maxLength: { value: 50, message: "Title cannot exceed 50 characters" }
                        })}
                      />
                      {errors.title && (
                        <span className="text text-danger">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                    <div className="mb20" style={{ maxWidth: "500px" }}>
                      <h6>Description</h6>
                      <textarea
                        type="text"
                        className="form-control"
                        {...register("description", {
                          required: "Description is required",
                          minLength: { value: 250, message: "A minimum length of 250 characters is required. Please edit the field" },
                          maxLength: { value: 5500, message: "Title cannot exceed 5500 characters" }
                        })}
                      />
                      {errors.description && (
                        <span className="text text-danger">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                    <Button className="text text-white" type="submit">
                      Next
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

export default AddTitle;
