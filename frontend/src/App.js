import React, { useEffect, useState } from "react";
import Home from "./Home/Home";
import LoginPage from "./Home/LoginPage";
import SignupPage from "./Home/Signup";
// import Home

const App = () => {
  const [logged, setLogged] = useState(true);
  const [signup,setSignup] = useState(false);
  const [showHome,setShowHome] = useState(false);
  const [userId,setUserId] = useState(false);
  useEffect(()=>{
    const id = localStorage.getItem("UserIdMajor");
    if(id){
      setShowHome(true);
      setLogged(false);
      setSignup(false);
    }
  },[])
  return (
    <>
    {signup && <SignupPage setShowHome={setShowHome} setLogged={setLogged} setSignup={setSignup} />}
      {logged && <LoginPage  setShowHome={setShowHome} logged={logged} setLogged={setLogged} signup={signup} setSignup={setSignup} showHome={showHome}/>}
      {showHome && <Home setSignup={setSignup} setShowHome={setShowHome} setLogged={setLogged}/>}
    </>
  );
};

export default App;
