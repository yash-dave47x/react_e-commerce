import React from 'react'
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../Redux/cartReducer';
import {loadStripe} from '@stripe/stripe-js';
import { makeRequest } from '../../makeRequest';

const Cart = () => {
  const products = useSelector((state)=> state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () =>{
      let total = 0;
      products.forEach(item => total+= (item.price * item.quantity));
      return total.toFixed(2);
  }  

//   const stripePromise = loadStripe("pk_test_51MetIUSAJeD8JbHNGfUrwXH9q6yd198pnDcO0vZxwfPXszbLSPCPp1nVZlkICm0gq9rQYeKPTHKmDt9LpOAki6i700Jw4VYkGp");

//   const handlePayment = async () => {
//     try{
//         const stripe = await stripePromise;

//         const res = await makeRequest.post("/order", {
//             products,
//         });

//         await stripe.redirectToCheckout({sessionId: res.data.stripeSession.id});
//     }catch(error){
//         console.log("error in handling payment at Cart.jsx" + error);
//     }
//   };


const stripePromise = loadStripe(
    "pk_test_51MetIUSAJeD8JbHNGfUrwXH9q6yd198pnDcO0vZxwfPXszbLSPCPp1nVZlkICm0gq9rQYeKPTHKmDt9LpOAki6i700Jw4VYkGp"
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cart">
        <h1>Products in your cart</h1>
        {products.map(item => (
            <div className="item" key={item.id}>
            {console.log("inside map of cart " +item.id)}
                <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="product image" />
                <div className="details">
                    <h1>{item.title}</h1>
                    <p>{item.desc?.substring(0,100)} </p>
                    <div className="price">
                        {item.quantity} × {item.price}
                    </div>
                </div>
                <DeleteOutlinedIcon className='delete' onClick={()=> dispatch(removeItem(item.id))} />
            </div>
        ))}
        <div className="total">
            <span>Subtotal</span>
            <span>${totalPrice()}</span>
        </div>
        <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        <span className='reset' onClick={()=> dispatch(resetCart())}>Reset Cart</span>
    </div>
  )
}

export default Cart