import './styles/global.css';
import { Routes, Route } from "react-router-dom";

/* layouts */
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";

/* pages */
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import Agents from "./pages/Agents";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>
        <Footer />
    </div>
  );
}

export default App;