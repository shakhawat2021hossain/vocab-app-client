import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Tutorials = () => {
    const axiosPublic = useAxiosPublic()
    const { data: tutorials = [], refetch } = useQuery({
        queryKey: ["tutorials"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/tutorials')
            return data
        }
    })
    // console.log(tutorials);
    const getYouTubeVideoId = (url) => {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/\S+\/?|\S+\/?))?([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : '';
    };


    return (
        <div className="container my-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Tutorials</h2>

            {tutorials.length === 0 ? (
                <p>No tutorials available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
                    {tutorials.map((tutorial) => (
                        <div key={tutorial._id} className="bg-white p-4 rounded shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                            <p className="text-gray-600 mb-4">{tutorial.description}</p>

                            <div className="mb-4 max-w-5xl">
                                <iframe
                                    width="100%"
                                    height="450"
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(tutorial.youtubeLink)}`}
                                    title={tutorial.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <a
                                href={tutorial.youtubeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tutorials;

