import React from 'react';
import { useQuery } from '@tanstack/react-query'
import Lesson from './Lesson';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Lessons = () => {
    const axiosSecure = useAxiosSecure()
    const { data: lessons = [] } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/lessons')
            return data
        }
    })
    


    
    return (
        <div className='py-6 bg-white my-8 rounded-lg'>
            <h1 className='text-center text-3xl my-3 font-bold'>Lessons</h1>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {lessons?.map((lesson) => (
                    <Lesson key={lesson._id} lesson={lesson}/>
                ))}
            </div>
        </div>
    );
};

export default Lessons;