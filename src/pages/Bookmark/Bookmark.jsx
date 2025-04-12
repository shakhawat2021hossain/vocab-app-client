
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { BiTrash } from 'react-icons/bi';
import { FiBookmark } from 'react-icons/fi';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Bookmark = () => {
    const axiosSecure = useAxiosSecure();

    const { data: bookmark = [], isLoading, refetch } = useQuery({
        queryKey: ["bookmark"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/bookmark');
            // console.log(data);
            return data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/bookmark/${id}`)
            // console.log(data);
            return data
        },
        onSuccess: () =>{
            refetch()
        },
        onError: (data) =>{
            // console.log(data);
            toast.error("Something went wrong")
        }
    })

    const handleRemove = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then(async (result) => {
            if (result.isConfirmed) {

                await mutateAsync(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            } else {

                Swal.fire(
                    'Cancelled',
                    'Your file is safe :)',
                    'error'
                );
            }
        });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
                <FiBookmark className="text-blue-500 text-3xl" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Bookmarked Words</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pronunciation</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meaning</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                                <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookmark.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.word?.word}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 italic">{item.word?.pronunciation}</td>
                                    <td className="px-5 py-4 text-sm text-gray-700 max-w-xs">{item.word?.meaning}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                            {item.lesson?.lessonName}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-center">
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                                            title="Remove Bookmark"
                                            aria-label="Remove bookmark"
                                        >
                                            <BiTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {bookmark.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-5 py-8 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <FiBookmark className="text-4xl mb-2" />
                                            <p className="text-lg">No bookmarked words yet</p>
                                            <p className="text-sm mt-1">Words you bookmark will appear here</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;