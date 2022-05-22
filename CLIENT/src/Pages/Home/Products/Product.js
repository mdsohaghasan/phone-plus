import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {

    return (

        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div class="card-actions justify-end">
                    <Link to={`/productDetails/${product._id}`} class="btn btn-primary">Purchase Now</Link>
                </div>
            </div>
        </div>

    )
}

export default Product