import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const { mutateAsync } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axiosPublic.post('/login', user)
            return data
        },
    })


    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const user = { email, password }
            const res = await mutateAsync(user)
            console.log(res);

            toast.success("successfully logged in")
            navigate('/')
        }
        catch (err) {
            console.log(err);
        }


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

                <form className="mt-6" onSubmit={handleLogin}>
                    <div>
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
                            Login
                        </button>
                    </div>
                </form>

                

                <p className="pt-6 text-center">Don't have an account? <Link className="underline text-blue-600" to="/signup">register</Link></p>


            </div>
        </div>
    );
};

export default Login;
