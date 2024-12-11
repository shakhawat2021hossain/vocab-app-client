import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Lessons from "../pages/Lessons/Lessons";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import Statistics from "../pages/Dashboard/Statistics";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/lessons',
                element: <Lessons/>
            },
            {
                path: '/lesson/:id',
                element: <PrivateRoute><LessonDetails/></PrivateRoute>
            },
        ]
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
        children: [
            {
                index:true,
                element: <Statistics/>
            },
        ]
    },
])