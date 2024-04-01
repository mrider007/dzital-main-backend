import React, { useEffect, useState } from "react";
import Ads from "../../../components/comon/Ads";
import { Link } from "react-router-dom";
import AccountSideBar from "../AccountSideBar";
import { useAppContext } from "../../../contextApi/AppContext";
import Stack from "@mui/material/Stack";
import { Pagination } from "@mui/material";
import { Skeleton3 } from "../../../components/loading/Skeleton";
import NoData from "../../noData/NoData";


const MyPost = () => {
  const { mypost, getMyPost, totalItem, listLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(totalItem?.post / itemsPerPage);

  const searchData = {
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMyPost(searchData);
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>My Post</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">My Post</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      <section className="midBody">
        <article className="container-fluid">
          <article className="row">
            {/* ad box start */}
            <Ads />
            {/* ad box end */}
            {/* sidebar start */}
            <div className="col-md-3">
              <AccountSideBar />
            </div>
            {/* sidebar end */}
            {/* right part start */}
            <div className="col-md-7">
              <div className="card border-0">
                <div className="card card-body border-0">
                  <h2 className="text24 mb-1">My Post</h2>
                  <p className="text-muted mb-1">
                    Here you can see your post and edit them easily.
                  </p>
                  <hr className="mt0" />
                  {/* item start */}
                  {listLoading.Post ? Array.from({ length: 3 }).map((_, index) => (<Skeleton3 key={index} />)) :
                    Array.isArray(mypost) && mypost.map((item) => (
                      <div className="card mb-3 myPostItem" key={item._id}>
                        {/* {console.log('hgg' ,item)} */}
                        <div className="row g-0">
                          <div className="col-md-4">
                            <div className="imgBx">
                              <img
                                src={item.image}
                                className="img-fluid rounded-start"
                                alt="Dzital"
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-9">
                                  <h5 className="card-title mb-1">
                                    {item.title}
                                  </h5>
                                </div>
                                <div className="col-md-3" align="right">
                                  <h5 className="m0">
                                    <b className="badge bg-warning text-dark">
                                      {/* Any badge content */}
                                    </b>
                                  </h5>
                                </div>
                              </div>
                              <p className="card-text mb-0">
                                {item.description}...{" "}
                              </p>
                              <hr className="mb-2 mt-1" />
                              {item.status === "Approved" ? (
                                <Link
                                  className="btn btn-success btn-sm"
                                  style={{ marginRight: "3px" }}
                                >
                                  <i className="fa fa-eye" /> Approved
                                </Link>
                              ) : (
                                <Link
                                  className="btn btn-secondary btn-sm mx-1"
                                  style={{ marginRight: "3px" }}
                                >
                                  <i className="fa-regular fa-eye-slash" />{" "}
                                  Unapproved
                                </Link>
                              )}
                              <Link
                                to={`/updateProduct/${item._id}`}
                                className="btn btn-dark btn-sm"
                              >
                                <i className="fa-regular fa-pen-to-square " />{" "}
                                Edit
                              </Link>
                              <Link className="btn btn-danger btn-sm mx-1">
                                <i className="fa-sharp fa-solid fa-trash" />{" "}
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {Array.isArray(mypost) && mypost.length > 0 ? (
                    <div align="center">
                      <Stack spacing={2}>
                        <Pagination
                          count={pageCount}
                          page={currentPage}
                          onChange={handlePageChange}
                          color="primary"
                          variant="outlined"
                          shape="rounded"
                          boundaryCount={2}
                          siblingCount={1}
                        />
                      </Stack>
                    </div>
                  )
                    : ''}

                  {/* item end */}
                </div>
              </div>
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



export default MyPost;



