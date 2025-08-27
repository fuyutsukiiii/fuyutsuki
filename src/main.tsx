import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { loader as newGalleryLoader } from "./pages/Gallery";
import Home, { loader as homeLoader } from "./pages/Home";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Gallery from "./pages/Gallery";
import Piece from "./pages/Piece";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";
import GlobalWrapper from "./components/templates/GlobalWrapper";

const router = createBrowserRouter([
  {
    element: <GlobalWrapper />,
    errorElement: <></>,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "gallery",
            element: <Gallery />,
            loader: newGalleryLoader,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "illustration/:pieceSlug",
            element: <Piece />,
            // loader: pieceLoader,
          },
          {
            path: "piece-not-found",
            element: <div>Piece not found</div>,
          },
          {
            path: "*",
            element: <Navigate to="/home" replace />,
          },
        ],
      },
      // {
      //   path: "testing",
      //   element: <Testing />,
      //   loader: homeLoader,
      // },
      // {
      //   path: "/old-home",
      //   element: <OldHome />,
      //   loader: homeLoader,
      // },
      {
        path: "/home",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
