import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/property/:id" element={<Property />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;