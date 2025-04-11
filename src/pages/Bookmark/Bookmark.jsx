import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Bookmark = () => {
    const axiosSecure = useAxiosSecure()
    const {data: bookmark = []} =  useQuery({

        queryKey: ["bookmark"],
        queryFn: async () =>{
            const {data} = await axiosSecure.get('/bookmark')
            console.log(data);
            return data
        }
    })
    console.log(bookmark);
    return (
        <div>
            {bookmark?.length}
        </div>
    );
};

export default Bookmark;