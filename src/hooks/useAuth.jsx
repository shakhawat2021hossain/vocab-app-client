import React, { useContext } from 'react';
import {AuthContext} from '../provider/AuthProvider'

const useAuth = () => {
    const auth = useContext(AuthContext)
    // console.log("Auth", auth);
    return auth;
};

export default useAuth;
