import React, {
    // useEffect,
    useState
} from 'react'
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


    const PurchaseItems = [
        {
            _id: 1,
            name: 'Fluoride Treatment',
            price: 100,
            shortDesc: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: fluoride
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            price: 200,
            shortDesc: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: cavity
        },
        {
            _id: 3,
            name: 'Teeth Whitening',
            price: 300,
            shortDesc: 'Now you can use React Router anywhere in your app! For a simple example, open'
            // img: whitening
        }
    ];

    return (
        <div>

            <div className=''>
                <h3 className='text-primary text-5xl my-10'>Our PurchaseItems</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-20'>

                {
                    PurchaseItems.map(product => <PurchaseCard
                        key={product._id}
                        product={product}
                        setItems={setItems}
                    ></PurchaseCard>)

                }
            </div>
            {items && <PurchaseModal items={items} setItems={setItems}></PurchaseModal>}

        </div>


    )
}

export default Purchase