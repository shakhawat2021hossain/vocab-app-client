import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllVocab = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // State for filtering by lessonNo
    const [filterLesson, setFilterLesson] = useState('');

    const { data: lessons = [], refetch } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/lessons');
            return data;
        },
    });

    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, pronunciation }) => {
            const { data } = await axiosSecure.delete(`/vocab/delete/${id}/${pronunciation}`);
            return data;
        },
        onSuccess: () => {
            refetch();
        },
    });

    const handleDelete = (id, pronunciation) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateAsync({ id, pronunciation });
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } else {
                Swal.fire('Cancelled', 'Your file is safe :)', 'error');
            }
        });
    };

    // Filtering
    const filteredLessons = filterLesson
        ? lessons.filter((lesson) => lesson.lessonNo === parseInt(filterLesson))
        : lessons;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Vocabulary Details</h1>

            {/* Filtering Dropdown */}
            <div className="mb-4 text-center">
                <label className="mr-2 font-medium">Filter:</label>
                <select
                    className="p-2 border rounded-md"
                    value={filterLesson}
                    onChange={(e) => setFilterLesson(e.target.value)}
                >
                    <option value="">All</option>
                    {lessons.map((lesson) => (
                        <option key={lesson._id} value={lesson.lessonNo}>
                            Lesson {lesson.lessonNo}
                        </option>
                    ))}
                </select>
            </div>

            {/* Vocabulary Table */}
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-4 text-left">Word</th>
                            <th className="py-2 px-4 text-left">Meaning</th>
                            <th className="py-2 px-4 text-left">Pronunciation</th>
                            <th className="py-2 px-4 text-left">When to Say</th>
                            <th className="py-2 px-4 text-left">Lesson No</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLessons.map((lesson) =>
                            lesson.vocabularies.map((vocab, index) => (
                                <tr
                                    key={`${lesson.lessonNo}-${index}`}
                                    className="border-b hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="py-2 px-4">{vocab.word}</td>
                                    <td className="py-2 px-4">{vocab.meaning}</td>
                                    <td className="py-2 px-4">{vocab.pronunciation}</td>
                                    <td className="py-2 px-4">{vocab.whenToSay}</td>
                                    <td className="py-2 px-4">{lesson.lessonNo}</td>
                                    <td className="py-2 px-4 text-center space-x-3">
                                        <Link
                                            to={`/dashboard/update-vocab/${lesson._id}/${vocab?.pronunciation}`}
                                            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                            ></span>
                                            <span className="relative">Update</span>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(lesson._id, vocab?.pronunciation)
                                            }
                                            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                            ></span>
                                            <span className="relative">Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllVocab;
