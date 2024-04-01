import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../contextApi/AppContext'

const FashionItem = ({ item }) => {

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
      <div className="col-md-4">
        <div className="card shopItem">
          <div className="card-body" style={{ height: '350px' }} key={item._id}>
            <div className="proImg">
              <Link to={`/Fashion-Beauty-Details/${item._id}`}>
                <img src={item.photo} alt="" />
              </Link>
              <Link className="wishList" onClick={() => addWhishlist(item.product_id)} >
                <i className={color === true ? 'fa fa-heart' : 'fa fa-heart-o'} />
              </Link>
            </div>
            <div className="textCont" >
              <h4>
                <Link to={`/Fashion-Beauty-Details/${item._id}`}>{item.brand}</Link>
              </h4>
              <p>
                {item.title}
              </p>
              <p className="card-text">
              <small className="text-body-secondary">
              {limitDescription(item.description)} 
              </small>
            </p>
              <Link
                className="btn btnTheme btn-sm width100"
                style={{ background: "var(--theme-color)" }}
                to={`/Fashion-Beauty-Details/${item._id}`}
              >
                <b>View Details</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FashionItem