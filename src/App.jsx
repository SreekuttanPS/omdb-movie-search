import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieList } from "./Includes/MovieList";
import { MovieInfo } from "./Includes/MovieInfo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MovieList />}></Route>
        <Route exact path="/search" element={<MovieList />}></Route>
        <Route exact path="/info" element={<MovieInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
