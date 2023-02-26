import React, { useState } from 'react'
import "./Navbar.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Key } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Cart from "../Cart/Cart";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const[open, setOpen] = useState(false);
    const products = useSelector((state)=> state.cart.products);

  return (
    <div className="navbar">
        <div className="wrapper">

            <div className="left"> 
                <div className="item">                 
                    <img  src="/img/flag.png" alt="img" />
                    <KeyboardArrowDownIcon />
                </div>
                <div className="item">
                    <span>USD</span>
                    <KeyboardArrowDownIcon />
                </div>
                <div className="item">
                    <Link className='link' to="/products/1">Women</Link> 
                </div>
                <div className="item">
                    <Link className='link'  to="/products/2">Men</Link> 
                </div>
                <div className="item">
                    <Link className='link'  to="/products/3">Children</Link>
                </div>
                <div className="item">
                    <Link className='link'  to="/products/4">Accessories</Link>
                </div>
            </div>
            <div className="center">
                    <Link className='link'  to="/">Dank 24*7</Link>
            </div>
            <div className="right">
                <div className="item">
                    <Link className='link'  to="/">Homepage</Link> 
                </div>
                <div className="item">
                    <Link className='link'  to="">About</Link> 
                </div>
                <div className="item">
                    <Link className='link'  to="">Contact</Link> 
                </div>
                <div className="item">
                    <Link className='link'  to="">Stores</Link>
                </div>
                <div className="icons">
                    <SearchIcon />
                    <PersonOutlineIcon />
                    <FavoriteBorderIcon/>
                    <div className="cartIcon" onClick={()=> setOpen(!open)}>
                        <ShoppingCartOutlinedIcon />
                        <span>{products.length}</span>
                    </div>
                </div>
            </div>
        </div>
        {open &&  <Cart />}
    </div>
  )
}

export default Navbar