import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useAppContext } from '../../contextApi/AppContext';

const GoodsItems = ({item}) => {
  const {loading , wishListAdd} = useAppContext()
  const [color, setColor] = useState(false)


    const addWhishlist=(id)=>{
      wishListAdd(id)
      setColor(true)
    }

    const limitDescription = (description) => {
      const words = description.split(' ');
      if (words.length > 20) {
        return words.slice(0, 14).join(' ') + '...';
      }
      return description;
    };

  return (
    <>
    <div className="col col-lg-4 proBx">
         <div className="card mb-3" style={{height: '350px'}} key={item._id}>
           <div className="imgBx">
             <Link to={`/product-detail/${item._id}`}>
               <img
                 src={item.photo}
                 className="card-img-top allImg"
                 alt=""
               />
             </Link>
             <Link className="iconWish" onClick={()=>addWhishlist(item.product_id)} >
              <i className={color === true ? 'fa-solid fa-heart' : 'fa fa-heart-o'} />
             </Link>
           </div>
           <div className="card-body">
             <h5 className="card-title">
               <Link to={`/product-detail/${item._id}`}>
                 {item.title}
               </Link>
             </h5>
             {/* <h6 className="card-text">
             € {item.price}
             </h6> */}
             <p className="card-text">
               <small className="text-body-secondary">
               {limitDescription(item.description)}
               </small>
             </p>
           </div>
         </div>
        </div>
    </>
  )
}

export default GoodsItems


