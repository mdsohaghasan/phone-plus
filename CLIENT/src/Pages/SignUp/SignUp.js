import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [agrre, setAgree] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    if (user || gUser) {
        navigate(from, { replace: true });
    }

    let signInError;

    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        // await updateProfile({ displayName: data.name });

    }

    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse px-10">
                <div class="text-center lg:text-left px-20">
                    <h1 class="text-5xl font-bold">SignUp now!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Enter Your Name" class="input input-bordered"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'name is Required'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Enter Email" class="input input-bordered"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" class="input input-bordered"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                                {signInError}
                                {/* <label class="label">
                                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                                <div class="form-check my-3">
                                    <input onClick={() => setAgree(!agrre)} type="checkbox" name='terms' id="exampleCheck1" />
                                    <label className={`ps-2 ${agrre ? '' : `text-danger`}`} for="exampleCheck1">Accept Mobile House Terms And Conditions</label>
                                </div>
                            </div>
                            <div class="form-control mt-6">
                                <button disabled={!agrre} class="btn btn-primary">SignUp</button>
                            </div>
                        </form>
                        <p><small>Already Have an Account <Link className='text-primary' to="/signIn">Please SignIn</Link></small></p>
                        <div class="divider">OR</div>
                        <button onClick={() => signInWithGoogle()} class="btn btn-active btn-primary m-3">SignIn With Google</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SignUp