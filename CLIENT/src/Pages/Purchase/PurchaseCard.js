import React from 'react'

const PurchaseCard = ({ product, setItems }) => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={product.img} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">{product.name}</h2>
                <h2 class="card-title">Price : {product.price}</h2>
                <p>{product.shortDesc}</p>
                <div class="card-actions justify-end">
                    <label
                        // onClick={() => setItems(product)}
                        for="PurchaseModal" class="btn modal-button">open modal</label>
                </div>
            </div>
        </div>
    )
}

export default PurchaseCard