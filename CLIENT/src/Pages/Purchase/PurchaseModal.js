import React from 'react'

const PurchaseModal = ({ items }) => {
    // const [name, description] = items;
    return (
        <div>
            <input type="checkbox" id="PurchaseModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Your Product is </h3>
                    <p class="py-4"></p>
                    <div class="modal-action">
                        <label for="PurchaseModal" class="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseModal