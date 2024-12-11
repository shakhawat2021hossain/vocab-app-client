import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state

    const { createUser, updateUserProfile } = useAuth()

    const imgUpload = async (image) => {
        const formData = new FormData()
        formData.append('image', image);
        const { data } = await axios.post('https://api.imgbb.com/1/upload?key=37c60d712bf322e97597883e93903d85', formData)
        const url = data.data.url
        // console.log(url);
        return url
    
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const image = e.target.image.files[0]

        // const img = 'https://cdn-icons-png.flaticon.com/512/8847/8847419.png'
        // const user = { name, email, password }
        // console.log(user);
        try {
            const img = await imgUpload(image)

            const result = await createUser(email, password)
            console.log(result);

            await updateUserProfile(name, img)

            navigate(from || '/')
            toast.success("successfully register")

        }
        catch (err) {
            console.log(err);
        }


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>

                {/* Sign-Up Form */}
                <form className="mt-6" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Cena"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-black"

                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="******"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-700"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-between my-4">
                    <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                    <p className="text-xs text-center text-gray-500 uppercase">OR</p>
                    <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                </div>

                <SocialLogin />

                <p className="pt-6 text-center">Already have an account? <Link className="underline text-blue-600" to="/login">Login</Link></p>


            </div>
        </div>
    );
};

export default Signup;
