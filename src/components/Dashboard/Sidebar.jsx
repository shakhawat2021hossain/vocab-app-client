import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import MenuItem from './MenuItem'
import useRole from '../../hooks/useRole'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useLogout from '../../hooks/useLogOut'
import {
    FaBars,
    FaBookReader,
    FaHome,
    FaUsers,
    FaTimes
} from 'react-icons/fa'
import {
    BiSolidBookAdd,
    BiLogOut,
    BiCog
} from 'react-icons/bi'
import { MdDashboard } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'

const Sidebar = () => {
    const [isActive, setActive] = useState(false)
    const [role, isLoading] = useRole()
    const { user, loading } = useAuth()
    const { logOut } = useLogout()
    const location = useLocation()

    // Close sidebar when navigating or clicking outside on mobile
    useEffect(() => {
        setActive(false)
    }, [location])

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isActive && !event.target.closest('.sidebar-container')) {
                setActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isActive])

    const handleToggle = () => {
        setActive(!isActive)
    }

    const handleLogout = async () => {
        try {
            await logOut()
        } catch (err) {
            console.log(err)
        }
    }

    if (loading || isLoading) return <LoadingSpinner />

    return (
        <>
            {/* Mobile Header */}
            <div className='md:hidden flex items-center justify-between p-4 bg-dark-800 border-b border-dark-700'>
                <Link to='/' className='group'>
                    <div className="text-3xl font-extrabold tracking-widest text-primary-500 group-hover:text-primary-400 transition-colors">
                        日本
                    </div>
                </Link>

                <button
                    onClick={handleToggle}
                    className='text-dark-300 hover:text-primary-400 p-2 focus:outline-none'
                    aria-label="Toggle menu"
                >
                    {isActive ? <RiCloseFill size={24} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`sidebar-container z-20 md:fixed flex flex-col justify-between bg-dark-800 border-r border-dark-700 w-64 h-full space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${!isActive && '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out`}
            >
                <div>
                    {/* Logo */}
                    <div className='hidden md:flex justify-center mb-8'>
                        <Link to='/' className="group">
                            <div className="text-3xl font-extrabold tracking-widest text-primary-500 group-hover:text-primary-400 transition-colors">
                                日本
                            </div>
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className='flex items-center gap-3 px-2 py-3 mb-6 rounded-lg bg-dark-750'>
                        <img
                            className='w-10 h-10 rounded-full border-2 border-primary-500/30'
                            src={user?.img || "https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
                            alt={user?.name}
                        />
                        <div>
                            <h4 className='text-sm font-medium text-dark-100'>{user?.name}</h4>
                            <p className='text-xs text-primary-400 capitalize'>{role}</p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className='space-y-1'>
                        <MenuItem
                            address={'/dashboard'}
                            label={'Dashboard'}
                            icon={MdDashboard}
                            isActive={location.pathname === '/dashboard'}
                        />

                        {role === 'admin' && (
                            <>
                                <MenuItem
                                    label={"All Lessons"}
                                    address={'/dashboard/all-lesson'}
                                    icon={FaBookReader}
                                    isActive={location.pathname.includes('/dashboard/all-lesson')}
                                />
                                <MenuItem
                                    label={"Vocabularies"}
                                    address={'/dashboard/all-vocab'}
                                    icon={FaBookReader}
                                    isActive={location.pathname.includes('/dashboard/all-vocab')}
                                />
                                <MenuItem
                                    label={"Add Lesson"}
                                    address={'/dashboard/add-lesson'}
                                    icon={BiSolidBookAdd}
                                    isActive={location.pathname.includes('/dashboard/add-lesson')}
                                />
                                <MenuItem
                                    label={"Manage Users"}
                                    address={'/dashboard/users'}
                                    icon={FaUsers}
                                    isActive={location.pathname.includes('/dashboard/users')}
                                />
                            </>
                        )}

                        <MenuItem
                            address={'/dashboard/settings'}
                            label={'Settings'}
                            icon={BiCog}
                            isActive={location.pathname.includes('/dashboard/settings')}
                        />
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className='space-y-2'>
                    <MenuItem
                        address={'/'}
                        label={'Home'}
                        icon={FaHome}
                        isActive={location.pathname === '/'}
                    />

                    <button
                        onClick={handleLogout}
                        className='flex w-full items-center px-3 py-3 text-dark-300 hover:bg-dark-700 hover:text-primary-400 rounded-lg transition-colors duration-200 group'
                    >
                        <BiLogOut className='w-5 h-5 group-hover:text-primary-400' />
                        <span className='ml-3 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar