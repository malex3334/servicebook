import "./App.css";
import Navigation from "./components/Navigation";
import MyGarage from "./pages/MyGarage";
import Start from "./pages/Start";
import About from "./pages/About";
import SingleCar from "./pages/SingleCar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import User from "./pages/User";
import { useEffect, useState } from "react";

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
        <Route path="cars" element={<MyGarage />} />
        {/* todo: zweryfikować czy user może wyświelić auto o danym id! */}
        {user ? (
          <Route path="cars/:id" element={<SingleCar />} />
        ) : (
          <Route path="login" element={<Login />} />
        )}

        <Route path="user" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
