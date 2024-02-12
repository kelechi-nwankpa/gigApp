import React from "react";
import "./App.scss";
import Navbar from "./component/navbar/Navbar";
import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  // Route,
  // Link,
} from "react-router-dom";
import Footer from "./component/footer/Footer";
import Gigs from "./pages/gigs/gigs";
import Gig from "./pages/gig/gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/myGigs";
import AddGig from "./pages/addGig/addGig";
import Messages from "./pages/messages/messages";
import Message from "./pages/message/message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Pay from "./component/pay/Pay";
import Success from "./pages/success/Success";



const App = () => {

// Create a client
const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/myGigs",
          element: <MyGigs />
        },
        {
          path: "/addGig",
          element: <AddGig />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
        {
          path: "/success",
          element: <Success />
        }


      ]
    },

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App
