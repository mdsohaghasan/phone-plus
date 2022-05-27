import React from 'react'
import { useState, useEffect } from "react";
import Loading from '../../Components/Loading/Loading';
import { useParams } from 'react-router-dom';
import PurchaseCard from './PurchaseCard';
import PurchaseModal from './PurchaseModal';
import { useQuery } from 'react-query';


const Purchase = () => {
    const [product, setItems] = useState([]);
    const { id } = useParams();
    const url = `https://obscure-cove-62090.herokuapp.com/products/${id}`;

    const { data: products, isLoading } = useQuery(['PurchaseInfo', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>

            <div className=''>
                <h3 className='text-primary text-5xl my-10'>Our PurchaseItems</h3>
            </div>
            <div className='w-4/5  m-auto '>
                <div class="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img src={products.img} alt="Album" /></figure>
                    <div class="card-body">
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>Product Name</td>
                                        <td>{products.name}</td>
                                    </tr>
                                    <tr>
                                        <th>2</th>
                                        <td>Product Price</td>
                                        <td>{products.price}</td>
                                    </tr>

                                    <tr>
                                        <th>3</th>
                                        <td>ShortDesc</td>
                                        <td>{products.shortDesc}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="card-actions justify-end">
                                <label onClick={() => setItems(products)} for="PurchaseModal" class="btn modal-button">open modal</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {product && <PurchaseModal product={product} setItems={setItems}></PurchaseModal>}

        </div>


    )
}

export default Purchase
