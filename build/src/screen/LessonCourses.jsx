import React, { useState, useEffect } from "react";
import Ads from "./../components/comon/Ads";
import LessonsFilter from "../components/lessons-courses/LessonsFilter";
import LessonItem from "../components/lessons-courses/LessonItem";
import { useAppContext } from "../contextApi/AppContext";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import {Skeleton} from "../components/loading/Skeleton";

const LessonCourses = () => {
  const { lesson, getLesson, totalItem, listLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword_search, setKeyword_search] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const itemsPerPage = 8;
  const pageCount = Math.ceil(totalItem?.Lessons / itemsPerPage);
  
  
  const searchData = {
    keyword_search: keyword_search,
    page: currentPage,
    limit: itemsPerPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLesson(searchData);
    };
    fetchData();
  }, [keyword_search, currentPage]);

  return (
    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Lessons &amp; Courses</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a>Category</a>
                </li>
                <li className="active">Lessons &amp; Courses</li>
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
            <LessonsFilter />
            {/* left part end */}
            {/* right part start */}
            <div className="col-md-8">
              <div className="row">
                {/* item start */}
                {listLoading.Lessons ?Array.from({length: 4}).map((item, index)=>( <Skeleton key={index} col={6} />)):
                Array.isArray(lesson)&& lesson.map((item, index) => (
                  <LessonItem key={index} item={item} />
                ))}
              </div>
              {/* pagination start here */}
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
              {/* pagination end here */}
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

export default LessonCourses;
