import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../Components/Loading/Loading';
import UsersList from './UsersList';

const ManageUsers = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://obscure-cove-62090.herokuapp.com/manageusers', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-2xl">All Users: {users.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map(user => <UsersList
                                key={user._id}
                                user={user}
                                refetch={refetch}
                            ></UsersList>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default ManageUsers