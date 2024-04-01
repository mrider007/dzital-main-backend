import React, { useState, useEffect, } from "react";
import Ads from "../../../components/comon/Ads";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useAppContext } from "../../../contextApi/AppContext";
import { toast } from "react-toastify";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    AddRealEstate,
    AddJob,
    AddFashionProduct,
    getAttributeList,
    attributeList,
    productId,
    AddFreelancer,
    AddElectronics,
    AddCourse,
    AddGoodsProduct
  } = useAppContext();
  const { handleSubmit } = useForm();
  const [isImage, setIsImage] = useState(false);
  const [formData, setFormData] = useState({});
  const [formData1, setFormData1] = useState({});


  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, photo: file });
  };
  const handleimageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleImg_1Change = (event) => {
    const file1 = event.target.files[0];
    setFormData({ ...formData, image_1: file1 });
  };

  const handleImg_2Change = (event) => {
    const file2 = event.target.files[0];
    setFormData({ ...formData, image_2: file2 });
  };

  const handleImg_3Change = (event) => {
    const file3 = event.target.files[0];
    setFormData({ ...formData, image_3: file3 });
  };

  // console.log("formData", formData);
  const handleChange = (name, value, attId) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData1((prevData) => ({ ...prevData, [attId]: value }));
  };

  useEffect(() => {
    if (location.state === null) {
      toast.error("add Title first");
      navigate(-1);
    }
  }, [location.state, navigate]);

  // console.log('attributeList', attributeList[0].category_name)

  useEffect(() => {
    const payloadData = {
      category_id: location?.state?.category_id || "",
      sub_category_id: location?.state?.sub_category_id || "",
    };

    const fetchattributlist = async () => {
      await getAttributeList(payloadData);
    };
    fetchattributlist();
  }, []);

  useEffect(() => {
    if (attributeList?.length > 0) {
      const categoryNames = Array.isArray(attributeList) && attributeList?.map((item) => item?.category_name);
      if (
        categoryNames?.includes("Jobs") ||
        categoryNames?.includes("Freelancer") ||
        categoryNames?.includes("Lessons & Courses")
      ) {
        setIsImage(true);
      } else {
        setIsImage(false);
      }
    }
  }, [attributeList]);

  const onSubmit = async () => {
    const data1 = {
      "title": location.state.title,
      "description": location.state.description,
      "product_id": productId,
      "category_id": location.state.category_id,
      "sub_category_id": location.state.sub_category_id,
    }
    const dataPost = new FormData();

    Object.keys(data1).forEach((key) => {
      dataPost.append(key, data1[key]);
    });

    Object.entries(formData1).forEach(([key, value], index) => {
      dataPost.append(`attributeData[${index}][attribute_id]`, key);
      dataPost.append(`attributeData[${index}][value]`, value);
    });

    if (isImage === false) {
      dataPost.append('photo', formData.photo || '')
      dataPost.append('image_1', formData.image_1 || '')
      dataPost.append('image_2', formData.image_2 || '')
      dataPost.append('image_3', formData.image_3 || '')
    } else {
      dataPost.append('image', formData.image || '')
    }

    {
      switch (attributeList[0].category_name) {
        case 'Goods of all kinds':
          return AddGoodsProduct(dataPost)
        case 'Fashion & Beauty':
          return AddFashionProduct(dataPost)
        case 'Lessons & Courses':
          return AddCourse(dataPost)
        case 'Jobs':
          return AddJob(dataPost)
        case 'Freelancer':
          return AddFreelancer(dataPost)
        case 'Real Estate':
          return AddRealEstate(dataPost)
        case 'Electronics':
          return AddElectronics(dataPost)
        default:
          return null;
      }
    }
  }

  const handleType = (dataType) => {
    switch (dataType) {
      case 'Salary Expectation':
        return 'number'
      case 'Typing Speed':
        return 'number'
      case 'Salary to':
        return 'number'
      case 'Salary from':
        return 'number'
      case 'Salary':
        return 'number'
      case 'Land Area':
        return 'number'
      case 'Price Range':
        return 'number'
      case 'Number of Rooms':
        return 'number'
      case 'Number of Bathrooms':
        return 'number'
      case 'Year Built':
        return 'number'
      case 'Square Footage':
        return 'number'
      case 'Rent':
        return 'number'
      case 'Quizzes':
        return 'number'
      case 'Lessons':
        return 'number'
      case 'Videos':
        return 'number'
      case 'Hours':
        return 'number'
      case 'Course Duration':
        return 'number'
      case 'Duration':
        return 'number'
      case 'Pack of':
        return 'number'
      case 'Price':
        return 'number'
      case '	Model Number':
        return 'number'
      case 'Release Year':
        return 'number'
      case 'Number of Pieces':
        return 'number'
      default:
        return 'text';
    }
  }

  const subCategoryNames = Array.isArray(attributeList) && attributeList.map((item) => item.sub_category_name);
  const CategoryNames = Array.isArray(attributeList) && attributeList.map((item) => item.category_name);

  // console.log("first", isImage, attributeList)

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
                  <Link className="active" to="/add-post">
                    Add Product{" "}
                  </Link>
                </li>
                <li className="active">{CategoryNames[0]}</li>
                <li className="active">{subCategoryNames[0]}</li>
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
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                  >
                    {Array.isArray(attributeList) &&
                      attributeList.map((item) => (
                        <div key={item._id} className="radioBx mb20">
                          <h6>{item.attribute}</h6>
                          <>
                            {item.options.length > 0 ? (
                              Array.isArray(item.options) &&
                              item?.options?.map((item1, index) => (
                                <React.Fragment  key={item1._id}>
                                  <input
                                    key={index}
                                    type="radio"
                                    className="btn-check"
                                    name={item.attribute}
                                    id={`radio_${item.attribute}_${item1._id}`}
                                    value={item1.option}
                                    onChange={(e) =>
                                      handleChange(
                                        item.attribute,
                                        e.target.value,
                                        item._id
                                      )
                                    }
                                  />
                                  <label
                                    className="btn btn-outline-primary"
                                    htmlFor={`radio_${item.attribute}_${item1._id}`}
                                  >
                                    {" "}
                                    {item1.option}{" "}
                                  </label>
                                </React.Fragment>
                              ))
                            ) : (
                              <div className="row">
                                <div key={item._id} className="">
                                  <input
                                    type={handleType(item.attribute)}
                                    name={item.attribute}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleChange(
                                        item.attribute,
                                        e.target.value,
                                        item._id
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      ))}
                    {isImage === false ? (
                      <>
                        <h5 className="m0">UPLOAD UP TO 4 PHOTOS</h5>
                        <div className="row" style={{ maxWidth: "700px" }}>
                          {/* photo */}
                          <div className="col-sm-3">
                            <div className="fileBx mt-2">
                              <input
                                type="file"
                                name="photo"
                                id="photo"
                                style={{ display: "none" }}
                                onChange={(e) => handlePhotoChange(e)}
                                required
                              />
                              <label htmlFor="photo">
                                {formData.photo ? (
                                  <img
                                    height={70}
                                    width={100}
                                    src={URL.createObjectURL(formData.photo)}
                                    alt="photo"
                                  />
                                ) : (
                                  "Upload Img"
                                )}
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
                                onChange={(e) => handleImg_1Change(e)}
                              />
                              <label htmlFor="img1">
                                {formData.image_1 ? (
                                  <img
                                    height={70}
                                    width={100}
                                    src={URL.createObjectURL(formData.image_1)}
                                    alt="Img_1"
                                  />
                                ) : (
                                  "Upload Img"
                                )}
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
                                onChange={(e) => handleImg_2Change(e)}
                                style={{ display: "none" }}
                              />
                              <label htmlFor="img2">
                                {formData.image_2 ? (
                                  <img
                                    height={70}
                                    width={100}
                                    src={URL.createObjectURL(formData.image_2)}
                                    alt="image_2"
                                  />
                                ) : (
                                  "Upload Img"
                                )}
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
                                onChange={(e) => handleImg_3Change(e)}
                              />
                              <label htmlFor="img3">
                                {formData.image_3 ? (
                                  <img
                                    height={70}
                                    width={100}
                                    src={URL.createObjectURL(formData.image_3)}
                                    alt="image_3"
                                  />
                                ) : (
                                  "Upload Img"
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h5 className="m0">UPLOAD file</h5>
                        <div className="row" style={{ maxWidth: "700px" }}>
                          <div className="col-sm-3">
                            <div className="fileBx mt-2">
                              <input
                                type="file"
                                name="uploadfile"
                                id="img"
                                onChange={(e) => handleimageChange(e)}
                                style={{ display: "none" }}
                                required
                              />
                              <label htmlFor="img">
                                {formData.image ? (
                                  <img
                                    height={70}
                                    width={100}
                                    src={URL.createObjectURL(formData.image)}
                                    alt="photo"
                                  />
                                ) : (
                                  "Upload Img"
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <Button type="submit" className="text text-white mt-2">
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

export default AddProduct;
