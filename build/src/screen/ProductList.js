import React, { useState, useEffect } from "react";
import BreadCrum from "../components/comon/BreadCrum";
import Ads from "../components/comon/Ads";
import ProductFilter from "../components/product/ProductFilter";
import { useAppContext } from "../contextApi/AppContext";
import GoodsItems from "../components/productsitems/GoodsItems";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import {Skeleton, Skeleton2} from "../components/loading/Skeleton";

const ProductList = () => {
  const { goodsList, loading, getGoodsProduct, totalItem, listLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword_search, setKeyword_search] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const itemsPerPage = 10;
  const pageCount = Math.ceil(totalItem?.goods / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = goodsList.slice(offset, offset + itemsPerPage);

  const searchData = {
    keyword_search: keyword_search,
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getGoodsProduct(searchData);
    };
    fetchData();
  }, [keyword_search, currentPage]);

  return (
    <>
      <BreadCrum title={"Goods of all kinds"} />
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
              <aside className="row pt-2">
                {/* item start */}
                {listLoading.goods ? Array.from({length: 6}).map((item, index)=>(<Skeleton2 key={index} col={4}/>)):
                 Array.isArray(goodsList) && goodsList.map((item, index) => (
                  <GoodsItems key={index} item={item}  />
                ))}
                {/* item end */}
              </aside>
              <div align="center">
                <Stack spacing={2} >
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

export default ProductList;
