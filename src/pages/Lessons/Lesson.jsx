import React from 'react';
import { Link } from 'react-router-dom';

const Lesson = ({ lesson }) => {
    
    return (
        <div
            key={lesson.lessonNo}
            className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-100 transition duration-300"
        >
            <h2 className="text-xl font-semibold text-black">
                Lesson {lesson.lessonNo}: {lesson.lessonName}
            </h2>
            <p className="text-gray-600 mt-2">
                Number of Vocabularies:{" "}
                <span className="font-bold">{lesson.vocabularies.length}</span>
            </p>
            <Link
                to={`/lesson/${lesson._id}`}
                className="block text-center mt-4 w-full px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-700 hover:tracking-widest transition-all"
            >
                View
            </Link>

        </div>
    );
};

export default Lesson;