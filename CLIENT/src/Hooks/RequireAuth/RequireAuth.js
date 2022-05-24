import React from 'react'
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth'
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import auth from '../../firebase.init'
// import { ToastContainer, toast } from 'react-toastify';

function RequireAuth({ children }) {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    if (loading || sending) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/Signin" state={{ from: location }} replace />;
    }

    // if (!user.emailVerified) {
    //     return <div>
    //         <h1 className='text-danger'>Your Email Is Not Verified</h1>
    //         <h3>Plese Check Your Email</h3>
    //         <button className='btn btn-primary' onClick={async () => {
    //             await sendEmailVerification();
    //             alert('Sent email');
    //         }}
    //         >
    //             Verify email Again
    //         </button>
    //     </div>
    // }
    return children;
}

export default RequireAuth