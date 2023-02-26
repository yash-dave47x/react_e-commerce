import './App.scss';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Home from './pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

const Layout = () =>{
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: < Layout/>,
    children: [
      {
        path: "/",
        element: < Home/>,
      },
      {
        path: "/products/:id",
        element: < Products/>,
      },
      {
        path: "/product/:id",
        element: < Product/>,
      },
    ]
  },
]);
function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
