import { createContext } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();

    const { data: user, isLoading, refetch: checkAuth } = useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/protected');
            // console.log(data)
            return data?.user
        },
    })

    const loginMutation = useMutation({
        mutationFn: async(credentials) => {
            const response = await axiosSecure.post('/login', credentials);
            console.log("response", response);
        },
        onSuccess: async () => {
            await new Promise((res) => setTimeout(res, 1000));
            toast.success('Login successful');
            // queryClient.invalidateQueries(['auth'])
            checkAuth()
        },
        onError: (error)=>{
            console.log("error", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "something went wrong")

        }
    })

    const logoutMutation = useMutation({
        mutationFn: () => {
            axiosSecure.post('/logout', {});
        },
        onSuccess: () => {
            queryClient.setQueryData(['auth'], null)
            toast.success('Logout successfully')

        }
    })

    const registerMutation = useMutation({
        mutationFn: async (user) => {
            const { data } = await axiosSecure.post('/register', user)
            return data
        },
        onSuccess: () => {
            toast.success('Register successfully')
            toast.success('Login now')

        }
    })



    const authInfo = {
        user,
        loading: isLoading || loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        register: registerMutation.mutateAsync
    };
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;