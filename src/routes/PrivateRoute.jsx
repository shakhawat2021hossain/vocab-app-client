import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()

    if(loading) return <LoadingSpinner/>
    if(user && !loading) return children
    return <Navigate to={'/login'} state={location.pathname} replace='true' />
   
};

export default PrivateRoute;