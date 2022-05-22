import React, { useEffect, useState } from 'react'
// import Products from '../Home/Products/Products'
import { useParams } from 'react-router-dom';



const Purchase = () => {
    const { id } = useParams();
    const [Itemes, setItemes] = useState([]);
    useEffect(() => {
        const url = `Items.json/${id}`;
        console.log(url)
        fetch(url)
            .then((res) => res.json())
            .then((data) => setItemes(data));

    }, []);

    return (
        <div>
            <div><h5 class="card-title">Name : {Itemes.name}</h5></div>
            <label for="PurchaseModal" class="btn modal-button">open modal</label>
        </div>

        // <Products></Products>
    )
}

export default Purchase