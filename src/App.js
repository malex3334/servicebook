import "./App.css";
import Navigation from "./components/Navigation";
import MyServices from "./pages/MyServices";
import Start from "./pages/Start";
import About from "./pages/About";
import SingleCar from "./pages/SingleCar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { user } = useContext(DataContext);

  return (
    <div className="App">
      <div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: { background: "black", color: "white" },
          }}
        />
      </div>

      <Navigation />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Start />} />
        <Route path="about" element={<About />} />
        <Route path="cars" element={<MyServices />} />
        {/* todo: zweryfikować czy user może wyświelić auto o danym id! */}
        {user ? (
          <Route path="cars/:id" element={<SingleCar />} />
        ) : (
          <Route path="login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
