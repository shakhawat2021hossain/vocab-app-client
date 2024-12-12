import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
    const axiosPublic = useAxiosPublic()
    const { data: user, isLoading: loading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/protected', { withCredentials: true });
            return data;
        }
    })
    return { user, loading };
};
export default useAuth;
