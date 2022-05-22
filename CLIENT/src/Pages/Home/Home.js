import React from 'react'
import Headers from '../../Components/Headers/Headers'
import Reviews from '../Reviews/Reviews'
import Products from './Products/Products'
import Summary from './Summary/Summary'

const Home = () => {
    return (
        <div>
            <Headers></Headers>
            <Summary></Summary>
            <Products></Products>

            <Reviews></Reviews>

        </div>
    )
}

export default Home