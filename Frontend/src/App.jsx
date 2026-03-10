import React from 'react'
import RootLayout from './components/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'

function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[{
        path:"/",
        element:<Home/>,
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"userdashbord",
        element:<UserDashboard/>
      },
      {
        path:"authordashbord",
        element:<AuthorDashboard/>
      }
    ]
    }
  ])

  return(
    <div>
      <RouterProvider router={routerObj}/>
    </div>
  )
}

export default App