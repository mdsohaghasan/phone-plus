import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const PurchaseModal = ({ items, setItems }) => {
    const [user, loading, error] = useAuthState(auth);

    const handleBooking = event => {
        event.preventDefault();
        const PurchaseInfo = {
            productId: items._id,
            product: items.name,
            Price: items.price,
            customerName: user.displayName,
            customerEmail: user.email,
            phone: event.target.phone.value,
            ShortDes: items.shortDesc
        }

        fetch('http://localhost:5000/PurchaseInfo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(PurchaseInfo)
        })
            .then(res => res.json())
            .then(data => {
                // if (data.success) {
                //     toast(`Appointment is set,${data.PurchaseInfo?.product} at ${data.PurchaseInfo?.customerEmail} `)
                // }
                // else {
                //     toast.error(`Already have and appointment on ${data.PurchaseInfo?.product} at ${data.PurchaseInfo?.customerEmail}`)
                // }
                setItems(null);
                console.log('booking for you ', data)
                // refetch();
            });

    }
    return (
        <div>
            <input type="checkbox" id="PurchaseModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Your Product is {items.name} </h3>
                    <h3 class="font-bold text-lg">Your Product is {items.price} </h3>
                    <p class="py-4">{items.shortDesc}</p>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                    <div class="modal-action">
                        <label for="PurchaseModal" class="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default PurchaseModal