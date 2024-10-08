import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import Products from './components/products'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect, useState } from 'react'
import { AppContext, useAppState } from './app/context'

function App() {
  
  const [currentRoute,setCurrentRoute] = useState();

  useEffect(() =>{

    const path = window.location.pathname;
    
    setCurrentRoute(path.slice(1,path.length));

  },[]);

  return  <AppContext.Provider value={useAppState()} >
            <BrowserRouter>
              <nav className="navbar navbar-expand-lg bg-body-secondary">
                <div className="container">
                  <Link to={"/home"} className={currentRoute == "home" ? "navbar-brand nav-link text-primary fw-semibold" : "navbar-brand nav-link fw-semibold"}
                    onClick={() => setCurrentRoute("home")}>
                    Home
                  </Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll text-capitalize">
                      <li className="nav-item">
                        <Link to={"/products"} className={currentRoute == "products" ? "nav-link text-primary fw-semibold" : "nav-link fw-semibold"}
                            onClick={() => setCurrentRoute("products")}>
                            products
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/addproduct"} className={currentRoute == "addproduct" ? "nav-link text-primary fw-semibold" : "nav-link fw-semibold"}
                          onClick={() => setCurrentRoute("addproduct")}>
                          new product
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className='container p-3'>
                <Routes>
                  <Route path='/home' element={<Home/>} />
                  <Route path='/products' element={<Products/>} />
                  <Route path='/addproduct' element={<AddProduct/>} />
                  <Route path='/editProduct/:id' element={<AddProduct isUpdate={true}/>} />
                </Routes>  
              </div>
            </BrowserRouter>    
          </AppContext.Provider>
}

export default App
