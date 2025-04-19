import { Link, Navigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
    const { login, loading, user } = useAuth();
    const [showPass, setShowPass] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await login({ email, password });
        } catch (err) {
            console.log("Login error", err);
        }
    };

    // if (loading) return <LoadingSpinner />;
    if (user?.email && !loading) return <Navigate to={'/'} />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
            <div className="w-full max-w-md bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-dark-100 mb-2">Welcome Back</h2>
                        <p className="text-dark-400">Sign in to continue your Japanese learning journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-dark-500" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-dark-500" />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="******"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <span onClick={() => setShowPass(!showPass)} className="absolute top-[52%] transform -translate-y-1/2 right-2 cursor-pointer text-gray-600">
                                    {showPass ? <IoIosEye color="gray" /> : <IoIosEyeOff color="gray"/>}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-dark-600 rounded bg-dark-700"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-400">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-primary-400 hover:text-primary-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-800 transition-all duration-200"
                            >
                                {loading ? (
                                    <ImSpinner9 className="animate-spin h-5 w-5" />
                                ) : (
                                    <>
                                        Sign In <FiArrowRight className="ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-dark-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-dark-800 text-dark-400">
                                    New to 日本?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/signup"
                                className="w-full flex justify-center px-4 py-2 border border-dark-600 rounded-lg shadow-sm text-sm font-medium text-dark-300 hover:bg-dark-700 hover:text-primary-400 transition-colors"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;