import React, { useEffect, useState } from 'react';
import Ads from '../../../components/comon/Ads';
import AccountSideBar from '../AccountSideBar';
import { Link } from 'react-router-dom';
import BreadCrum from '../../../components/comon/BreadCrum';
import { useAppContext } from '../../../contextApi/AppContext';

const Packages = () => {
  const { getUserplan, packagesList } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false)


  const fetchdata = async () => {
    setLoading(true);
    try {
      await getUserplan();
    } catch (error) {
      console.error('Error fetching data:', error); 
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchdata();
  }, []);

  // console.log(packagesList);

  return (
    <>
      <BreadCrum title={'packages'} />
      <section className="midBody">
        <article className="container-fluid">
          <article className="row">
            <Ads />
            <div className="col-md-3">
              <AccountSideBar />
            </div>
            <div className="col-md-7">
              <div className="card border-0">
                <div className="card card-body border-0">
                  <h2 className="titleText pb-2">
                    Upgrade your membership to premium
                  </h2>
                  {loading === false ? (
                    <div className="priceTabBx">
                      <div className="innerBx">
                        <div
                          className="nav flex-column nav-pills col-md-4"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          {Array.isArray(packagesList) && packagesList.map((item, index) => (
                            <button
                              className={`nav-link ${index === activeTab ? 'active' : ''
                                }`}
                              id={`${item.title}-tab`}
                              onClick={() => setActiveTab(index)}
                              key={index}
                            >
                              <b>{item.title}</b>
                              <br />
                              <small>
                                {item.no_of_months} Months' Access from Date Of
                                Upgrade
                              </small>
                            </button>
                          ))}
                        </div>
                        <div
                          className="tab-content col-md-8"
                          id="v-pills-tabContent"
                        >
                          {Array.isArray(packagesList) && packagesList.map((item, index) => (
                            <div
                              className={`tab-pane fade ${index === activeTab ? 'show active' : ''
                                }`}
                              id={`${item.title}`}
                              role="tabpanel"
                              aria-labelledby={`${item.title}-tab`}
                              key={index}
                            >
                              <div className="row">
                                <div className="col-md-9">
                                  <h2>{item.title}</h2>
                                  <p className="text-muted m0">
                                    <b>
                                      {item.no_of_months} Months' Access from Date
                                      Of Upgrade
                                    </b>
                                    <br />
                                    You thrive on interactive learning and
                                    personalised feedback from Link teacher.{' '}
                                  </p>
                                </div>
                                <div className="col-md-3">
                                  <h1 className="theme-text">€{item.amount}</h1>
                                  {/* <p className="m0">incl 10%, GST</p> */}
                                </div>
                              </div>
                              <hr className="mt-2 mb-2" />
                              <ul>
                                {Array.isArray(item.benefit) && item.benefit.map((i, index) => (
                                  <li key={index}>{i}</li>
                                ))}
                              </ul>
                              {item.title === 'Free Plan' ? ('') : (
                              <Link
                                className="btn btnTheme"
                                style={{ background: 'var(--theme-color)' }}
                              >
                                <b>Upgrade Packages</b>
                              </Link>
                              ) }
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-10 d-flex justify-content-center ">
                      <div className="spinner-grow text-info my-4" role="status">
                        {/* <span className="sr-only">Loading...</span> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Ads />
          </article>
        </article>
      </section>
    </>
  );
};

export default Packages;
