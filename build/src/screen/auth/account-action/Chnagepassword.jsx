import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ads from '../../../components/comon/Ads';
import AccountSideBar from '../AccountSideBar';
import BreadCrum from '../../../components/comon/BreadCrum';
import { useAppContext } from '../../../contextApi/AppContext';

const Chnagepassword = () => {
  const { ChnagePassword, userData } = useAppContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // console.log('changepassword', ChnagePassword)

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password must be the same');
      return;
    }
    ChnagePassword(currentPassword, newPassword)
  };

  const handlePassSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password must be the same');
      return;
    }
    ChnagePassword(currentPassword, newPassword)
  };

  return (
    <>
      <BreadCrum title={'change-password'} />
      {/* page header part end here */}
      {/* page body part start */}
      <section className="midBody">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* sidebar start */}
            <div className="col-md-3">
              <AccountSideBar />
            </div>
            {/* sidebar end */}
            {/* right part start */}
            <div className="col-md-7">
              <div className="card border-0">
                <div className="card card-body border-0">
                  <h2 className="text24 mb5">Password &amp; Security</h2>
                  <p className="text-muted">
                    Manage your password settings and secure your account.
                  </p>
                  {userData.social_id ? (
                    <form onSubmit={handlePassSubmit}>
                      <div className="row mb-4 mt40">
                        <div className="col-md-6 mt-4">
                          <label className="mb-1">
                            <b>Set Password</b>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            onChange={(e) => handleInputChange(e, setNewPassword)}
                          />
                        </div>
                        <div className="col-md-6 mt-4">
                          <label className="mb-1">
                            <b>Confirm Password</b>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            onChange={(e) =>
                              handleInputChange(e, setConfirmPassword)
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn btnTheme"
                        type="submit"
                        style={{ width: 'fit-content', background: 'var(--theme-color)' }}
                      >
                        Update Password
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mt-2">
                          <label className="mb-1">
                            <b>Current Password</b>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            onChange={(e) =>
                              handleInputChange(e, setCurrentPassword)
                            }
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-6 mt-4">
                          <label className="mb-1">
                            <b>New Password</b>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            onChange={(e) => handleInputChange(e, setNewPassword)}
                          />
                        </div>
                        <div className="col-md-6 mt-4">
                          <label className="mb-1">
                            <b>Confirm Password</b>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            onChange={(e) =>
                              handleInputChange(e, setConfirmPassword)
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn btnTheme"
                        type="submit"
                        style={{ width: 'fit-content', background: 'var(--theme-color)' }}
                      >
                        Update Password
                      </button>
                    </form>
                  )}
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

export default Chnagepassword;
