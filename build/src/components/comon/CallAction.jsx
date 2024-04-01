import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { toast } from "react-toastify";

const CallAction = () => {
  const {isLogIn}= useAppContext()
  const navigate = useNavigate()

  const redirect = (path) => {
      if(isLogIn){
        navigate(path)
      }else{
        toast('please Login first')
        setTimeout(() => {
          navigate(`/login?redirect=${path.split('/')[1]}`)
        }, 1000);
      }
  }

  return (
    <>
      <div className="card card-sm">
        <div className="card-body p5">
          <div className="">
            <button onClick={()=> redirect('/message')} className="btn btn-secondary btn-sm mb5 mt5">
              <i className="fa fa-comments" /> Text Chat
            </button>
            <Link to='/voice-call' className="btn btn-success btn-sm  mb5 mt5 mx-1">
              <i className="fa fa-phone" /> Voice Call
            </Link>
            <Link to='/videocall' className="btn btn-danger btn-sm  mb5 mt5">
              <i className="fa fa-video-camera" /> Video Call
            </Link>
            <Link
              className="btn btn-primary btn-sm  mb5 mt5 mx-1"
              data-bs-target="#supplierModal"
              data-bs-toggle="modal"
            >
              <i className="fa fa-user-o" /> Contact To Supplier
            </Link>
          </div>
        </div>
        {/* Supplier model start */}
        <div
          className="modal fade supplierModal"
          id="supplierModal"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <h1 className="modal-title fs-6">
                      <b>Get Latest Price</b> by adding Link few details of your
                      requirement
                    </h1>
                    <hr className="mt-2" />
                    <label>
                      <b>Quantity</b>
                    </label>
                    <div
                      className="input-group mt-1 mb-4"
                      style={{ maxWidth: 200 }}
                    >
                      <input type="number" className="form-control" />
                      <span
                        className="input-group-text bg-theme"
                        id="basic-addon2"
                        style={{background:'var(--theme-color)'}}
                      >
                        Pieces
                      </span>
                    </div>
                    <label>
                      <b>Requirement Details</b>
                    </label>
                    <div
                      className="input-group mt-1 mb-4"
                      style={{ maxWidth: 400 }}
                    >
                      <textarea
                        className="form-control"
                        name=""
                        id=""
                        cols={30}
                        rows={3}
                        placeholder="Additional Details About Your Requirement"
                        defaultValue={""}
                      />
                    </div>
                    <button
                      className="btn btnTheme btn-sm"
                      type="button"
                      style={{ minWidth: 150, background:'var(--theme-color)' }}
                    >
                      Next
                    </button>
                    <hr className="mt-4" />
                    <div className="mt-3">
                      <h5>Your contact information</h5>
                      <h6>
                        <i className="fa fa-user-o" /> <b>Mr.</b> Ramesh Singh
                      </h6>
                      <h6>
                        <i className="fa fa-phone" /> <b>+91</b> 1234567890
                        &nbsp; | &nbsp; <i className="fa fa-envelope-o" />{" "}
                        ramesh@gmail.com
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src="assets/images/iPhone-1.jpg"
                      alt=""
                      style={{ maxWidth: "100%" }}
                    />
                    <div className="">
                      <h5 className="fs-5">
                        Iphone 14 refurbished mobiles,bill and warranty
                        available
                      </h5>
                      <h2>€799</h2>
                      <h6>Highlights</h6>
                      <ul className="text14" style={{ marginLeft: "-10px" }}>
                        <li>128 GB ROM</li>
                        <li>6.1 inch Super Retina XDR Display</li>
                        <li>12MP + 12MP</li>
                        <li>A15 Bionic Chip, 6 Core Processor Processor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Supplier model end */}
      </div>
    </>
  );
};

export default CallAction;
