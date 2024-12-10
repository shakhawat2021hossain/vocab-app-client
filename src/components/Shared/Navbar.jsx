import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";





const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)



    return (
        <div className='w-full bg-white shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
                        {/* Logo */}
                        <p className='font-semibold text-2xl'>Learn</p>
                        {/* Dropdown Menu */}
                        <div className='relative'>
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
                                            src={"https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
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