import React from "react";
import { Link } from "react-router-dom";

const BreadCrum = ({title}) => {
  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>{title}</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`#`}>Category</Link>
                </li>
                <li className="active">{title}</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
    </>
  );
};

export default BreadCrum;
