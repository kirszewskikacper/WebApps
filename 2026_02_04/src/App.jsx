import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/navbar/navbar.jsx";
import IndexPage from "./components/index/index.jsx";
import NewEntry from "./components/entry/entry.jsx";
import CategoryList from "./components/categories/categories.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/nwpis" element={<NewEntry />} />
        <Route path="/kat" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;

