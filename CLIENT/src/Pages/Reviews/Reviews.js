import React from 'react'
import { useState, useEffect } from "react";
import Review from './Review';

const Reviews = () => {
    // const ReviewsItems = [
    //     {
    //         _id: 1,
    //         name: 'Fluoride Treatment',
    //         description: 'Now you can use React Router anywhere in your app! For a simple example, open'
    //         // img: fluoride
    //     },
    //     {
    //         _id: 2,
    //         name: 'Cavity Filling',
    //         description: 'Now you can use React Router anywhere in your app! For a simple example, open'
    //         // img: cavity
    //     },
    //     {
    //         _id: 3,
    //         name: 'Teeth Whitening',
    //         description: 'Now you can use React Router anywhere in your app! For a simple example, open'
    //         // img: whitening
    //     }
    // ];

    const [Items, setItems] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/products`
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    return (


        <div>
            <div>
                <h3 className='text-primary text-5xl my-10'>Our Products</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-20'>

                {
                    Items.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }

            </div>
        </div>

        // <div className=''>
        //     <div className=''>
        //         <h3 className='text-primary text-5xl my-10'>Our Review</h3>
        //     </div>
        //     <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-20'>

        //         {
        //             ReviewsItems.map(review => <Review
        //                 key={review._id}
        //                 review={review}
        //             ></Review>)
        //         }

        //     </div>
        // </div>

    )
}

export default Reviews


