import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from './useAxiosSecure';

const useLogout = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Create a mutation to call the logout route
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosSecure.post('/logout', {});
            return data;
        },
        onSuccess: () => {
            navigate('/login');
            toast.success('Logout successfully')
        }
    });


    const logOut = () => {
        mutateAsync();
    };

    return { logOut };
};

export default useLogout;
