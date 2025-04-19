import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const ResetPass = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const axiosSecure = useAxiosSecure()
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosSecure.patch(`/reset-password/${token}`, { password })
            console.log(data);
            return data
        },
        onSuccess: () => {
            toast.success("Password updated!")
            navigate('/login')
        },
    
    })

    const handleReset = async (e) => {
        e.preventDefault()
        try {
            await mutateAsync()
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to reset password")
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    placeholder="New Password"
                    className="input input-bordered w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit' className="btn btn-primary w-full">Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPass
