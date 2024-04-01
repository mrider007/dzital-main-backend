import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../contextApi/AppContext'

const RealstateProduct = ({item}) => {
  const { wishListAdd} = useAppContext()
  const [color, setColor] = useState(false)
  // console.log('liststate', item)


  const addWhishlist=(id)=>{
    wishListAdd(id)
    setColor(true)
}


const limitDescription = (description) => {
  const words = description.split(' ');
  if (words.length > 30) {
    return words.slice(0, 29).join(' ') + '...';
  }
  return description;
};
  return (
    <>
    <div className="card mb-3 realestateItem">
          <div className="row g-0" key={item._id}>
            <div className="col-md-4">
              <Link to={`/realstate-detail/${item._id}`}>
                <img
                  src={item.photo}
                  className="img-fluid rounded-start allImg"
                  alt="..."
                />
              </Link>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/realstate-detail/${item._id}`}>
                   {item.title}
                  </Link>
                </h5>
                <div className="row">
                  {/* <div className="col-md-8">
                    <h3 className="theme-text">
                      <b>€1,095,000</b>
                    </h3
                  </div> */}
                  <div className="col-md-4" align="right">
                  <Link className="iconWish" onClick={()=>addWhishlist(item.product_id)} >
                    <i className={color === true ? 'fa-solid fa-heart' : 'fa fa-heart-o'} />
                  </Link>
                    &nbsp;&nbsp;
                    {/* <Link className="iconWish" onClick={()=>addWhishlist(item.product_id)}>
                    <i className={color === true ? 'fa-solid fa-heart' : 'fa fa-heart-o'} />
                  </Link> */}
                  </div>
                </div>
                <p className="card-text">{limitDescription(item.description)}</p>
                <Link className="btn btnTheme" style={{background:"var(--theme-color)"}} to={`/realstate-detail/${item._id}`}>
                  View Property &gt;&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default RealstateProduct