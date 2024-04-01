import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import profile from './../../assets/assets/images/user.jpg'

                                                
const AccountSideBar = ({ preview }) => {

  const { userData, LogOut } = useAppContext();

  const {
    image,
    name,
  } = userData || {};

 
  return (
    <>
      <div className="profile-sidebar sticky-top w-full">
        <div className="profile-userpic d-flex justify-content-center align-items-center">
          <img
            src={preview || image || profile}
            className="img-fluid rounded-circle"
            alt=""
            style={{ maxHeight: '120px', minHeight: '110px', maxWidth: '120px' }}
          />
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name">{name}</div>
          {/* <div className="profile-usertitle-job">Co Chairman</div> */}
        </div>
        <div className="profile-userbuttons d-flex ">
          <Link to="/account" className="btn btnTheme small-text" style={{ background: 'var(--theme-color)' }}>
            Personal Info
          </Link>
          <Link to="/packages" className="btn btn-warning small-text">
            Upgrade to Premium
          </Link>
        </div>
        <div className="profile-usermenu">
          <ul className="nav">
            <li>
              <Link to="/change-password">
                <i className="fa fa-lock" /> Password &amp; Security
              </Link>
            </li>
            <li>
              <Link to="/my-post">
                <i className="fa fa-address-card-o" /> My Post
              </Link>
            </li>
            <li>
              <Link to="/add-post">
                <i className="fa fa-address-card-o" /> Add Post
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <i className="fa fa-heart-o" /> Wishlist
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => LogOut()}>
                <i className="fa fa-power-off" /> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccountSideBar;
