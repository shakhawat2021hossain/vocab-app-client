import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from './useLogOut';

const axiosSecure = axios.create({
    baseURL: 'https://vocab-app-server.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logOut } = useLogout()
    const navigate = useNavigate()

    // req interceptor
    axiosSecure.interceptors.request.use(
        (config) => {
            // Add any custom headers if needed (no need for token if stored in cookies)
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // response interceptor
    axiosSecure.interceptors.response.use(
        (res) => {
            return res
        },
        async (error) => {
            console.log("response interceptor err:", error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                await logOut();
                navigate('/login')
            }
            return Promise.reject(error)

        }
    )

    return axiosSecure
};

export default useAxiosSecure;