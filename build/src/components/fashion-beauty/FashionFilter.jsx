import React from 'react'
import { Link } from 'react-router-dom'

const FashionFilter = () => {
  return (
    <>
      <div className="col-md-2">
        <nav className="navbar navbar-expand-lg bg-body-tertiary sideBarNav">
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
              <div className="headBx">Gender</div>
              <div className="listBx p0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender1"
                      />
                      <label className="form-check-label" htmlFor="gender1">
                        Men
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender2"
                        defaultChecked=""
                      />
                      <label className="form-check-label" htmlFor="gender2">
                        Women
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="headBx dropHeadBx">
                <Link
                  className="collapseLink"
                  data-bs-toggle="collapse"
                  to="#category"
                >
                  Category <i className="fa fa-chevron-circle-down float-end mt3" />
                </Link>
              </div>
              <div className="listBx p0 collapse show" id="category">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Westernwear
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Indianwear
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Jewellery
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Bags
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Lingerie
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Accessories
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Footwear
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Active &amp; Sports
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Sportswear
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Maternity Wear
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx dropHeadBx">
                <Link
                  className="collapseLink"
                  data-bs-toggle="collapse"
                  to="#occasion"
                >
                  Occasion <i className="fa fa-chevron-circle-down float-end mt3" />
                </Link>
              </div>
              <div className="listBx p0 collapse show" id="occasion">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Casual
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Festive
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Party
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Everyday Essentials
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Wedding
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Evening
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Work
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Sports
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Winter
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Formal
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Fusion
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx dropHeadBx">
                <Link className="collapseLink" data-bs-toggle="collapse" to="#colorBx">
                  Color <i className="fa fa-chevron-circle-down float-end mt3" />
                </Link>
              </div>
              <div className="listBx p0 collapse show colorBx" id="colorBx">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      <span style={{ backgroundColor: "#f00" }} /> Red
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      <span style={{ backgroundColor: "#000" }} /> Black
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      <span style={{ backgroundColor: "#00a903" }} /> Green
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      <span style={{ backgroundColor: "#e7bd42" }} /> Gold
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      <span style={{ backgroundColor: "#663300" }} /> Brown
                    </label>
                  </li>
                </ul>
              </div>
              <div className="headBx">Price</div>
              <div className="listBx">
                <input
                  type="range"
                  defaultValue={200}
                  min={0}
                  max={1000}
                  className="width100 mt10 mb10"
                />
              </div>
              <div className="headBx dropHeadBx">
                <Link
                  className="collapseLink"
                  data-bs-toggle="collapse"
                  to="#material"
                >
                  Material <i className="fa fa-chevron-circle-down float-end mt3" />
                </Link>
              </div>
              <div className="listBx p0 collapse show" id="material">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Cotton
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Polyester
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Brass
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Blended Fabric
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Alloy
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                      />{" "}
                      Viscose
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

export default FashionFilter