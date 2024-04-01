import React, { useState, useEffect } from "react";
import Ads from "./../components/comon/Ads";
import FashionFilter from "../components/fashion-beauty/FashionFilter";
import FashionItem from "../components/fashion-beauty/FashionItem";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Skeleton2 } from "../components/loading/Skeleton";

const FashionBeauty = () => {
  const { fashion, getFashionBeauty, totalItem, listLoading } = useAppContext()
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword_search, setKeyword_search] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const itemsPerPage = 12;
  const pageCount = Math.ceil(totalItem?.Fashion / itemsPerPage);

  const searchData = {
    keyword_search: keyword_search,
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFashionBeauty(searchData);
    };
    fetchData();
  }, [keyword_search, currentPage]);

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Fashion &amp; Beauty</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link>Category</Link>
                </li>
                <li className="active">Fashion &amp; Beauty</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      <section className="midBody bgtheme">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* left part start */}
            <FashionFilter />
            {/* left part end */}
            {/* right part start */}
            <div className="col-md-8">
              <div className="row">
                {/* item start */}
                {listLoading.Fashion ? Array.from({ length: 6 }).map((_, index) => (<Skeleton2 key={index} col={4} />)) :
                  Array.isArray(fashion) && fashion.map((item, index) => (
                    <FashionItem key={index} item={item} />
                  ))}
                {/* item end */}
              </div>
              {/* pagination work start */}
              <div align="center">
                <Stack spacing={2}>
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    boundaryCount={2}
                    siblingCount={1}
                  />
                </Stack>
              </div>
              {/* pagination work end */}
            </div>
            {/* right part end */}
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
          </article>
        </article>
      </section>
    </>
  );
};

export default FashionBeauty;
