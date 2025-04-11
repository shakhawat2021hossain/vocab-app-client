import React, { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const { data: user, isLoading: loading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/protected');
            // console.log(data);
            return data;
        }
    })
    const authInfo = {user, loading}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;