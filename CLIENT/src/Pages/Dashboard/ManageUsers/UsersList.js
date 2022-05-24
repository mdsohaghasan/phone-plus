import React from 'react';
import { toast } from 'react-toastify';

const UsersList = ({ user, refetch }) => {

    const { email, role } = user;
    const handleAdmin = () => {
        fetch(`http://localhost:5000/manageusers/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()
            )
            .then(data => refetch())
    }

    return (
        <tr>
            <th>1</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={handleAdmin} class="btn btn-xs">Add  Admin</button>}</td>
            <td><button class="btn btn-xs">Remove User</button></td>
        </tr>
    )
}

export default UsersList