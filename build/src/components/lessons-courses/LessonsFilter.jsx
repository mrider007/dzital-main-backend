import React from 'react'

const LessonsFilter = () => {
  return (
    <>
    <div className="col-md-2">
        <nav className="navbar navbar-expand-lg bg-body-tertiary sideBarNav text14">
          <div className="titelBx">
            <a
              className="navbar-brand"
              href="#sideBarCollapse"
              data-bs-toggle="collapse"
              aria-controls="sideBarCollapse"
            >
              Short By Filter
            </a>
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
              {/* <div className="listBx">
                <form className="input-group pt-1 pb-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <button
                    className="btn btn-warning"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fa fa-search" />
                  </button>
                </form>
              </div> */}
              <div className="headBx dropHeadBx">
                <a
                  className="collapseLink"
                  data-bs-toggle="collapse"
                  href="#marketing"
                >
                  Marketing{" "}
                  <i className="fa fa-chevron-circle-down float-end mt3" />
                </a>
              </div>
              <div className="listBx p0 collapse" id="marketing">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Automation
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Contact Management
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Email Marketing
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Inbound Marketing
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Lead Generation
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Reporting &amp; Performance
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Search Engine Optimization
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Social Media
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Web Design
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx dropHeadBx">
                <a
                  className="collapseLink"
                  data-bs-toggle="collapse"
                  href="#sales"
                >
                  Sales{" "}
                  <i className="fa fa-chevron-circle-down float-end mt3" />
                </a>
              </div>
              <div className="listBx p0 collapse" id="sales">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Contact Management
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Inbound Sales
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Sales Enablement
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx dropHeadBx">
                <a
                  className="collapseLink"
                  data-bs-toggle="collapse"
                  href="#service"
                >
                  Service{" "}
                  <i className="fa fa-chevron-circle-down float-end mt3" />
                </a>
              </div>
              <div className="listBx p0 collapse" id="service">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Contact Management
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Inbound Service
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx">Content Type</div>
              <div className="listBx p0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Course
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Lesson
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Ebook
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx">Duration</div>
              <div className="listBx p0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      30 min or less
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      30 min - 1 Hour
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      1 - 2 Hours
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      2 - 3 Hours
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      3+ Hours
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx">Levels</div>
              <div className="listBx p0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Beginner
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Intermediate
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Advanced
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default LessonsFilter