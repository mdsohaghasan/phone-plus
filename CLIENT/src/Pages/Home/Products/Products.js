import React from 'react'
import Product from './Product';

const Products = () => {
    const ProductsItems = [
        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: fluoride
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            description: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: cavity
        },
        {
            _id: 3,
            name: 'Teeth Whitening',
            description: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: whitening
        }
    ];

    return (
        <div className=''>
            <div className=''>
                <h3 className='text-primary text-5xl my-10'>Our Products</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-20'>

                {
                    ProductsItems.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }

            </div>
        </div>
    )
}

export default Products