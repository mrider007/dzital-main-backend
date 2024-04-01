import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../contextApi/AppContext'
import noPostar from '../../assets/no-poster.png'



const Product = ({ item }) => {
  const [color, setColor] = useState(false)
  const { wishListAdd } = useAppContext()

  const addWhishlist = (id) => {
    wishListAdd(id)
    setColor(true)
  }


  const limitDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 14).join(' ') + '...';
    }
    return description;
  };
  return (
    <>
      <div className="col-md-3 col-12 proBx" key={item._id}>
        <div className="card mb-3" style={{ height: '350px' }}  >
          <div className="imgBx" >
            <Link to={`/product-detail/${item._id}`} >
              <img
                src={item.photo || noPostar}
                className="card-img-top allImg"
                alt=""
              />
            </Link>
            <Link className="iconWish" onClick={() => addWhishlist(item.product_id)}>
              <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
            </Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/product-detail/${item._id}`}>
                {item?.title}
              </Link>
            </h5>
            <p className="card-title">
              <small className="text-body-secondary">
              <Link to={`/product-detail/${item._id}`}>
                {limitDescription(item.description)}
              </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product