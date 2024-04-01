import React, { useState, useEffect } from "react";
import Ads from "./../components/comon/Ads";
import { Link } from "react-router-dom";
import FreeLancerFilter from "../components/freelancer/FreeLancerFilter";
import FreelancerItem from "../components/freelancer/FreelancerItem";
import { useAppContext } from "../contextApi/AppContext";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Skeleton } from "../components/loading/Skeleton";

const Freelancer = () => {
  const { freelancerList, totalItem, getFreelancer, listLoading } =
    useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword_search, setKeyword_search] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const itemsPerPage = 12;
  const pageCount = Math.ceil(totalItem?.freelancer / itemsPerPage);

  const searchData = {
    keyword_search: keyword_search,
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFreelancer(searchData);
    };
    fetchData();
  }, [keyword_search, currentPage]);

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Freelancer</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link >Category</Link>
                </li>
                <li className="active">Freelancer</li>
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
            <FreeLancerFilter />
            {/* left part end */}
            {/* right part start */}
            <div className="col-md-8">
              {/* item start */}
              {listLoading.freelancer? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} col={10}  />)
                : Array.isArray(freelancerList) && freelancerList.map((item, index) => (
                  <FreelancerItem key={index} item={item} />
                ))}
              {/* pagenation start */}
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
              {/* pagenation end */}
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

export default Freelancer;
