import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NoData = () => {
  const navigate = useNavigate();

  const HandleBack = () => {
    navigate(-1);
  };
  
  return (
    <div>
      <section class="py-3 py-md-2 min-vh-90 d-flex justify-content-center align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="text-center">
                <h2 class="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span class="display-1 fw-bold">4</span>
                  <i class="bi bi-exclamation-circle-fill text-danger display-4"></i>
                  <span class="display-1 fw-bold bsb-flip-h">4</span>
                </h2>
                <h3 class="h2 mb-2">Oops! There is no Data.</h3>
                <p class="mb-5">Add a post, to See your Post Thank you!.</p>
                <Link
                  class="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
                  onClick={HandleBack}
                  role="button"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoData;
