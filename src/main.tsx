import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { loader as galleryLoader } from "./pages/Gallery";
// import Home, { loader as homeLoader } from "./pages/Home";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Gallery from "./pages/Gallery";
import Piece from "./pages/Piece";
import Contact from "./pages/Contact";
import Layout from "./pages/TopLevelOverlay";
import GlobalWrapper from "./components/wrappers/GlobalWrapper";
// import Testing from "./pages/Testing";

const router = createBrowserRouter([
  {
    element: <GlobalWrapper />,
    errorElement: <></>,
    hydrateFallbackElement: (
      <div className="h-screen w-screen bg-primary-gray" />
    ),
    children: [
      {
        element: <Layout />,
        loader: galleryLoader,
        children: [
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
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ],
      },
      {
        path: "/",
        element: <Gallery />,
        loader: galleryLoader,
      },
      {
        path: "piece-not-found",
        element: <div>Piece not found</div>,
      },
      // {
      //   path: "test",
      //   element: <Testing />,
      //   loader: galleryLoader,
      // },
      // {
      //   path: "/home",
      //   element: <Home />,
      //   loader: homeLoader,
      // },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
