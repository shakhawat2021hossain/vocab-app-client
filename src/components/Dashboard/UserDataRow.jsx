import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import UpdateUserModal from './UpdateUserModal';
const UserDataRow = ({ user, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (userData) => {
            const { data } = await axiosSecure.patch(`/user/role/${user?.email}`, userData)
            return data
        },
        onSuccess: () => {
            refetch()
            toast.success("User role updated successfully")
        }
    })

    const modalHandler = async (selected) => {
        const user = {
            role: selected
        }
        try {
            const data = await mutateAsync(user)
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Update Role</span>
                </button>
                {/* Update User Modal */}
                <UpdateUserModal setIsOpen={setIsOpen} isOpen={isOpen} user={user} modalHandler={modalHandler} />
            </td>
        </tr>
    )
}

export default UserDataRow