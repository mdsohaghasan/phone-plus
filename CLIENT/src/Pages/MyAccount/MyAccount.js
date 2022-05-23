import React from 'react'
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';

const MyAccount = () => {
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [user] = useAuthState(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    if (user) {
        console.log(user)
    }

    // if (loading || updating) {
    //     return <Loading></Loading>
    // }

    // if (error || updateError) {
    //     signInError = <p className='text-red-500'><small>{error?.message || updateError?.message}</small></p>
    // }

    const onSubmit = async data => {
        await updateProfile({ phoneNumber: data.number });
        alert('updeted name');
        navigate(from, { replace: true });
    }

    return (
        <div class="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">phoneNumber</span>
                    </label>
                    <input type="number" placeholder="Enter Your phoneNumber" class="input input-bordered"
                        {...register("number", {
                            required: {
                                value: true,
                                message: 'phoneNumber is Required'
                            }
                        })} />
                    <label className="label">
                        {errors.number?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default MyAccount