import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// pages

// components
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/character/:id" element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
