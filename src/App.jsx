// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@/GlobalStyle";

import AppRoutes from "@routes/AppRoutes";

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
