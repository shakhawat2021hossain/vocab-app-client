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
    

    //response interceptor
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