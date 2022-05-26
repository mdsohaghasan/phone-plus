import React from 'react'
import { useState, useEffect } from "react";
import Product from './Product';

const Products = () => {

    const [Items, setItems] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/products`
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    return (
        <div>
            <div>
                <h3 className='text-primary text-5xl my-10'>Our Products</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-20'>

                {
                    Items.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }

            </div>
        </div>
    )
}

export default Products