import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Confetti from "react-confetti";

const LessonDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: lesson, isLoading } = useQuery({
        queryKey: ["lesson", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/lesson/${id}`);
            return data;
        },
    });

    const vocab = lesson?.vocabularies || [];
    const [currentPage, setCurrentPage] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleNext = () => {
        if (currentPage < vocab.length - 1) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleComplete = () => {
        setShowConfetti(true);
        setIsComplete(true);

        setTimeout(() => {
            setShowConfetti(false);
            navigate("/");
        }, 5000);
    };

    function pronounceWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "ja-JP"; // Japanese
        window.speechSynthesis.speak(utterance);
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-md mx-auto mt-10 p-5">
            {showConfetti && <Confetti />}

            {/* Vocabulary Card */}
            {vocab.length > 0 && !isComplete && (
                <div className="cursor-pointer">
                    <div onClick={() => pronounceWord(vocab[currentPage].word)} className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {vocab[currentPage].word} ({vocab[currentPage].pronunciation})
                        </h2>
                        <p className="text-gray-600">
                            <strong>Meaning:</strong> {vocab[currentPage].meaning}
                        </p>
                        <p className="mt-2 text-gray-600">
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

                        {currentPage === vocab.length - 1 ? (
                            <button
                                onClick={handleComplete}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Complete
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md ${currentPage < vocab.length - 1 &&
                                    "hover:bg-blue-500 hover:text-white cursor-pointer"
                                    }`}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Completion Message */}
            {isComplete && (
                <div className="text-center mt-5">
                    <h2 className="text-2xl font-bold text-green-500">Congratulations!</h2>
                    <p className="text-gray-700 mt-2">
                        You have successfully completed this lesson.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LessonDetails;
