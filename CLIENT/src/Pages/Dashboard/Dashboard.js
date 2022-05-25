import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div class="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <label for="dashboard-sidebar" class="btn btn-primary drawer-button lg:hidden mt-3">Open Side Menu</label>
                <h2 className='text-2xl font-bold text-purple-500'>Welcome to your Dashboard</h2>

                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="dashboard-sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to="/dashboard/myAccount">MyAccount</Link></li>
                    <li><Link to="/dashboard">My MyOrders</Link></li>
                    <li><Link to="/dashboard/myReviews">My Reviews</Link></li>
                    {admin && <>
                        <li><Link to="/dashboard/manageOrders">Manage Orders</Link></li>
                        <li><Link to="/dashboard/manageusers">Manage Users</Link></li>
                        <li><Link to="/dashboard/addProduct">Add Product</Link></li>
                        <li><Link to="/dashboard/manageProducts">ManageProducts</Link></li>

                    </>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard; 