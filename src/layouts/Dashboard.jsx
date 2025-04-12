import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const { loading } = useAuth()
    if (loading) return <LoadingSpinner />
    return (
        <div className='min-h-screen'>
            <Sidebar/>
            <div className='flex-1 md:ml-64 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;