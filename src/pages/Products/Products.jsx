import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import List from "../../Components/List/List";
import "./Products.scss";
import useFetch from "../../Hooks/useFetch";  

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const {data, loading, error} = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const handleChange = (e) =>{  
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCategory(isChecked 
      ? [...selectedSubCategory, value] 
      : selectedSubCategory.filter((item)=> item !== value)
    );
  };

  // console.log(selectedSubCategory);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Products Categories</h2>
            {data?.map((item) =>(
            <div className="inputItem" key={item.id}>
              <input type="checkbox" id={item.id} value={item.id} onChange={handleChange}/>
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
            ))} 
        </div>
        <div className="filterItem">
          <h2>filter by price</h2>
          <div className="inputItem">
          <span>0</span>
          <input type="range" min={0} max={1000} onChange={(e)=>(setMaxPrice(e.target.value))} />
          <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input type="radio" id="asc" value="asc" name="price" onChange={()=> setSort("asc")} />
            <label htmlFor="asc">Price(Lowest first)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name="price" onChange={()=> setSort("desc")}/>
            <label htmlFor="desc">Price(Highest first)</label>
          </div>
        </div>
      </div>
      
      <div className="right">
        <img 
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="img failed to load" />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCat={selectedSubCategory} />
      </div>
    </div>
  )
}

export default Products