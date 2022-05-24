import React, { useState } from 'react'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loading from '../../Components/Loading/Loading';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useToken from '../../Hooks/useToken/useToken';

const SignIn = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [agrre, setAgree] = useState(false);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const [token] = useToken(user || gUser);

    if (token) {
        navigate(from, { replace: true });
    }


    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }


    const onSubmit = async data => {
        await signInWithEmailAndPassword(data.email, data.password);

    }

    // reset password
    // const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    // const resetPassword = async (data) => {
    //     if (data.email) {
    //         await sendPasswordResetEmail(data.email);
    //         alert('Sent email');
    //     }
    //     else {
    //         alert('Pleace Enter Your Currect Email Address');
    //     }
    // }

    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse px-10">
                <div class="text-center lg:text-left px-20">
                    <h1 class="text-5xl font-bold">Login now!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" class="input input-bordered"
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
                                <input type="text" placeholder="password" class="input input-bordered"
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
                                <label class="label"> <a href="#"
                                    // onClick={resetPassword}
                                    class="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div class="form-check">
                                <input onClick={() => setAgree(!agrre)} type="checkbox" name='terms' id="exampleCheck1" />
                                <label className={`ps-2 ${agrre ? '' : `text-danger`}`} for="exampleCheck1">Accept Plus Terms</label>
                            </div>
                            <div class="form-control mt-6">
                                <button disabled={!agrre} class="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <p><small>Are You New <Link className='text-primary' to="/signUp">Please Register Account</Link></small></p>
                        <div class="divider">OR</div>
                        <button onClick={() => signInWithGoogle()} class="btn btn-active btn-primary m-3">Login With Google</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SignIn