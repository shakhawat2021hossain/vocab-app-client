import React from 'react';
import { Link } from 'react-router-dom';

const LessonRow = ({lesson}) => {
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{lesson?.lessonNo}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{lesson?.lessonName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {lesson?.vocabularies.length}
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2'>
                <button className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </button>
                <Link to={`/dashboard/add-vocab/${lesson?._id}`} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Add Vocab</span>
                </Link>
            </td>
        </tr>
    );
};

export default LessonRow;