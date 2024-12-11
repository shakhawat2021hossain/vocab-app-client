import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logOut } = useAuth()
    // console.log(user);

    const handleLogout = async () => {
        try {
            await logOut()
            toast.success("Sign out successfully")
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-full bg-white shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
                        {/* Logo */}
                        <div className='block cursor-pointer font-bold'>
                            <Link to='/'>
                                <div className="text-3xl font-extrabold tracking-widest text-blue-600 hover:scale-110 transition-transform duration-300">
                                    ~日本~
                                </div>
                            </Link>
                        </div>

                        {/* Dropdown Menu */}
                        <div className='relative flex'>
                            <ul className='menu menu-horizontal px-1 flex flex-row items-center gap-4 mx-6'>
                                <li>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li>
                                    <Link to='/lessons'>Lessons</Link>
                                </li>
                            </ul>

                            <div className='flex flex-row items-center gap-3'>

                                {/* Dropdown btn */}
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                                >
                                    <AiOutlineMenu />
                                    <div className='hidden md:block'>
                                        {/* Avatar */}
                                        <img
                                            className='rounded-full'
                                            referrerPolicy='no-referrer'
                                            src={user && user?.photoURL || "https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
                                            alt='profile'
                                            height='30'
                                            width='30'
                                        />
                                    </div>
                                </div>
                            </div>
                            {isOpen && (
                                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                                    <div className='flex flex-col cursor-pointer'>
                                        <Link
                                            to='/'
                                            className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                        >
                                            Home
                                        </Link>
                                        {user ? (
                                            <>
                                                <Link
                                                    to='/dashboard'
                                                    className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                    Dashboard
                                                </Link>
                                                <div
                                                    onClick={handleLogout}
                                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                                >
                                                    Logout
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    to='/login'
                                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    to='/signup'
                                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                    Sign Up
                                                </Link>
                                            </>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar