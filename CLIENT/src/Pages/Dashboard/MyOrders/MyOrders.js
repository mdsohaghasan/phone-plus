import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';

const MyOrders = () => {

    const [orderItem, setOrderItem] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/PurchaseInfo?customerEmail=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }
                    return res.json()
                })
                .then(data => {

                    setOrderItem(data);
                });
        }
    }, [user])

    return (
        <div>
            <h2>My Orders: {orderItem.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Quentity</th>
                            <th>phone</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItem.map((orderInfo, index) => <tr key={orderInfo._id}>
                                <th>{index + 1}</th>
                                <td>{orderInfo.product}</td>
                                <td>{orderInfo.Price}</td>
                                <td>{orderInfo.customerName}</td>
                                <td>{orderInfo.phone}</td>
                                <td>
                                    {(orderInfo.Price && !orderInfo.paid) && <Link to={`/dashboard/payment/${orderInfo._id}`}><button className='btn btn-xs btn-success'>pay</button></Link>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrders