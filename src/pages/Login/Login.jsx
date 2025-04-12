import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import PassInput from "../../components/Shared/PassInput";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Login = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()


    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axiosSecure.post('/login', user, {withCredentials: true})
            // console.log("login", data);
            return data
        },
        onSuccess: (data) => {
            toast.success("Logged in Succesfull");
            navigate('/')
        },
        onError: (err) => {
            // console.log(err);
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message)
            }
            else{
                toast.error("something went wrong")
            }
        }
    })


    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const user = { email, password }
        await mutateAsync(user)
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
                            name="email"
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <PassInput />

                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-700 flex items-center justify-center"
                        >
                            {isPending ? <ImSpinner9 className="animate-spin" /> : "Login"}
                        </button>
                    </div>
                </form>



                <p className="pt-6 text-center">Don't have an account? <Link className="underline text-blue-600" to="/signup">register</Link></p>


            </div>
        </div>
    );
};

export default Login;
