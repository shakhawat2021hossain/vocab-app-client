import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Lesson from './Lesson';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Lessons = () => {
    const axiosPublic = useAxiosPublic();
    const { data: lessons = [], isLoading } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/lessons');
            return data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                    Explore Our Lessons
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Master new vocabulary through our carefully structured lessons
                </p>
            </div>

            {lessons.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {lessons.map((lesson) => (
                        <Lesson key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto h-24 w-24 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No lessons available</h3>
                    <p className="mt-1 text-gray-500">Please check back later for new lessons.</p>
                </div>
            )}
        </div>
    );
};

export default Lessons;