import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const LessonDetails = () => {

    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    // console.log(id);
    const { data: lesson } = useQuery({
        queryKey: ["lesson"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/lesson/${id}`)
            return data
        }
    })

    const vocab = lesson.vocabularies
    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = () => {
        if (currentPage < vocab.length - 1) setCurrentPage(currentPage + 1);
    };
    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-5">
            <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {vocab[currentPage].word} ({vocab[currentPage].pronunciation})
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    <strong>Meaning:</strong> {vocab[currentPage].meaning}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    <strong>When to Say:</strong> {vocab[currentPage].whenToSay}
                </p>
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-between mt-5">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md ${currentPage > 0 &&
                        "hover:bg-blue-500 hover:text-white cursor-pointer"
                        }`}
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentPage === vocab.length - 1}
                    className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md ${currentPage < vocab.length - 1 &&
                        "hover:bg-blue-500 hover:text-white cursor-pointer"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LessonDetails;
