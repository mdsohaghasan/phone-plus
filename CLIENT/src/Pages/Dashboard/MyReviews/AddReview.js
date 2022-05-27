import React from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';


const AddReview = () => {

    const [user] = useAuthState(auth);
    console.log('amder user er name ki', user)

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imgApiKey = '608965fad4c5f3020cfad252a01642fb';


    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const reviewInfo = {
                        name: user.displayName,
                        shortDesc: data.shortDesc,
                        img: img
                    }

                    fetch('https://obscure-cove-62090.herokuapp.com/reviews', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(reviewInfo)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            console.log('reviews er data paisi', inserted)
                            if (inserted.insertedId) {
                                toast.success('reviews add hoise successfully')
                                reset();
                            }
                            else {
                                toast.error('Failed  reviews');
                            }
                        })

                }

            })
    }

    return (
        <div className='m-5'>

            <div>
                <h2 className="text-2xl">Add a New Review</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Review shortDesc</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Review shortDesc"
                            className="textarea textarea-bordered w-full max-w-xs"
                            {...register("shortDesc", {
                                required: {
                                    value: true,
                                    message: 'Review shortDesc is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.shortDesc?.type === 'required' && <span className="label-text-alt text-red-500">{errors.shortDesc.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="file"
                            className="input input-bordered w-full max-w-xs"
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input className='btn w-full max-w-xs  text-white' type="submit" value="Add Review" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReview