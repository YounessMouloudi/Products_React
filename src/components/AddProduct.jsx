import React, { useEffect, useRef, useState } from 'react'
import { getProducts, getProduct, saveProduct, updateProduct } from '../app/app(couche service)';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddProduct({isUpdate}) {
    
    const navigate = useNavigate();

    const {id} = useParams();
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [checked,setChecked] = useState(false);
    /* had state d counter 3ad zadtha bach nrado id => number et pas string hit f json server mnin kona 
    tanbghiw ncréyiw nv produit can id taytcréé automatiquement mais taytcréa en string par ex : "fa0c"
    alors dart had state bach nraja3 l id number w ykon auto-incrément */
    const [counter,setCounter] = useState(0);

    // const nameRef = useRef("");
    // const priceRef = useRef(0);
    // const checkedRef = useRef(false);

    useEffect(() => {
        handleGetProduct();

        getProducts("",0,0).then(resp => {
            let products = resp.data;
                        
            if (products.length > 0) {
                setCounter( parseFloat(products[products.length - 1].id) + 1);
            } else {
                setCounter(1);
            }
        }).catch(err => console.log(err));

    },[]);

    const handleGetProduct = () => {
        if(id){

            getProduct(id).then(response => {
                let product = response.data;
                setName(product.name);
                setPrice(product.price);
                setChecked(product.checked);

                // nameRef.current.value = product.name;
                // priceRef.current.value = product.price;
                // checkedRef.current.value = product.checked;

            }).catch(err => console.log(err));
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isUpdate) {
            let product = {id,name,price : parseFloat(price),checked};
            
            updateProduct(product).then(resp => {
                alert(JSON.stringify(resp.data));
                
                setTimeout(() => {
                    navigate("/products");
                },1000);
            }).catch(err => console.log(err));
        }
        else {
            let product = {id : counter,name,price : parseFloat(price),checked};
            
            if(product.name.trim() == ""){
                alert("le nom doit etre non vide");
                return
            }
            if(product.price <= 0){
                alert("le price doit etre superieur a 0");
                return
            }
            else{
                saveProduct(product).then((resp) => {
                    alert(JSON.stringify(resp.data));

                    setTimeout(() => {
                        navigate("/products");
                    },1000);
            
                }).catch(err => console.log(err));;
            }
        }
    }

    return  <div className='p-2'>
                <div className='col-md-7 mx-auto'>
                    <div className="card">
                        <div className='card-header mb-2 fs-5 fw-semibold'>{ isUpdate? "Update Product :" : "Add New Product :"}</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label mb-1'>Name : </label>
                                    {/* hna f input sta3malna Data Binding Bidirectionnelle càd si je change la
                                    valeur il sera stocker dans la variable (name) et si je modifie la variable
                                    la valeur sera afficher dans la zone de texte */}
                                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} 
                                    value={isUpdate && name } />
                                    {/* <input type="text" className='form-control' ref={nameRef} 
                                    defaultValue={isUpdate && nameRef.current.value}/> */}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label mb-1'>Price : </label>
                                    <input type="number" className='form-control' onChange={(e) => setPrice(e.target.value)} 
                                    value={isUpdate && price } placeholder='0' min={0}/>
                                    {/* <input type="number" className='form-control' ref={priceRef} 
                                    defaultValue={isUpdate && priceRef.current.value } placeholder='0' min={0}/> */}
                                </div>
                                <div className='mb-3 d-flex gap-3'>
                                    <input type="checkbox" id='check' className='form-check-input' 
                                    onChange={(e) => setChecked(e.target.checked)} checked={isUpdate && checked }/>
                                    {/* <input type="checkbox" id='check' className='form-check-input' 
                                    ref={checkedRef} defaultChecked={isUpdate && checkedRef.current.checked }/>
                                    <label htmlFor="check" className='form-check-label'>Checked</label> */}
                                </div>
                                <button type="submit" className='btn btn-success py-1 px-3'>{isUpdate ? "Update" : "Save"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
}
