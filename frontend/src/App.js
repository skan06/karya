import "./App.css";
import Home from "./component/Home/Home";
import Header from "./component/Home/Header";
import LoginSignup from "./component/Authentication/LoginSignup";
import Profile from "./component/Profile";
import { Route, Routes } from "react-router-dom";



function App() {

  return (
    <div className="App">
      <Header />
      <Home />
      <LoginSignup/>
      <Routes>
        <Route path="Profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
