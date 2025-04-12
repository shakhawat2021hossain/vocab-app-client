import React from 'react';
import { Link } from 'react-router-dom';

const Lesson = ({ lesson }) => {
    return (
        <div className="relative border border-dark-700 rounded-lg bg-dark-800 hover:bg-dark-750 transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 shadow-card hover:shadow-card-hover">
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-semibold text-primary-300 bg-primary-900 bg-opacity-30 rounded-full">
                        Lesson {lesson.lessonNo}
                    </span>
                    <span className="text-xs font-medium text-dark-400">
                        {lesson.vocabularies.length} {lesson.vocabularies.length === 1 ? 'term' : 'terms'}
                    </span>
                </div>
                
                <h2 className="text-lg font-bold text-dark-100 mb-3 line-clamp-2">
                    {lesson.lessonName}
                </h2>
                
                <div className="mt-6">
                    <Link
                        to={`/lesson/${lesson._id}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-md hover:from-primary-700 hover:to-primary-600 transition-all group-hover:shadow-lg"
                    >
                        Start Learning
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Lesson;