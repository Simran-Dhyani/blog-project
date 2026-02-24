import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./components/pages/home.jsx";
import { RouterProvider } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import AddPost from './components/pages/AddPost.jsx'
import SignUp from './components/pages/signup.jsx'
import EditPosts from './components/pages/editPost.jsx'
import Post from './components/pages/post.jsx'
import AllPosts from './components/pages/allPosts.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUp />
                </AuthLayout>
            ),
        },
        {
            path: "/all-Posts",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/Add-Post",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <EditPosts/>
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: (
                <AuthLayout authentication={true}>
                    <Post />
                </AuthLayout>
            ),
        },
    ],
},
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
