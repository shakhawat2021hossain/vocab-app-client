import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogOut';
import { BiBookmark } from 'react-icons/bi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()
    const { logOut } = useLogout()

    const handleLogout = async () => {
        try {
            await logOut()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-full bg-dark-800 shadow-sm border-b border-dark-700'>
            <div className='py-4'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        {/* Logo */}
                        <div className='block cursor-pointer font-bold'>
                            <Link to='/'>
                                <div className="text-3xl font-extrabold tracking-widest text-primary-500 hover:text-primary-400 transition-colors duration-300">
                                    日本
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className='relative flex'>
                            <ul className='menu menu-horizontal px-1 font-semibold flex flex-row items-center gap-6 mx-6'>
                                <li>
                                    <NavLink to='/' className='text-dark-100 hover:text-primary-400 transition-colors'>
                                        Lessons
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/tutorials' className='text-dark-100 hover:text-primary-400 transition-colors'>
                                        Tutorials
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/bookmark' className='text-dark-100 hover:text-primary-400 transition-colors'>
                                        <BiBookmark size={22} className="inline-block" />
                                    </NavLink>
                                </li>
                            </ul>

                            <div className='flex flex-row items-center gap-3'>
                                {/* Dropdown btn */}
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='p-3 md:py-1 md:px-2 border border-dark-600 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:bg-dark-700 transition-all'
                                >
                                    <AiOutlineMenu className="text-dark-300" />
                                    <div className='hidden md:block'>
                                        <img
                                            className='rounded-full h-8 w-8 object-cover'
                                            referrerPolicy='no-referrer'
                                            src={user && user?.img || "https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
                                            alt='profile'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className='absolute rounded-lg shadow-card-hover bg-dark-750 border border-dark-600 overflow-hidden right-0 top-12 text-sm z-50'>
                                    <div className='flex flex-col cursor-pointer'>
                                        {user ? (
                                            <>
                                                <Link
                                                    to='/dashboard'
                                                    className='block px-4 py-3 text-dark-100 hover:bg-dark-700 transition font-semibold'
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    onClick={handleLogout}
                                                    className='px-4 py-3 text-dark-100 hover:bg-dark-700 transition font-semibold cursor-pointer'
                                                >
                                                    Logout
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    to='/login'
                                                    className='px-4 py-3 text-dark-100 hover:bg-dark-700 transition font-semibold'
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    to='/signup'
                                                    className='px-4 py-3 text-dark-100 hover:bg-dark-700 transition font-semibold'
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

export default Navbar;