// import logo from "./logo.svg";
// import axios from "axios";
import "./App.css";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
export default App;
