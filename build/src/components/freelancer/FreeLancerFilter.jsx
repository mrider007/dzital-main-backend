import React from 'react'
import { Link } from 'react-router-dom'

const FreeLancerFilter = () => {
  return (
    <>
    <div className="col-md-2">
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
              <div className="headBx">All Categories</div>
              <div className="listBx p0">
                <div className="list-group list-group-flush">
                  <Link className="list-group-item" to="#.">
                    Graphic Design &amp; Multimedia
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Writing, Content &amp; Translation
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Data Entry &amp; Admin
                  </Link>
                  <Link className="list-group-item active" to="#.">
                    Finance &amp; Accounting
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Sales &amp; Marketing
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Customer Support &amp; Service
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Social Media, SEO &amp; SEM
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Mobile Application
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Others
                  </Link>
                  <Link className="list-group-item" to="#.">
                    Music &amp; Audio
                  </Link>
                </div>
              </div>
              <div className="headBx">Price Range</div>
              <div className="listBx">
                <input
                  type="range"
                  defaultValue={200}
                  min={0}
                  max={1000}
                  className="width100 mt10 mb10"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default FreeLancerFilter