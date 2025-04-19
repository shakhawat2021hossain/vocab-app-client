import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-br from-dark-800 to-dark-900 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-40 h-40 bg-primary-500 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-60 h-60 bg-secondary-500 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="relative z-10 text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                            Master Japanese <span className="text-primary-400">Vocabulary</span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-dark-300 max-w-2xl">
                            Discover the most effective way to learn and remember Japanese words through immersive lessons and spaced repetition.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to="/lessons"
                                className="px-8 py-3 text-lg font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition-all shadow-lg hover:shadow-primary-500/30"
                            >
                                Start Learning
                            </Link>
                            <Link
                                to="/how-it-works"
                                className="px-8 py-3 text-lg font-semibold rounded-lg bg-dark-700 hover:bg-dark-600 text-white transition-all border border-dark-600"
                            >
                                How It Works
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center justify-center md:justify-start gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((item) => (
                                    <img
                                        key={item}
                                        className="w-10 h-10 rounded-full border-2 border-dark-800"
                                        src={`https://i.pravatar.cc/150?img=${item}`}
                                        alt="User"
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-dark-300">
                                <p>Join <span className="font-bold text-white">5,000+</span> learners</p>
                                <p className="flex items-center">
                                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    4.9/5 from 200+ reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image/Illustration */}
                    <div className="relative z-10 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl border-2 border-primary-400/30"></div>
                            <div className="relative bg-dark-700 rounded-2xl overflow-hidden shadow-xl border border-dark-600">
                                <img
                                    src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Japanese learning illustration"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-6">
                                    <div className="flex items-center">
                                        <div className="bg-primary-500/90 text-white px-3 py-1 rounded-md text-sm font-medium">
                                            今日の単語
                                        </div>
                                        <p className="ml-3 text-white font-medium">"Konnichiwa" - Hello</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;