import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Layout = lazy(() => import("./pages/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));
const Brand = lazy(() => import("./pages/Brand"));
const Categories = lazy(() => import("./pages/Categories"));
const Other = lazy(() => import("./pages/Other"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Bran = lazy(() => import("./pages/Bran")); // check if typo

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <CircularProgress size={80} />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
      { path: "brand", element: <Brand /> },
      {
        path: "other",
        element: <Other />,
        children: [
          { index: true, element: <Categories /> },
          { path: "brands", element: <Bran /> },
        ],
      },
      { path: "addproducts", element: <AddProduct /> },
    ],
  },
]);

const App = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;