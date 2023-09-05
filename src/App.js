import "./App.css";
import Navigation from "./components/Navigation";
import MyServices from "./pages/MyServices";
import Start from "./pages/Start";
import About from "./pages/About";
import SingleCar from "./pages/SingleCar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="start" element={<Start />} />
        <Route path="about" element={<About />} />
        <Route path="cars" element={<MyServices />} />
        <Route path="cars/:id" element={<SingleCar />} />
      </Routes>
    </div>
  );
}

export default App;
