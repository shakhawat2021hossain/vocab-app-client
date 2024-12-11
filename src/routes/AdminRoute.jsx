import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()
    const {loading} = useAuth()
    if(loading || isLoading) return <LoadingSpinner/>
    if(role === 'admin') return children
    return <Navigate to={'/dashboard'} />
};

export default AdminRoute;