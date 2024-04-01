import React from 'react'
import { Link } from 'react-router-dom'

const JobFilter = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sideBarNav text14">
        <div className="titelBx">
          <Link
            className="navbar-brand"
            to="#sideBarCollapse"
            data-bs-toggle="collapse"
            aria-controls="sideBarCollapse"
          >
            Short By Filter
          </Link>
          <i
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sideBarCollapse"
            aria-controls="sideBarCollapse"
          >
            <span className="fa fa-chevron-down" />
          </i>
        </div>
        <div className="collapse navbar-collapse" id="sideBarCollapse">
          <div className="customeSidebar">
            <div className="headBx">Work mode</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Work from office
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    49
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Remote
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    5
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Hybrid
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    7
                  </span>
                </li>
              </ul>
            </div>
            <div className="headBx">Experience</div>
            <div className="listBx">
              <input
                type="range"
                defaultValue={200}
                min={0}
                max={1000}
                className="width100 mt10 mb10"
              />
            </div>
            {/* <div className="headBx">Department</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Engineering - Sof..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    32
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> UX, Design &amp; Arc..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    20
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Sales &amp; Busines..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    7
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Marketing &amp; Com..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    5
                  </span>
                </li>
              </ul>
            </div>
            <div className="headBx">Salary</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                    />{" "}
                    3-6 Lakhs (605)
                  </label>
                </li>
                <li className="list-group-item">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                    />{" "}
                    6-10 Lakhs (664)
                  </label>
                </li>
                <li className="list-group-item">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                    />{" "}
                    10-15 Lakhs (209)
                  </label>
                </li>
                <li className="list-group-item">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                    />{" "}
                    15-25 Lakhs (30)
                  </label>
                </li>
                <li className="list-group-item">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                    />{" "}
                    50-75 Lakhs (2)
                  </label>
                </li>
                <li className="list-group-item">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                    />{" "}
                    0-3 Lakhs (142)
                  </label>
                </li>
              </ul>
            </div>
            <div className="headBx">Company type</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Corporate
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    20
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Foreign MNC
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    16
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Indian MNC
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    5
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Startup
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    25
                  </span>
                </li>
              </ul>
            </div>
            <div className="headBx">Education</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Any Postgraduate
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    15
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Post Graduation N..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    7
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Any Graduate
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    2
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> B.Tech/B.E.
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    12
                  </span>
                </li>
              </ul>
            </div>
            <div className="headBx">Industry</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> IT Services &amp; Con..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    7
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Animation &amp; VFX
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    16
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Advertising &amp; Ma..
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    4
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Software Product
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    5
                  </span>
                </li>
              </ul>
            </div>
            <div className="headBx">Location</div>
            <div className="listBx p0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Kolkata
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    185
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Howrah
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    22
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Mumbai
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    13
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <label>
                    <input type="checkbox" /> Delhi / NCR
                  </label>
                  <span className="badge bg-primary rounded-pill">
                    320
                  </span>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default JobFilter