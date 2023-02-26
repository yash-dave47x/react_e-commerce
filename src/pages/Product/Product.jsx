import React, { useState } from 'react'
import "./Product.scss";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import useFetch from "../../Hooks/useFetch";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartReducer';

const Product = () => {
  const id = useParams().id;
  const [selectedImage, setSelectedImage] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const {data, loading, error} = useFetch(
    `products/${id}?populate=*`
    );
    const dispatch = useDispatch();

  const increaseQuantity = () =>{
    if (quantity>=5){
      alert("quantity cannot exceed 5");
    }
    else{
      setQuantity((previousQuantity)=> previousQuantity+1);
    }
  }

  return (
    <div className="product">
      {loading ? "Loading..." 
      :
        <><div className="left">
        <div className="images">
          <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url} alt="Image 1" onClick={()=> setSelectedImage("img")}/>
          <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url} alt="Image 2" onClick={()=> setSelectedImage("img2")}/>
        </div>
        <div className="mainImage">
          <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes[selectedImage]?.data?.attributes?.url} alt="Selected image" />
        </div>
      </div>
      
      <div className="right">
        <h1>{data?.attributes?.title}</h1>
        <span className='price'>${data?.attributes?.price}</span>
        <p>
          {data?.attributes?.desc}
        </p>
        <div className="quantity">
          <button onClick={()=> setQuantity((prev)=> prev===1 ? 1: prev-1)}>-</button>
          {quantity}
          <button onClick={increaseQuantity}>+</button>
        </div>
        <button className='add' onClick={()=> 
          dispatch(
            addToCart({
              id: data.id,
              title: data.attributes.title,
              desc: data.attributes.desc,
              price: data.attributes.price,
              img: data.attributes.img.data.attributes.url,
              quantity
            })
          )
        }>
          <AddShoppingCartIcon />ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderIcon />ADD TO WISHLIST
          </div>
          <div className="item">
            <BalanceIcon />COMPARE
          </div>
        </div>
        <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>

      </div> </>}
    </div>
  )
}

export default Product