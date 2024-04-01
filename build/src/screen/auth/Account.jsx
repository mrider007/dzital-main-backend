import React, { useEffect, useState } from "react";
import Ads from "../../components/comon/Ads";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import AccountSideBar from "./AccountSideBar";
import BreadCrum from "../../components/comon/BreadCrum";
import { toast } from "react-toastify";

const Account = () => {
  const { userData, updateProfile } = useAppContext();
  const [updatedName, setUpdatedName] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedMobile, setUpdatedMobile] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setpreview] = useState('')


  // console.log('user', userData.social_id  )
  const {
    email,
    image,
    mobile,
    name,
    bio,
    address,
  } = userData || {};

  const handleUpdateProfile = () => {
    updateProfile(updatedName || name, updatedEmail || email, selectedImage || image, updatedMobile || mobile, updatedBio || bio, updatedAddress || address);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const maxSizeInBytes = 900 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error('File size exceeds the limit. Please choose a smaller file.');
      setSelectedImage(null);
      setpreview(null);
      return;
    }
    setSelectedImage(file);
    setpreview(URL.createObjectURL(file));
  };



  useEffect(() => {
    setUpdatedBio(bio);
  }, [bio]);

  return (
    <>
      <BreadCrum title={"Accounts"} />

      <section className="midBody bgtheme">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* left part start */}
            <div className="col-md-3">
              {/* sidebar start */}
              <AccountSideBar preview={preview} />
              {/* sidebar end */}
            </div>
            {/* left part end */}
            {/* right part start */}
            <div className="col-md-7">
              <div className="card border-0">
                <div className="card card-body border-0">
                  <h2 className="titleText">Personal Info</h2>
                  <div className="row">
                    <div className="col-md-9 mt-2">
                      <label className="mb-1">
                        <b>Short Bio</b>
                      </label>
                      <div>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={updatedBio}
                          onChange={(e) => setUpdatedBio(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 mt-2">
                      <div className="fileBx">
                        <input
                          type="file"
                          name="uploadfile"
                          id="img"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <label htmlFor="img">Click me to upload image</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-0 mt-4">
                <div className="card card-body border-0 profileBx">
                  {/* item start */}
                  <div className="item mb20">
                    <Link
                      className="nameTag collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#fullName"
                    >
                      Full Name{" "}
                      <i className="fa fa-pencil-square-o" style={{ cursor: "pointer" }} title="Edit" />
                      <h5 className="mb5">{name}</h5>
                    </Link>
                    <div className="collapse" id="fullName">
                      <input
                        type="text"
                        className="form-control"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="item mb20">
                    <Link
                      className="nameTag collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#emailId"
                    >
                      Email ID
                      <i className="fa fa-pencil-square-o" style={{ cursor: "pointer" }} title="Edit" />
                      <h5 className="mb5">{email}</h5>
                    </Link>
                    <div className="collapse" id="emailId">
                      <input
                        type="email"
                        className="form-control"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="item mb20">
                    <Link
                      className="nameTag collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#phoneNumber"
                    >
                      Phone Number
                      <i className="fa fa-pencil-square-o" style={{ cursor: "pointer" }} title="Edit" />
                      <h5 className="mb5">{mobile}</h5>
                    </Link>
                    <div className="collapse" id="phoneNumber">
                      <input
                        type="number"
                        className="form-control"
                        value={updatedMobile}
                        onChange={(e) => setUpdatedMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* item end */}
                  {/* item start */}
                  <div className="item mb20">
                    <Link
                      className="nameTag collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#address"
                    >
                      Address
                      <i className="fa fa-pencil-square-o" style={{ cursor: "pointer" }} title="Edit" />
                      <h5 className="mb5">
                        {address}
                      </h5>
                    </Link>
                    <div className="collapse" id="address">
                      <input
                        type="text"
                        className="form-control"
                        value={updatedAddress}
                        onChange={(e) => setUpdatedAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* item end */}
                </div>
                <button className="btn  mt-2" style={{ background: 'var(--theme-color)' }} onClick={handleUpdateProfile}>
                  Update
                </button>
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

export default Account;
