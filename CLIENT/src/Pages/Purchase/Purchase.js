import React, { useEffect, useState } from 'react'
// import Products from '../Home/Products/Products'
// import { useParams } from 'react-router-dom';
import PurchaseCard from './PurchaseCard';
import PurchaseModal from './PurchaseModal';



const Purchase = () => {

    const [items, setItems] = useState(null);

    // const { id } = useParams();
    // const [Itemes, setItemes] = useState([]);
    // useEffect(() => {
    //     const url = `http://localhost:5000/products/${id}`;
    //     console.log(url)
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => setItemes(data));

    // }, []);

    const ProductsItems = [
        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: fluoride
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            description: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: cavity
        },
        {
            _id: 3,
            name: 'Teeth Whitening',
            description: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: whitening
        }
    ];

    return (
        <div>

            <div className=''>
                <h3 className='text-primary text-5xl my-10'>Our Products</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-20'>

                {
                    ProductsItems.map(product => <PurchaseCard
                        key={product._id}
                        product={product}
                        setItems={setItems}
                    ></PurchaseCard>)
                }

            </div>
            {items && <PurchaseModal Items={items}></PurchaseModal>}

        </div>

        // <Products></Products>
    )
}

export default Purchase