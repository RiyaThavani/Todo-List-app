import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import AllList from "./pages/AllList";
import Login from "./pages/Login";
import Rooterlayout from "./pages/Rooterlayout";
import Todo from "./pages/Todo";
import PrivateRoute from "./pages/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Rooterlayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },

      {
        path: "/List",
        element: <AllList />,
      },
      {
        path: "/todo/:id",
        element: <Todo />,
      },
    ],
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
