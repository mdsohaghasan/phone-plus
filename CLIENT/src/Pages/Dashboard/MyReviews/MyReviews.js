import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';

const MyReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`https://obscure-cove-62090.herokuapp.com/reviews?customerEmail=${user.email}`, {
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

                    setReviews(data);
                });
        }
    }, [user])

    return (
        <div>
            <h2>My Orders: {reviews.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) => <tr key={review._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img src="https://api.lorem.space/image/face?hash=3174" />
                                    {/* <img src={review.img}></img> */}
                                </td>
                                <td>{review.name}</td>
                                <td>{review.shortDesc}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyReviews