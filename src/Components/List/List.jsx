import React from 'react';
import "./List.scss";
import Card from "../Card/Card";
import useFetch from '../../Hooks/useFetch';

const List = ({catId, maxPrice, subCat, sort}) => {
    const {data, loading, error} = useFetch(
      `products?populate=*&[filters][categories][id][$eq]=${catId}${subCat.map(
        (item) => `&filters[sub_categories][id][$eq]=${item}`)}
        &[filters][price][$lte]=${maxPrice}
        &sort=price:${sort}`
      );

    return (
    <div className="list">
      { loading ? "Loading..." : data?.map(item =>(
            <Card item= {item} key= {item.id}/>
        ))}
    </div>
  )
}

export default List;



    // const data = [
    //     {
    //      id: 1,
    //      img: "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //      img2: "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //      title: "long sleeve graphic Tshirt",
    //      isTrue: true,
    //      oldPrice: 19,
    //      newPrice: 12
    //      },
    //      {
    //        id: 2,
    //        img: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //        title: "Coat",
    //        isTrue: true,
    //        oldPrice: 19,
    //        newPrice: 12
    //      },
    //      {
    //        id: 3,
    //        img: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //        title: "Skirt",
    //      //   isTrue: true,
    //        oldPrice: 19,
    //        newPrice: 12
    //      },
    //      {
    //        id: 4,
    //        img: "https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //        title: "Hat",
    //      //   isTrue: true,
    //        oldPrice: 19,
    //        newPrice: 12
    //      }
    //  ];