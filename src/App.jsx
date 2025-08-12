import "./app.scss"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Addresses from "./routes/Addresses";
import Resume from "./Components/resume/Resume";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Addresses />
    },
    {
      path: "/resume",
      element: <Resume />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
