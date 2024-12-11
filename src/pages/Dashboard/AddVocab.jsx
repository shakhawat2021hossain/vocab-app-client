import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddVocab = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()

    const {mutateAsync} = useMutation({
        mutationFn: async (vocabularies) =>{
            const {data} = await axiosSecure.patch(`/lesson/vocab/${id}`, vocabularies)
            return data
        },
        onSuccess: () =>{
            toast.success("Added a new vocab")
            navigate('/dashboard/all-lesson')
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("vocab add");
        const word = e.target.word.value
        const pronunciation = e.target.pronunciation.value
        const meaning = e.target.meaning.value
        const whenToSay = e.target.whenToSay.value
        const vocab = {word, pronunciation, meaning, whenToSay}
        // console.log(vocab);

        try{
            await mutateAsync(vocab)
        }
        catch(err){
            console.log(err);
        }
    };

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
                        placeholder="When to use this word?"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200 font-semibold"
                >
                    Add Vocabulary
                </button>
            </form>
        </div>
    );
};

export default AddVocab;
