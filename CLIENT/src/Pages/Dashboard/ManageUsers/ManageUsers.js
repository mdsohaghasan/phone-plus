import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../Components/Loading/Loading';
import UsersList from './UsersList';

const ManageUsers = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/manageusers', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    // handle admin
    // const { email, role } = users;
    // const handleAdmin = () => {
    //     fetch(`http://localhost:5000/manageusers/admin/${email}`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json()
    //         )
    //         .then(data => refetch())
    // }

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

                        {/* {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.role !== 'admin' && <button onClick={handleAdmin} class="btn btn-xs">Add  Admin</button>}</td>
                                <td><button class="btn btn-xs">Remove User</button></td>
                            </tr>)
                        } */}


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