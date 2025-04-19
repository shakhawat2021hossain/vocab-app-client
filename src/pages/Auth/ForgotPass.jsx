import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ForgotPass = () => {
    const { loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (email) => {
            const { data } = await axiosPublic.post('/forgot-password', { email });
            return data;
        },
        onSuccess: (data) => {
            toast.success('Password reset link sent to your email!');
            setIsSubmitted(true);
        },
        onError: (error) => {
            toast.error('Failed to send reset link');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await mutateAsync(email);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
            <div className="w-full max-w-md bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-dark-100 mb-2">
                            Forgot Your Password?
                        </h1>
                        <p className="text-dark-400">
                            {isSubmitted
                                ? 'Check your email for the reset link'
                                : 'Enter your email to receive a password reset link'}
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute top-[30%] left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-6 w-6 text-dark-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-800 transition-all duration-200"
                            >
                                {isPending ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send Reset Link
                                        <FiArrowRight className="ml-2" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 mb-4">
                                <FiMail className="h-6 w-6 text-green-500" />
                            </div>
                            <p className="text-dark-300 mb-6">
                                We've sent a password reset link to <span className="font-medium text-primary-400">{email}</span>.
                                Please check your inbox.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="px-4 py-2 text-sm font-medium text-primary-400 hover:text-primary-300"
                            >
                                Resend Email
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-primary-400 hover:text-primary-300 hover:underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;