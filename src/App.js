import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Favourites from "./Components/Favourites";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
