import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';  // Import your Axios hook
import toast from 'react-hot-toast';

const useLogout = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Create a mutation to call the logout route
    const { mutate } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosPublic.post('/logout', {}, { withCredentials: true });
            return data;
        },
        onSuccess: () => {
            navigate('/login');
            toast.success('Logout successfully')
        }
    });


    const logOut = () => {
        mutate();
    };

    return { logOut };
};

export default useLogout;
