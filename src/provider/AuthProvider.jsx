import { createContext, useState, useEffect } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axiosSecure.get('/protected');
                // console.log("use auth", data);
                setUser(data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const authInfo = { loading, user };
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;