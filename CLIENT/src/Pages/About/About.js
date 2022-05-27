import React from 'react'
import './About.css';
import img from '../../../src/images/about/sohag.png'

const About = () => {
    return (
        <div class=" mx-24 mx-auto">
            <div class="hero min-h-screen">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src={img} class="max-w-sm rounded-lg" />
                    <div class="intro text-left">
                        <h3 className='text-2xl font-bold text-primary'>Hi, I'm</h3>
                        <h1 className='text-6xl font-bold py-2'>Sohag Hasan</h1>
                        <h3 className='text-2xl font-bold text-primary '>Full Stack Web developer</h3>
                        <p className='py-2'>Hello! I'm Sohag Hasan a passionate software engineer. I develop web applications, mobile
                            applications, and desktop applications. My core skill is based on JavaScript and I love to do
                            most of the things using JavaScript. I love to make the web more open to the world. I have
                            graduated with a bachelor's degree in Computer Science Engineering from Chandigarh University at
                            Punjab, India in 2020. I am available for any kind of job opportunity that suits my interests.
                        </p>
                        <button class="btn btn-primary">Click Me</button>
                    </div>
                </div>
            </div>

            {/* prograssbar */}



            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 m-20">
                <div class="col m-5">
                    <h2 className='text-3xl font-bold text-primary text-left pl-3'>Skills</h2>

                    <div class="bg-info py-3 px-1 m-2">
                        <p class="text-left ml-1 py-1">JAVASCRIPT</p>
                        <progress class="progress progress-primary w-100 h-5" value="40" max="100"></progress>
                    </div>

                    <div class="bg-info py-3 px-1 m-2">
                        <p class="text-left ml-1 py-1">REACT</p>
                        <progress class="progress progress-primary w-100 h-5" value="40" max="100"></progress>
                    </div>

                    <div class="bg-info py-3 px-1 m-2">
                        <p class="text-left ml-1 py-1">EXPRESS JS</p>
                        <progress class="progress progress-primary w-100 h-5" value="40" max="100"></progress>
                    </div>

                </div>
                <div class="col">
                    <div class="contact-box bg-info w-75 p-5 m-5">
                        <h3>Email</h3>
                        <h5>mailsohaghasan@gmail.com</h5>
                        <address>Address</address>
                        <p>Mohammadpur,Dhaka</p>
                    </div>
                </div>
            </div>

            <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 m-20">
                <div class="col-4">
                    <div class="border border-primary border-3 rounded m-3 p-3">
                        <i class="bi bi-apple text-primary"></i>
                        <p>React Js</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="border border-primary border-3 rounded m-3 p-3">
                        <i class="bi bi-apple text-primary"></i>
                        <p>Express Js</p>
                    </div>
                </div>

                <div class="col-4">
                    <div class="border border-primary border-3 rounded m-3 p-3">
                        <i class="bi bi-apple text-primary"></i>
                        <p>Node Js</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About