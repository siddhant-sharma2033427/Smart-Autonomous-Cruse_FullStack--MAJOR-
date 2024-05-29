import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup } from "../utils/api";

const SignupPage = ({ setLogged, setSignup, setShowHome }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [rememberMe,setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // If they don't match, display an error message or handle it as needed
      console.error("Password and confirm password do not match");
      return;
    }
    if(formData.name==='' && formData.password === ''){
      return;
    }
    let result
    try{
    result = await signup(formData);
    console.log("signup data",result);
    }catch(error){
      console.log("user not found");
      return;
    }
    if (result.data.success) {
      // Update the logged state to true
      console.log("new user ------ ",result.data.newUser._id)
      if(rememberMe){
      localStorage.setItem("UserIdMajor",result.data.newUser._id);
      }
      setSignup(false);
      setShowHome(true);
    } else {
      // Optionally, you can handle unsuccessful login here
      // Maybe display an error message or reset the form
      console.error("Login failed:", result.error);
    }
    console.log("Submitted:", formData);
  };
  const handleGoToLogin = () => {
    setLogged(true);
    setSignup(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Name"
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
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          Sign Up
        </Button>
      </form>
      <Button
        onClick={handleGoToLogin}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2 }}
      >
        Go to Login
      </Button>
    </Container>
  );
};

export default SignupPage;
