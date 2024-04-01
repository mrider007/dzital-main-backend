import React, { useState, useEffect } from "react";
import RealstateProduct from "../components/comon/RealstateProduct";
import Ads from "../components/comon/Ads";
import { Link } from "react-router-dom";
import RealstateFilter from "../components/realstate/RealstateFilter";
import { useAppContext } from "../contextApi/AppContext";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Skeleton3 } from "../components/loading/Skeleton";


const Realstate = () => {
  const { property, totalItem , getProperty, listLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
    const [keyword_search, setKeyword_search] = useState("");
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected + 1);
    };
  
    const itemsPerPage = 12;
    const pageCount = Math.ceil(totalItem?.RealEstate / itemsPerPage);
  
    const searchData = {
      keyword_search: keyword_search,
      page: currentPage,
      limit: itemsPerPage,
    };
  
    useEffect(() => {
      const fetchData = async () => {
        await getProperty(searchData);
      };
      fetchData();
    }, [keyword_search, currentPage]);

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Realestate List Page</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link >Category</Link>
                </li>
                <li className="active">Realestate List Page</li>
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
              <RealstateFilter />
            </div>

            {/* left part end */}
            {/* right part start */}
            <div className="col-md-8">
              {/* product item start */}
              {listLoading.RealEstate ?Array.from({length: 3}).map((_, index)=>( <Skeleton3 key={index}/>)):
              Array.isArray(property)&& property.map((item, index) => (
                <RealstateProduct key={index} item={item} />
              ))}
              {/* product item end */}
              {/* pagination */}
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
              {/* pagination end */}
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

export default Realstate;


