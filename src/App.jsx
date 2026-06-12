// App.jsx
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Sidebar from "./Components/sidebar/Sidebar";
import Addresses from "./routes/Addresses";
import Resume from "./Components/resume/Resume";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggle function called from Layout");
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      <Navbar onSidebarToggle={toggleSidebar} />   {/* ← PROP NAME MUST MATCH */}
      <Sidebar isOpen={sidebarOpen} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Addresses /> },
        { path: "/resume", element: <Resume /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;