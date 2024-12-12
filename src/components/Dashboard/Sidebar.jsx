import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import MenuItem from './MenuItem'
import { TfiStatsUp } from "react-icons/tfi";
import { FaBars, FaBookReader, FaUsers } from 'react-icons/fa'
import { BiSolidBookAdd } from "react-icons/bi";
import useRole from '../../hooks/useRole'
import LoadingSpinner from '../Shared/LoadingSpinner'



const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)
    const [role, isLoading] = useRole()
    const { user, loading } = useAuth()

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    if (loading || isLoading) return <LoadingSpinner />
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer py-2 font-bold'>
                        <Link to='/'>
                            <div className="text-3xl font-extrabold tracking-widest text-blue-600 hover:scale-110 transition-transform duration-300">
                                ~日本~
                            </div>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <FaBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'}  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 shadow-transparent justify-center items-center mx-auto'>
                            <Link to='/'>
                                <div className="text-3xl font-extrabold tracking-widest text-blue-600 hover:scale-110 transition-transform duration-300">
                                    ~日本~
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-4'>
                        <nav>
                            <MenuItem address={'/dashboard'} label={'Profile'} icon={FcSettings} />

                            {
                                role === 'admin' && <>
                                    <MenuItem label={"Statistics"} address={'/dashboard/statistics'} icon={TfiStatsUp} />
                                    <MenuItem label={"All Lessons"} address={'/dashboard/all-lesson'} icon={FaBookReader} />
                                    <MenuItem label={"Vocabularies"} address={'/dashboard/all-vocab'} icon={FaBookReader} />
                                    <MenuItem label={"Add Lesson"} address={'/dashboard/add-lesson'} icon={BiSolidBookAdd} />
                                    <MenuItem label={"Manage Users"} address={'/dashboard/users'} icon={FaUsers} />
                                </>
                            }




                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar