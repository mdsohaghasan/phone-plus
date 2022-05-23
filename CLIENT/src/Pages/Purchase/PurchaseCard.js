import React from 'react'

const PurchaseCard = ({ product, setItems }) => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div class="card-actions justify-end">
                    <label onClick={() => setItems(product)} for="PurchaseModal" class="btn modal-button">open modal</label>
                </div>
            </div>
        </div>
    )
}

export default PurchaseCard