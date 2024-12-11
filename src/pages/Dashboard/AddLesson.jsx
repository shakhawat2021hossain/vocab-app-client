import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddLesson = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const {mutateAsync} = useMutation({
        mutationFn: async(lesson) =>{
            const {data} = await axiosSecure.post('/lesson', lesson)
            return data
        },
        onSuccess: () =>{
            toast.success("Successfully added a lesson")
            navigate('/dashboard/all-lesson')
        }
    })

    const handleAddLesson = async (e) => {
        e.preventDefault()
        const lessonNo = e.target.num.value
        const lessonName = e.target.title.value
        const lessonDescription = e.target.description.value
        const vocabularies = []
        const lessonData = {lessonNo, lessonName, lessonDescription, vocabularies}
        try{
            await mutateAsync(lessonData)
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold text-center mb-5">Add New Lesson</h2>
            <form onSubmit={handleAddLesson}>

                {/* Lesson Number */}
                <div className="mb-4">
                    <label className="block text-gray-700">Lesson Number</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Lesson Number"
                        id="num"
                        required
                    />
                </div>

                {/* Lesson Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Lesson Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Title"
                        id="title"
                        required
                    />
                </div>

                {/* description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Lesson Description</label>
                    <textarea
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter Description"
                        id="description"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200"
                >
                    Add Lesson
                </button>
            </form>
        </div>
    );
};

export default AddLesson;
