import "./App.css";
import NoteState from "./context/NoteState";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  // RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import HomeIndex from "./components/HomeIndex";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {

  const [alert,setAlert] =useState(null);

  const showAlert = (message,type) =>{
        setAlert(
          {
            msg : message,
            type :type
          }
        )
        setTimeout(() => {
          setAlert(null)
        }, 2000);
  }

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<HomeIndex showAlert={showAlert} />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
