import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state

    const {login} = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try{
            const result = await login(email, password)
            console.log(result);
            toast.success("successfully logged in")
            navigate(from || '/')
        }
        catch(err){
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

                {/* Divider */}
                <div className="flex items-center justify-between my-4">
                    <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                    <p className="text-xs text-center text-gray-500 uppercase">OR</p>
                    <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                </div>

                <SocialLogin />

                <p className="pt-6 text-center">Don't have an account? <Link className="underline text-blue-600" to="/signup">register</Link></p>


            </div>
        </div>
    );
};

export default Login;
