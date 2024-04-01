import React, { useState } from 'react'
import Ads from '../../../components/comon/Ads'
import AccountSideBar from '../AccountSideBar'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../../contextApi/AppContext'
import ReactPaginate from 'react-paginate'
import { Skeleton3 } from '../../../components/loading/Skeleton'
import NoData from '../../noData/NoData'

const Wishlist = () => {
  const { wishList, wishListRemove, listLoading } = useAppContext()
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 1;
  const pageCount = Math.ceil(wishList.length / itemsPerPage);
// console.log('wish', wishList)

  const handleDelete = (id) => {
    wishListRemove(id)
  }




  return (

    <>
      <section className="pageBanner">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
              <h4>Wishlist</h4>
            </div>
            <div className="col-md-6">
              <ul className="navList">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">Wishlist</li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      {/* page header part end here */}
      {/* page body part start */}
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
                  <h2 className="text24 mb-1">Wishlist</h2>
                  <p className="text-muted mb-1">
                    Here you can see your wishlist item.
                  </p>
                  <hr className="mt0" />
                  {/* item start */}
                  {listLoading.WishList ?Array.from({length: 3}).map((_, index)=>( <Skeleton3   key={index}/>)): 
                    Array.isArray(wishList) && wishList.map((item, index) =>(
                    <div className="card mb-3 myPostItem" key={index}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className="imgBx">
                            <img
                              src={item.image}
                              className="img-fluid rounded-start"
                              alt={item.title}
                            />
                            <Link className="wishIcon" >
                              <i className="fa-solid fa-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-8" >
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-9">
                                <h5 className="card-title mb-1">
                                  {item.title}
                                </h5>
                              </div>
                            </div>
                            <p className="card-text mb-0">
                              {item.description}
                            </p>
                            <hr className="mb-2 mt-1" />
                            <Link
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fa-sharp fa-solid fa-trash" />
                              Delete Wishlist
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    ))}
                  {/* item end */}
                </div>
                {/* pagenation start */}
                <div align="center">
                  <ReactPaginate
                    breakLabel="..."
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    renderOnZeroPageCount={null}
                  />
                </div>
                {/* pagenation end */}
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


  )
}

export default Wishlist