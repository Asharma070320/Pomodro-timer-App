import React from 'react'
import SignUp from './Components/SignUp'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/Login'
import Timer from './Components/Timer'

const App = () => {

 


  const routes = createBrowserRouter([
    {
      path: '/',
      element: <SignUp />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/timer',
      element: <Timer />
    }
  ])
  return (
    <RouterProvider router={routes}>
      
    </RouterProvider>
  )
}

export default App
