import React, { useState, useEffect } from "react";
import BreadCrum from "../components/comon/BreadCrum";
import Ads from "../components/comon/Ads";
import { Link } from "react-router-dom";
import ProductFilter from "../components/product/ProductFilter";
import { useAppContext } from "../contextApi/AppContext";
import Electronics from "../components/productsitems/Electronics";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Skeleton2} from "../components/loading/Skeleton";
import PaginationItem from "@mui/material/PaginationItem";

const ElectronicsList = () => {
  const { electronicsList, totalItem, getElectronicsProduct, listLoading } =
    useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword_search, setKeyword_search] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const itemsPerPage = 12;
  const pageCount = Math.ceil(totalItem?.Electronics / itemsPerPage);

  const searchData = {
    keyword_search: keyword_search,
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getElectronicsProduct(searchData);
    };
    fetchData();
  }, [keyword_search, currentPage]);
  return (
    <>
      <BreadCrum title={"Electronics"} />
      <section className="midBody bgtheme">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* left part start */}
            <div className="col-md-2">
              <ProductFilter />
            </div>
            {/* left part end */}
            {/* right part start */}
            <div className="col-md-8">
              <div className="row ">
                {/* item start */}
                {listLoading.Electronics
                  ? Array.from({length: 6}).map((item, index) => (
                      <Skeleton2 key={index} col={4} />
                    ))
                  : Array.isArray(electronicsList) &&
                    electronicsList.map((item, index) => (
                      <Electronics key={index} item={item} />
                    ))}
                {/* item end */}
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
                    siblingCount={0}
                    boundaryCount={0}
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

export default ElectronicsList;
