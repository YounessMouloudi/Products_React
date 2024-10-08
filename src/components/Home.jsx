import React, { useContext, useEffect, useState } from 'react'
import { getProducts } from '../app/app(couche service)';
// import { AppContext } from '../app/context';

export default function Home() {

    const [totalProducts, setTotalProducts] = useState(0);

    const [checkedProd, setCheckedProd] = useState(0);

    const [notCheckedProd, setNotCheckedProd] = useState(0);

    useEffect(()=> {
        getProducts("",0,0).then(
            response => {
                let products = response.data;
                setTotalProducts(products.length);
                setCheckedProd(products.filter(p => p.checked == true).length)
                setNotCheckedProd(products.filter(p => p.checked != true).length)
            }
        )
    },[])
    return  <>
                <h4 className='mt-4 mb-3'>Dashboard :</h4>
                <div className="row">
                    <div className="col-4">
                        <div className='card'>
                            <div className="card-header fw-bold text-center">Total Products</div>
                            <div className="card-body p-4">
                                <div className='fw-bold fs-1 text-center text-primary'>{totalProducts}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className='card'>
                        <div className="card-header fw-bold text-center">Products Checked</div>
                            <div className="card-body p-4">
                                <div className='fw-bold fs-1 text-center text-primary'>{checkedProd}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className='card'>
                        <div className="card-header fw-bold text-center">Products Not Checked</div>
                            <div className="card-body p-4">
                                <div className='fw-bold fs-1 text-center text-primary'>{notCheckedProd}</div>
                            </div>
                        </div>
                    </div>
                </div>  
            </>   
  
};
