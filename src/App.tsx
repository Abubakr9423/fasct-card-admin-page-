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
const AddProduct = lazy(() => import("./pages/AddProduct"));
import CircularProgress from "@mui/material/CircularProgress";


const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <CircularProgress size={80} />
  </div>
);



const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div><Loader /></div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        { index: true, element: <Suspense fallback={<div><Loader /></div>}><Login /></Suspense> },
        { path: "/dashboard", element: <Suspense fallback={<div><Loader /></div>}><Dashboard /></Suspense> },
        { path: "/orders", element: <Suspense fallback={<div><Loader /></div>}><Orders /></Suspense> },
        { path: "/products", element: <Suspense fallback={<div><Loader /></div>}><Products /></Suspense> },
        { path: "/categories", element: <Suspense fallback={<div><Loader /></div>}><Categories /></Suspense> },
        { path: "/brand", element: <Suspense fallback={<div><Loader /></div>}><Brand /></Suspense> },
        { path: "/other", element: <Suspense fallback={<div><Loader /></div>}><Other /></Suspense> },
        { path: "/addproducts", element: <Suspense fallback={<div><Loader /></div>}><AddProduct /></Suspense> },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;