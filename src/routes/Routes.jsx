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
import AddLesson from "../pages/Dashboard/AddLesson";
import AddVocab from "../pages/Dashboard/AddVocab";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import AllLesson from "../pages/Dashboard/AllLesson";
import AdminRoute from "./AdminRoute";
import Profile from "../pages/Dashboard/Profile";
import AllVocab from "../pages/Dashboard/AllVocab";
import UpdateVocab from "../pages/Dashboard/UpdateVocab";
import Tutorials from "../pages/Tutorials/Tutorials";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><Main /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Lessons />
            },
            // {
            //     path: '/lessons',
            //     element: <Lessons />
            // },
            {
                path: '/lesson/:id',
                element: <PrivateRoute><LessonDetails /></PrivateRoute>
            },
            {
                path: '/tutorials',
                element: <Tutorials />
            },
        ]
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Profile />
            },
            {
                path: 'statistics',
                element: <AdminRoute><Statistics /></AdminRoute>
            },
            {
                path: 'add-lesson',
                element: <AdminRoute><AddLesson /></AdminRoute>
            },
            {
                path: 'add-vocab/:id',
                element: <AdminRoute><AddVocab /></AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'all-lesson',
                element: <AdminRoute><AllLesson /></AdminRoute>
            },
            {
                path: 'all-vocab',
                element: <AdminRoute><AllVocab /></AdminRoute>
            },
            {
                path: 'update-vocab/:id/:pronunciation',
                element: <AdminRoute><UpdateVocab /></AdminRoute>
            },


        ]
    },
])