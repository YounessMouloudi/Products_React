// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { changeCheckProduct, deleteProduct, getProducts, updateProduct } from '../app/app(couche service)';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../app/context';

export default function Products() {

    /* had le state kona dayrino hna aprés rdinah state global ay drnah f context w 3awdnah lta7et */
    // const [productsState,setProductsState] = useState({
    //     products : [],
    //     currentPage : 1,
    //     pageSize : 4,
    //     keyword : "",
    //     totalPages : 0
    // });

    const [productsState,setProductsState] = useContext(AppContext);

    const [query,setQuery] = useState(productsState.keyword);

    const navigate = useNavigate();

    useEffect(() => {
        handleGetProducts(productsState.keyword,productsState.currentPage,productsState.pageSize);
    },[])

    const handleGetProducts = (keyword,currentPage,pageSize) => {

        /* hadi hia la methode li kona khdamin biha 9bal mandiro axios f un fichier bo7do w ndiro les methodes li 
        li ghankhadmo bihom w ghanjibo bihom les données */
        // axios.get("http://localhost:3000/products").then(response => {
        //     // console.log(response.data);
        //     setProducts(response.data);
        // }).catch(error => {
        //     console.log(error);
        // });
        
        getProducts(keyword,currentPage,pageSize).then( response => {
            /* hna 9bal mandiro l pagination kona tanjabdo products ghir b setProducts w ghir b response.data aprés 
            bedlna state kamla w rdinaha productsState w li wlat un objet li fih products et les attributs d pagination 
            et keyword pour la recherche et wlat response = response.data.data 
            
            setProducts(response.data) 

            hadik ...productsState tat3ni ghadi nkhliw ga3 les données initial li défininahom f state ay b7ala drna une
            copie dial tous les données w aprés dakchi li zdna moraha hadak howa changement li ghadi ytra 3la les 
            attributs ila tmodifyaw mn 3and user sinon ghayb9aw wakhdin les données par déf 
            */
            // console.log(response.data.pages);
            setProductsState({
                ...productsState,
                products : response.data.data,
                // keyword : keyword,
                // currentPage : currentPage,
                // pageSize : pageSize
                keyword,
                currentPage,
                pageSize,
                totalPages : response.data.pages
            }); 
        }).catch( error => console.log(error) );
    }

    const handleDeleteProduct = (id) =>{
        // const newProducts = products.filter((p) => p.id != id);
        // setProducts(newProducts);

        // métho 1
        // deleteProduct(id).then( () => handleGetProducts() ).catch( err => console.log(err) );

        // métho 2 => hadi hssan hit tay supprimée mais matay3awdch y recharger les products
        if(window.confirm("vous voulez supprimer cette product")){
            deleteProduct(id).then( () => { 
                const newProducts = productsState.products.filter((p) => p.id != id);
                // setProducts(newProducts);
                setProductsState({...productsState, products:newProducts});

            }).catch( err => console.log(err) );
        }
    }

    const handleChangeChecked = (id,checked) =>{

        changeCheckProduct(id,checked).then(() => {
            const newProducts = productsState.products.map((p) => {

                if(p.id == id) {
                    return {...p, checked: !p.checked};
                }
                return p;
            });

            setProductsState({...productsState, products : newProducts});
        }).catch( err => console.log(err) );
    }

    const handlePaginations = (page) => {
        handleGetProducts(productsState.keyword,page,productsState.pageSize)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        handleGetProducts(query,1,productsState.pageSize);
    }

    return  <div className='p-2'>
                <div className="row">
                    <div className="card p-0">
                        <div className='card-header mb-2 fs-5 fw-semibold'>Listes des Products :</div>
                        <div className="card-body">
                            <form onSubmit={(e) => handleSearch(e)}>
                                <div className='row mx-auto w-50'>
                                    <div className='col d-flex align-items-center pe-1'>
                                        <input type="search" className='form-control me-2 py-1 w-75' 
                                        style={{width:""}} 
                                        onChange={(e) => setQuery(e.target.value)}
                                        value={query}/>
                                        <button className='btn btn-info py-1 px-3'>
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-body">
                            <table className='table table-bordered table-hover'>
                                <thead className='text-center text-capitalize'>
                                    <tr>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>price</th>
                                        <th>checked</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                        {productsState.products && productsState.products.length > 0 ? 
                                            productsState.products.map(({id,name,price,checked},index) => (
                                                <tr key={id}>
                                                    {/* hadi hia la meilleur methode pour fair l'id ou l'indexation au lieu de fair l'id */}
                                                    {/* <td>
                                                        {(productsState.currentPage - 1) * productsState.products.length + index + 1}
                                                    </td> */}
                                                    <td>{id}</td>
                                                    <td>{name}</td>
                                                    <td>{price}</td>
                                                    <td>
                                                        {checked == true ? 
                                                            <button className='btn text-success'
                                                                onClick={() => handleChangeChecked(id,checked)}>
                                                                <FaRegCircleCheck/>
                                                            </button> : 
                                                            <button className='btn text-danger'
                                                                onClick={() => handleChangeChecked(id,checked)}>
                                                                <FaRegCircleXmark/>
                                                            </button>
                                                        }
                                                    </td>
                                                    <td>
                                                        <button onClick={() => navigate("/editProduct/"+id)}
                                                            className='btn btn-outline-primary fs-5 py-1 px-2 me-3'
                                                            title='Edit Product'>
                                                            <MdEdit />
                                                        </button>
                                                        <button className='btn btn-outline-danger fs-5 py-1 px-2' 
                                                            onClick={() => handleDeleteProduct(id)}
                                                            title='Delete Product'>
                                                            <MdDelete/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td colSpan={5} className='text-danger fw-bold'>Product Not Found</td>
                                            </tr>
                                        }
                                </tbody>
                            </table>
                            <div className='d-flex mt-4 align-items-center justify-content-between'>
                                <ul className='nav nav-pills'>
                                    { new Array(productsState.totalPages).fill(0).map((v,index) => 
                                            <li key={index}>
                                                <button className={ index+1 == productsState.currentPage ? 
                                                'btn btn-primary me-2 fw-medium' : 'btn btn-outline-primary me-2 fw-medium'
                                                } 
                                                onClick={ () => handlePaginations(index + 1)}>
                                                    {index + 1}
                                                </button>
                                            </li>
                                        )
                                    }
                                </ul>
                                <h5>
                                    Total Products Par Page  :
                                    <span className="badge text-bg-warning ms-2">
                                        {productsState.products.length}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
