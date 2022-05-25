import React from 'react'
import { useState, useEffect } from "react";

const ManageOrders = () => {

    const [Itemes, setItemes] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/PurchaseInfo`
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => setItemes(data));
    }, []);

    // EVENT HANDLER FOR DELETE BUTTON
    const handleDelete = id => {
        console.log(id)
        const proceed = window.confirm('are you sure deleteing');
        if (proceed) {
            console.log(id);
            const url = `http://localhost:5000/PurchaseInfo/${id}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }

            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log(data);
                        const remaining = Itemes.filter(item => item._id !== id);
                        setItemes(remaining)
                    }
                })
        }
    }

    return (
        <div>
            <h1>ManageOrders section</h1>
            <div>
                <div>ManageProducts{Itemes.length}</div>
                <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 m-20'>
                    {Itemes.map((item) => (
                        <div class="card card-side bg-base-100 shadow-xl">
                            <figure><img src={item.img} alt="Product Photo" /></figure>
                            <div class="card-body">
                                <h2 class="card-title">Product Name : {item.product}</h2>
                                <p class="card-title">Product Price :{item.Price}</p>
                                <p>Product ShortDes :{item.ShortDes}</p>
                                <p>Product customerName :{item.customerName}</p>
                                <p>Product customerEmail :{item.customerEmail}</p>
                                <p>Product phone :{item.phone}</p>
                                <div class="card-actions justify-end">
                                    <button onClick={() => handleDelete(item._id)} class="btn btn-primary">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ManageOrders

