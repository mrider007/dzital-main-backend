import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../contextApi/AppContext'

const Electronics = ({ item }) => {
  const [color, setColor] = useState(false)
  const { wishListAdd, getWishList } = useAppContext()

  const addWhishlist = (id) => {
    wishListAdd(id)
    setColor(true)
  }

  return (
    <>
      <div className="col col-lg-4 proBx">
        <div className="card mb-3" style={{height: '350px'}}>
          <div className="imgBx">
            <Link to={`/Electronics-detail/${item._id}`}>
              <img
                src={item.photo}
                className="card-img-top allImg"
                alt=""
              />
            </Link>
            <Link className="iconWish" onClick={() => addWhishlist(item.product_id)} >
              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
            </Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/Electronics-detail/${item._id}`}>
                {item.title}
              </Link>
            </h5>
            <p className="card-text">
              <small className="text-body-secondary">
                {item.description.slice(0, 50)}...
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Electronics