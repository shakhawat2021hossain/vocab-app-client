
const Hero = () => {
    return (
        <div className='rounded-xl py-6'>
            <div className="lg:flex lg:flex-row flex flex-col-reverse">
                <div className="flex items-center justify-center lg:justify-start w-full py-8 lg:w-1/2">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Build Your New <span className="text-blue-600 dark:text-blue-400">Idea</span></h2>

                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates.</p>

                        <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                            <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Get Started</a>
                            <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">Learn More</a>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 lg:h-auto flex justify-center">
                    <div className=''>
                        <img src="https://i.ytimg.com/vi/x9-e_3GHrzw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbcxhyilkkSzRm11pmIcxR8_wERQ" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;