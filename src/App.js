import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* layouts */
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";

/* pages */
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Property from "./pages/Property";

function App() {
  return (
    <div className="App">
      <Router basename="/project/prime-estate">
      {/* <Router> */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<Property />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;