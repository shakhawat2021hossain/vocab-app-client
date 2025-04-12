import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const UpdateVocab = () => {
    const { id, pronunciation } = useParams();
    // console.log(id, pronunciation);

    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();

    const { data: vocab, isLoading } = useQuery({
        queryKey: ["vocab", id, pronunciation],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/vocab/${id}/${pronunciation}`);
            return data;
        },
    });
    // console.log(vocab);

    const { mutateAsync } = useMutation({
        mutationFn: async (vocabulary) => {
            const { data } = await axiosSecure.patch(`/vocab/update/${id}/${pronunciation}`, vocabulary)
            return data
        },
        onSuccess: () => {
            toast.success("Updated vocab successfully")
            navigate('/dashboard/all-vocab')
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("vocab add");
        const word = e.target.word.value
        const pronunciation = e.target.pronunciation.value
        const meaning = e.target.meaning.value
        const whenToSay = e.target.whenToSay.value
        const vocab = { word, pronunciation, meaning, whenToSay }
        // console.log(vocab);

        try {
            await mutateAsync(vocab)
        }
        catch (err) {
            console.log(err);
        }
    };

    

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
                    Add New Vocabulary
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Word</label>
                    <input
                        type="text"
                        id="word"
                        defaultValue={vocab?.word}
                        placeholder="Enter Japanese Word"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Pronunciation</label>
                    <input
                        type="text"
                        id="pronunciation"
                        defaultValue={vocab?.pronunciation}
                        placeholder="Enter Pronunciation"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Meaning</label>
                    <input
                        type="text"
                        id="meaning"
                        defaultValue={vocab?.meaning}
                        placeholder="Enter Meaning"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">When to Say</label>
                    <input
                        type="text"
                        id="whenToSay"
                        defaultValue={vocab?.whenToSay}
                        placeholder="When to use this word?"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200 font-semibold"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateVocab;
