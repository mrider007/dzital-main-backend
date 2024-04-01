import React from 'react'
import { Link } from 'react-router-dom'

const RealstateFilter = () => {
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
                    <div className="dropHeadBx">
                      <Link
                        className="collapseLink"
                        data-bs-toggle="collapse"
                        to="#wohnungMieten"
                      >
                        To Rent An Apartment{" "}
                        <i className="fa fa-chevron-circle-down pull-right mt3" />
                      </Link>
                    </div>
                    <div className="collapse" id="wohnungMieten">
                      <div className="headBx">Rent</div>
                      <div className="listBx">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio1"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio1"
                          >
                            Apartment
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio2"
                          >
                            House
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio3"
                          >
                            temporary living
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio4"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio4"
                          >
                            Shared apartment
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio5"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio5"
                          >
                            Commercial real estate
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio6"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio6"
                          >
                            Garage/parking space
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio7"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio7"
                          >
                            Property tax
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio8"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio8"
                          >
                            New construction project
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="mietenRadio"
                            id="mietenRadio9"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mietenRadio9"
                          >
                            Miscellaneous
                          </label>
                        </div>
                      </div>
                      <div className="headBx">Buy</div>
                      <div className="listBx">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio1"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio1"
                          >
                            House
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio2"
                          >
                            Apartment
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio3"
                          >
                            New Building Project
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio4"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio4"
                          >
                            Commercial Real Estate
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio5"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio5"
                          >
                            Property
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio6"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio6"
                          >
                            Investment Property
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio7"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio7"
                          >
                            Garage
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="kaufenRadio"
                            id="kaufenRadio8"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kaufenRadio8"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="headBx">Build</div>
                      <div className="listBx">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                            />{" "}
                            House Construction &amp; Catalogs
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                            />{" "}
                            Prefabricated Houses
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                            />{" "}
                            Solid Houses
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                            />{" "}
                            Model Houses
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                            />{" "}
                            Model Home Parks
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                            />{" "}
                            Construction Financing
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="headBx">TYPE</div>
                    <div className="listBx">
                      <select
                        name="objectType"
                        className="form-control"
                        title="Property Type"
                      >
                        <option value="">Any</option>
                        <option value="etage">Apartment</option>
                        <option value="mehrfamilienhaus">
                          Apartment building
                        </option>
                        <option value="dachgeschoss">Attic</option>
                        <option value="geschaeftshaus">
                          Commercial Building
                        </option>
                        <option value="gewerbeeinheit">Commercial Unit</option>
                        <option value="maisonette">Maisonnette</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="wohnanlage">Residential Complex</option>
                      </select>
                    </div>
                    <div className="headBx">Buy</div>
                    <div className="listBx">
                      <select
                        name="status"
                        className="form-control"
                        title="Status"
                      >
                        <option value="">Any</option>
                        <option value="s0">Vacant</option>
                        <option value="s1">Tenanted</option>
                      </select>
                    </div>
                    <div className="headBx">Status</div>
                    <div className="listBx">
                      <select
                        name="status"
                        className="form-control"
                        title="Status"
                      >
                        <option value="">Any</option>
                        <option value="s0">Vacant</option>
                        <option value="s1">Tenanted</option>
                      </select>
                    </div>
                    <div className="headBx">Location</div>
                    <div className="listBx">
                      <select
                        name="status"
                        className="form-control"
                        title="Status"
                      >
                        <option>Any</option>
                        <option>Charlottenburg</option>
                        <option>Dahlem</option>
                        <option>Friedenau</option>
                        <option>Friedrichshain</option>
                        <option>Karlshorst</option>
                        <option>Kreuzberg</option>
                      </select>
                    </div>
                    <div className="headBx">Bedrooms</div>
                    <div className="listBx">
                      <select
                        name="status"
                        className="form-control"
                        title="Status"
                      >
                        <option>Any</option>
                        <option>Studio</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <div className="headBx">Price Range</div>
                    <div className="listBx">
                      <label htmlFor="">Min Price</label>
                      <select
                        name="price_from"
                        className="form-control form-control-sm"
                        title="Any"
                      >
                        <option value="">Any</option>
                        <option value={100000}>100,000</option>
                        <option value={200000}>200,000</option>
                        <option value={300000}>300,000</option>
                        <option value={400000}>400,000</option>
                        <option value={500000}>500,000</option>
                        <option value={600000}>600,000</option>
                        <option value={700000}>700,000</option>
                        <option value={800000}>800,000</option>
                        <option value={1000000}>1,000,000+</option>
                      </select>
                      <label className="mt10" htmlFor="">
                        Max Price
                      </label>
                      <select
                        name="price_to"
                        className="form-control form-control-sm"
                        id="search-type"
                        title="Any"
                      >
                        <option value="">Any</option>
                        <option value={100000}>100,000</option>
                        <option value={200000}>200,000</option>
                        <option value={300000}>300,000</option>
                        <option value={400000}>400,000</option>
                        <option value={500000}>500,000</option>
                        <option value={600000}>600,000</option>
                        <option value={700000}>700,000</option>
                        <option value={800000}>800,000</option>
                        <option value={1000000}>1,000,000+</option>
                      </select>
                      <div className="mt10 mb10">
                        <input
                          type="submit"
                          className="btn btnTheme btn-sm"
                          defaultValue="Search"
                          style={{ background: "var(--theme-color)" }}
                        />
                        <input
                          type="reset"
                          className="btn btnTheme btn-sm mx-1"
                          defaultValue="Reset"
                          style={{ background: "var(--theme-color)" }}
                        />
                      </div>
                    </div>
                    <div className="headBx">Similar category</div>
                    <div className="listBx p0">
                      <div className="list-group round0">
                        <Link className="list-group-item d-flex justify-content-between align-items-center">
                          Freelancer
                          <span className="badge bg-primary rounded-pill">
                            92
                          </span>
                        </Link>
                        <Link className="list-group-item d-flex justify-content-between align-items-center">
                          Jobs
                          <span className="badge bg-primary rounded-pill">
                            56
                          </span>
                        </Link>
                        <Link className="list-group-item d-flex justify-content-between align-items-center">
                          Realestate
                          <span className="badge bg-primary rounded-pill">
                            42
                          </span>
                        </Link>
                        <Link className="list-group-item d-flex justify-content-between align-items-center">
                          Lessons &amp; Courses
                          <span className="badge bg-primary rounded-pill">
                            30
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
    </>
  )
}

export default RealstateFilter