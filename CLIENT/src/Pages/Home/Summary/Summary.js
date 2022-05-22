import React from 'react'

const Summary = () => {
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row">
                <img src="https://api.lorem.space/image/movie?w=260&h=400" class="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-5xl font-bold">Box Office News!</h1>
                    <p class="py-6">Eric Yuan came to the U.S. from China in the mid 90s to pursue the internet boom—but it took a while to get here. The first eight times he applied for a visa, he was denied. Finally, on the ninth attempt, he was approved, but the process lasted two years.In 2012, after working for a Silicon Valley communication startup for years prior, Yuan founded the communication platform Zoom. In an interview with Thrive Global, Yuan says that Zoom started as a daydream, a solution to a long-distance relationship that required a 10-hour train ride to see the other.Now, Zoom is used by more than 750,000 companies to keep their teams connected through video and audio conferencing, collaborative workspaces, chat, and more. The real-time, face-to-face aspect of Zoom makes it easier for companies to stay in touch, so people can easily work from home or stay connected while working remotely or across several office locations. </p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Summary