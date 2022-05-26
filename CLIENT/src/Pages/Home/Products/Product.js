import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {

    return (

        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={product.img} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">{product.name}</h2>
                <h2 class="card-title">{product.price}</h2>
                <p>{product.shortDesc}</p>
                <div class="card-actions justify-end">
                    <Link to={`/purchase/${product._id}`} class="btn btn-primary">Purchase Now</Link>
                </div>
            </div>
        </div>

    )
}

export default Product