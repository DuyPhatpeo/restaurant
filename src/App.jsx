import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/GlobalStyle";
import AppRoutes from "@routes/AppRoutes";

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>

      {/* Toast đẹp hơn */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default App;
