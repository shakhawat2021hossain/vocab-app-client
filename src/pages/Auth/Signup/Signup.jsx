import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { FiUser, FiMail, FiImage, FiArrowRight, FiLock } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const { user, loading, register } = useAuth();
    const [previewImage, setPreviewImage] = useState(null);

    const imgUpload = async (image) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            const { data } = await axios.post(
                'https://api.imgbb.com/1/upload?key=37c60d712bf322e97597883e93903d85',
                formData
            );
            return data.data.url;
        } catch (err) {
            toast.error("Failed to upload image");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const image = e.target.image.files[0];

        try {
            const img = await imgUpload(image);
            const user = { name, email, img, password, role: "guest" };
            // console.log(user);
            await register(user);
            navigate('/login')
        } catch (err) {
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message || "Registration failed");
            } else {
                toast.error("An error occurred during registration");
            }
        }
    };

    // if (loading) return <LoadingSpinner />;
    if (user?.email && !loading) return <Navigate to={'/'} />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
            <div className="w-full max-w-md bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-dark-100 mb-2">Create Account</h2>
                        <p className="text-dark-400">Start your Japanese learning journey today</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-dark-500" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

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
                                    placeholder="your@email.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-dark-300 mb-2">
                                Profile Image
                            </label>
                            <div className="flex items-center gap-4">
                                {previewImage && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-500/30">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <label className="flex-1 cursor-pointer">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiImage className="h-5 w-5 text-dark-500" />
                                        </div>
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={handleImageChange}
                                            required
                                            accept="image/*"
                                            className="w-full opacity-0 absolute inset-0 cursor-pointer"
                                        />
                                        <div className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-300">
                                            {previewImage ? "Change image" : "Choose image"}
                                        </div>
                                    </div>
                                </label>
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
                                    {showPass ? <IoIosEye color="gray" /> : <IoIosEyeOff color="gray" />}
                                </span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-800 transition-all duration-200"
                            >
                                {(loading) ? (
                                    <ImSpinner9 className="animate-spin h-5 w-5" />
                                ) : (
                                    <>
                                        Create Account <FiArrowRight className="ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-dark-400">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-primary-400 hover:text-primary-300 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;