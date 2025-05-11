import React from "react";
import PreviewPage from "./pages/PreviewPage";
import { MovieDataProvider } from "./context/MovieDataContext";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <MovieDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </BrowserRouter>
    </MovieDataProvider>
  );
}

export default App;
