import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { login } from "../utils/api";
const LoginPage = ({ signup, setLogged, setSignup,setShowHome }) => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [rememberMe,setRememberMe] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data ----- ",formData)
    if(formData.name === '' && formData.password === ''){
      return;
    }
    let result;
    try{
      result = await login(formData);
      console.log("login cred front end", result);
    }catch(error){
      console.log("user not found")
      return;
    }
    // Assuming the login function returns some data indicating success or failure
    if (result.data.success) {
      console.log("olduser ----- ",result.data.oldUser._id);
      if(rememberMe){
      localStorage.setItem("UserIdMajor",result.data.oldUser._id);
      }
      // Update the logged state to true
      setLogged(false);
      setShowHome(true)
    } else {
      // Optionally, you can handle unsuccessful login here
      // Maybe display an error message or reset the form
      console.error("Login failed:", result.error);
    }
  };
  const handleGoToSignup = () => {
    setSignup(true);
    setLogged(false)
  };
  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="checkbox">Remember Me</label>
          <input type="checkbox" id="remember me" onChange={(e)=>setRememberMe(!rememberMe)} style={{width:20,height:20}}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
      <Button
        onClick={handleGoToSignup}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2 }}
      >
        Go to Signup
      </Button>
      </Container>

    </>
  );
};

export default LoginPage;
