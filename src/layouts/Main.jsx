import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";



const Main = () => {
    const { loading } = useAuth()
    if (loading) return <LoadingSpinner />

    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-68px)]'>
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default Main;