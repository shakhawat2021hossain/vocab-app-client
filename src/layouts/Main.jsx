import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";



const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-68px)] max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;