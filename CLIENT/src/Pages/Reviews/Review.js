import React from 'react'

const Review = ({ review }) => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div class="card-body">
                <p>{review.description}</p>
                <div class="avatar ">
                    <div class="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://api.lorem.space/image/face?hash=3174" />
                    </div>
                    <h2 class="card-title">{review.name}</h2>
                </div>

            </div>
        </div>
    )
}

export default Review