import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../contextApi/AppContext'

const Faq = () => {
  const { faq, getFaq } = useAppContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getFaq();
      setLoading(false);
    };
    fetchData();
  }, []);



  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>FAQ</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">FAQ</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      {/* page header part end here */}
      {/* page body part start */}
      <section className="midBody" style={{ backgroundColor: "#fff" }}>
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <div className="col-md-1 adBx">
              <div className="sticky-top">
                <img src="assets/images/Ad.jpg" alt="" />
              </div>
            </div>
            {/* ad box end */}
            {/**************** Body part start ****************/}
            {loading === true ? (
              <div className="col-md-10 d-flex justify-content-center ">
                <div className="spinner-grow text-info my-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="col-md-10">
                {/* about content part start */}
                <div className="row">
                  <div className="col-md-8">
                    <h3 className="mb-3 text-center">Frequently Asked Questions</h3>
                    <div className="accordion mt50" id="accordionExample">
                      {/* item start */}
                      {Array.isArray(faq) && faq.map((item, index) => (
                        <div className="accordion-item" key={item._id}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#accordionItem${index}`}
                              aria-expanded={index === 0 ? "true" : "false"}
                              aria-controls={`accordionItem${index}`}
                            >
                              {item.question}
                            </button>
                          </h2>
                          <div
                            id={`accordionItem${index}`}
                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                            aria-labelledby={`accordionItem${index}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p align="justify"> {item?.answer} </p>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src="./assets/images/job-search.jpg" width="100%" alt="" />
                  </div>
                </div>
                {/* about content part end */}
              </div>
            )}
            {/**************** Body part end ****************/}
            {/* ad box start */}
            <div className="col-md-1 adBx mt50">
              <div className="sticky-top">
                <img src="assets/images/Ad.jpg" alt="" />
              </div>
            </div>
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>

  )
}

export default Faq