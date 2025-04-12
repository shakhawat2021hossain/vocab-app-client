import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PassInput from "../../components/Shared/PassInput";

const Signup = () => {
    const navigate = useNavigate()

    const axiosPublic = useAxiosPublic()

    const imgUpload = async (image) => {
        const formData = new FormData()
        formData.append('image', image);
        const { data } = await axios.post('https://api.imgbb.com/1/upload?key=37c60d712bf322e97597883e93903d85', formData)
        const url = data.data.url
        // console.log(url);
        return url

    }

    const { mutateAsync } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axiosPublic.post('/register', user)
            return data
        },
    })

    const handleSignup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const image = e.target.image.files[0]

        try {
            const img = await imgUpload(image)

            const user = { name, email, img, password, role: "guest" }
            await mutateAsync(user)


            navigate('/login')
            toast.success("successfully register")
            toast.success("Please Login")

        }
        catch (err) {
            // console.log(err.response);
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message)
            }
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
                        <PassInput/>
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

                <p className="pt-6 text-center">Already have an account? <Link className="underline text-blue-600" to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
