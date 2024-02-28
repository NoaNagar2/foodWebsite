import React, { useState } from "react";
import { Button, Box, TextField, Alert } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { loginValidation } from "../../validation/loginValidation";
import { storeToken } from "../../service/storageService";
import useLogin from "./autoLogin";

const LoginComponent = () => {
  const [errorsState, setErrorsState] = useState(null);
  const autoLogin = useLogin();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleInputsChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const joiValidate = loginValidation(inputValue);
      console.log(joiValidate);

      setErrorsState(joiValidate);
      if (joiValidate) return;

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        inputValue
      );
      storeToken(data.jwt);
      autoLogin();
      toast.success("התחברת בהצלחה!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (e) {
      toast.error("נסה שנית...", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  let errorMassage = "השדה חייב להיות מלא (לפחות 2 תוים)";

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        name="email"
        id="email"
        label="אימייל"
        value={inputValue.email}
        onChange={handleInputsChange}
        required
        fullWidth
      />
      {errorsState && errorsState.email && (
        <Alert severity="warning">{errorMassage}</Alert>
      )}
      <TextField
        name="password"
        id="password"
        label="סיסמא"
        value={inputValue.password}
        onChange={handleInputsChange}
        sx={{ mt: 2 }}
        required
        fullWidth
      />
      {errorsState && errorsState.password && (
        <Alert severity="warning">{errorMassage}</Alert>
      )}

      <Button onClick={handleSubmit}>סיימתי</Button>
    </Box>
  );
};

export default LoginComponent;
