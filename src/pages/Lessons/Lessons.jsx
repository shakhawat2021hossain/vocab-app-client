import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query'
import Lesson from './Lesson';

const Lessons = () => {
    const axiosPublic = useAxiosPublic()
    const { data: lessons = [] } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/lessons')
            return data
        }
    })
    console.log(lessons);

    
    return (
        <div className='py-6 bg-white dark:bg-gray-900'>
            <h1 className='text-center text-3xl my-3 font-bold'>Lessons</h1>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {lessons.map((lesson) => (
                    <Lesson key={lesson._id} lesson={lesson}/>
                ))}
            </div>
        </div>
    );
};

export default Lessons;