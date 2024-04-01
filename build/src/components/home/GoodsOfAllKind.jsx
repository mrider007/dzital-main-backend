import React from "react";
import { Link } from "react-router-dom";
import Product from "../comon/Product";
import { useAppContext } from "../../contextApi/AppContext";

const GoodsOfAllKind = ({ item, index }) => {
  const { goodsList } = useAppContext()
  const isOddIndex = index % 2 !== 0;




  return (
    <>
      <section className={`mt-4 ${isOddIndex ? "bg-light" : ""}`}>
        <article className="container pt-4 pb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">{item.title}</h4>
            <Link className="text text-decoration-none " to={`/${item.title}`} onMouseEnter={(e) => (e.target.style.color = "var(--theme-color)")} onMouseLeave={(e) => e.target.style.color = "black"}>
              View All
            </Link>
          </div>
          {/* item start */}
          <aside className="row pt-2" key={item._id}>
            {
              Array.isArray(goodsList) && goodsList.slice(0, 4).map((item, index) => (
                <Product key={index} item={item} />
              ))
            }
          </aside>
        </article>
      </section>
    </>
  );
};

export default GoodsOfAllKind;
