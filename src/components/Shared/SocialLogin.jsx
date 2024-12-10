import React from 'react';
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';


const SocialLogin = () => {
    const navigate = useNavigate()
    const {signInWithGoogle} = useAuth()
    const location = useLocation()
    const from = location?.state

    const handleGoogleLogin = async() =>{
        try{
            await signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate(from || '/')
                toast.success('Successfully Logged In')
            })
        }
        catch(err){
            console.log(err);
        }

    }


    return (
        <div>
            <button
            onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full px-4 py-2 space-x-2 border rounded-md bg-gray-200 hover:bg-gray-300"
            >
                <FaGoogle />

                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;