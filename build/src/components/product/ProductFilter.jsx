import React from 'react'
import { Link } from 'react-router-dom'

const ProductFilter = () => {
  
  return (
    <>
    <div className="card mb25">
                <article className="card-group-item">
                  <header className="card-header">
                    <h6 className="title">Price Range</h6>
                  </header>
                  <div className="filter-content">
                    <div className="card-body">
                      <input
                        type="range"
                        defaultValue={200}
                        min={0}
                        max={1000}
                        className="width100"
                      />
                    </div>
                  </div>
                  <header className="card-header">
                    <h6 className="title">Brands </h6>
                  </header>
                  <div className="filter-content">
                    <div className="card-body">
                      <form>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                          />
                          <span className="form-check-label">
                            Mersedes Benz
                          </span>
                        </label>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                          />
                          <span className="form-check-label">
                            Nissan Altima
                          </span>
                        </label>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                          />
                          <span className="form-check-label">
                            Another Brand
                          </span>
                        </label>
                      </form>
                    </div>
                  </div>
                </article>
                <article className="card-group-item">
                  <header className="card-header">
                    <h6 className="title">Choose type </h6>
                  </header>
                  <div className="filter-content">
                    <div className="card-body">
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadio"
                          defaultValue=""
                        />
                        <span className="form-check-label">
                          First hand items
                        </span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadio"
                          defaultValue=""
                        />
                        <span className="form-check-label">
                          Brand new items
                        </span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadio"
                          defaultValue=""
                        />
                        <span className="form-check-label">
                          Some other option
                        </span>
                      </label>
                    </div>
                  </div>
                  <header className="card-header">
                    <h6 className="title">Similar category </h6>
                  </header>
                  <div className="filter-content">
                    <div
                      className="list-group"
                      style={{ borderRadius: "0px 0px 4px 4px" }}
                    >
                      <Link to={'/'} className="list-group-item d-flex justify-content-between align-items-center">
                        Freelancer
                        <span className="badge bg-primary rounded-pill">
                          92
                        </span>
                      </Link>
                      <Link to={'/'} className="list-group-item d-flex justify-content-between align-items-center">
                        Jobs
                        <span className="badge bg-primary rounded-pill">
                          56
                        </span>
                      </Link>
                      <Link to={'/'} className="list-group-item d-flex justify-content-between align-items-center">
                        Realestate
                        <span className="badge bg-primary rounded-pill">
                          42
                        </span>
                      </Link>
                      <Link to={'/'} className="list-group-item d-flex justify-content-between align-items-center">
                        Lessons &amp; Courses
                        <span className="badge bg-primary rounded-pill">
                          30
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
    </>
  )
}

export default ProductFilter