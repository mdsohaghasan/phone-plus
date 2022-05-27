import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const MyAccount = () => {

    const [user] = useAuthState(auth);

    return (
        <div>
            <h1>MyAccount </h1>
            <div className='w-4/5  m-auto '>
                <div class="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img src={user.img} /></figure>
                    <div class="card-body">
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>Name</td>
                                        <td>{user.displayName}</td>
                                    </tr>
                                    <tr>
                                        <th>2</th>
                                        <td>Email Address</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>3</th>
                                        <td>Phone Number</td>
                                        <td><img src={user.phoneNumber}></img></td>
                                    </tr>
                                    <tr>
                                        <th>4</th>
                                        <td>Photo</td>
                                        <td><img src={user.photoURL}></img></td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MyAccount