import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()
    // console.log(user);

    if(loading) return <LoadingSpinner/>
    if(user) return children
    return <Navigate to={'/login'} state={location.pathname} replace='true' />
   
};

export default PrivateRoute;