import React, { useState } from 'react';
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../Hooks/useFetch";


// const data = [
//    {
//     id: 1,
//     img: "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     img2: "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: "long sleeve graphic Tshirt",
//     isTrue: true,
//     oldPrice: 19,
//     newPrice: 12
//     },
//     {
//       id: 2,
//       img: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       title: "Coat",
//       isTrue: true,
//       oldPrice: 19,
//       newPrice: 12
//     },
//     {
//       id: 3,
//       img: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       title: "Skirt",
//     //   isTrue: true,
//       oldPrice: 19,
//       newPrice: 12
//     },
//     {
//       id: 4,
//       img: "https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       title: "Hat",
//     //   isTrue: true,
//       oldPrice: 19,
//       newPrice: 12
//     }
// ];
const FeaturedProducts = ({ type }) => {

  const {data, loading, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)



  return (
    <div className="featuredProducts">
        <div className="top">
            <h1>{type} Products</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
            lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas.
            </p>
        </div>
        <div className="bottom">
            {error ? "there is something wrong!" :(loading 
              ? "Loading..." 
              : data?.map(item => <Card item= {item} key={item.id} type={type}/>)
            )} 
        </div>
    </div>
  )
}

export default FeaturedProducts;