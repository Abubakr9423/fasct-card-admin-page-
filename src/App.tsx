import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./pages/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));
const Brand = lazy(() => import("./pages/Brand"));
const Categories = lazy(() => import("./pages/Categories"));
const Other = lazy(() => import("./pages/Other"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        { index: true, element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
        { path:"/dashboard", element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
        { path:"/orders", element: <Suspense fallback={<div>Loading...</div>}><Orders /></Suspense> },
        { path:"/products", element: <Suspense fallback={<div>Loading...</div>}><Products /></Suspense> },
        { path:"/categories", element: <Suspense fallback={<div>Loading...</div>}><Categories /></Suspense> },
        { path:"/brand", element: <Suspense fallback={<div>Loading...</div>}><Brand /></Suspense> },
        { path:"/other", element: <Suspense fallback={<div>Loading...</div>}><Other /></Suspense> },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;