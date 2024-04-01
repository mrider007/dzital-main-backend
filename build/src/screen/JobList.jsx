import React, { useState, useEffect } from "react";
import Ads from "../components/comon/Ads";
import { Link } from "react-router-dom";
import JobFilter from "../components/job/JobFilter";
import JobItem from "../components/job/JobItem";
import { useAppContext } from "../contextApi/AppContext";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Skeleton } from "../components/loading/Skeleton";


const JobList = () => {
  const { jobList, getJobList, totalItem, listLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword_search, setKeyword_search] = useState("");


  const itemsPerPage = 12;
  const pageCount = Math.ceil(totalItem?.job / itemsPerPage);

  const searchData = {
    keyword_search: keyword_search,
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getJobList(searchData);
    };
    fetchData();
  }, [keyword_search, currentPage]);


  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Jobs</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link >Category</Link>
                </li>
                <li className="active">Jobs</li>
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
            <div className="col-md-2">
              <JobFilter />
            </div> 
            {/* left part end */}
            {/* right part start */}
            <div className="col-md-8">
              <div className="row">
                {listLoading.job ? Array.from({length: 4}).map((item, index) => (<Skeleton key={index} col={6} />)) :
                  Array.isArray(jobList) && jobList.map((item, index) => (
                    <JobItem key={index} item={item} />
                    // <Skeleton key={index} col={6} />
                  ))}
              </div>
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

export default JobList;
