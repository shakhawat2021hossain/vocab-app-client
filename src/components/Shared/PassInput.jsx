import React from 'react';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";

const PassInput = () => {
    const [showPass, setShowPass] = useState(false)

    return (
        <div className="relative">
            <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                placeholder="******"
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            <span onClick={() => setShowPass(!showPass)} className="absolute top-[56%] transform -translate-y-1/2 right-2 cursor-pointer text-gray-600">
                {showPass ?  <IoIosEye /> : <IoIosEyeOff />}
            </span>
        </div>
    );
};

export default PassInput;