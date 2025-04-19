import axios from 'axios';

const useAxiosSecure = () => {

    const axiosSecure = axios.create({
        baseURL: 'https://vocab-app-server.vercel.app',
        // baseURL: 'http://localhost:5000',
        withCredentials: true
    })


    return axiosSecure
};

export default useAxiosSecure;