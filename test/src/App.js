
import React from "react";
import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import BubbleChart from "./component/BubbleChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BubbleChart />} />
        
      </Routes>
    </Router>
  );
}

export default App;



