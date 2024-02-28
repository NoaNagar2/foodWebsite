import React, { useState } from "react";
import { Button, Box, TextField, Alert } from "@mui/material";
import axios from "axios";
import { registerValidation } from "../../validation/registerValidation";
import { toast } from "react-toastify";
import { storeToken } from "../../service/storageService";
import useLogin from "./autoLogin";

const RegisterComponent = () => {
  const [errorsState, setErrorsState] = useState(null);
  const autoLogin = useLogin();
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleInputsChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const joiValidate = registerValidation(inputValue);
      setErrorsState(joiValidate);
      if (joiValidate) return;

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users",
        inputValue
      );
      storeToken(data.jwt);
      autoLogin(true);
      toast.success("נרשמת בהצלחה!", {
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

  let errorMassage = "אנא ודא/י שהשדה מלא (לפחות 2 תוים)";

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        name="firstName"
        id="firstName"
        label="שם פרטי"
        value={inputValue.firstName}
        onChange={handleInputsChange}
        required
        fullWidth
      />
      {errorsState && errorsState.firstName && (
        <Alert severity="warning">{errorMassage}</Alert>
      )}
      <TextField
        name="lastName"
        id="lastName"
        label="שם משפחה"
        value={inputValue.lastName}
        onChange={handleInputsChange}
        sx={{ mt: 2 }}
        required
        fullWidth
      />
      {errorsState && errorsState.lastName && (
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
      <TextField
        name="email"
        id="email"
        label="אימייל"
        value={inputValue.email}
        onChange={handleInputsChange}
        sx={{ mt: 2 }}
        required
        fullWidth
      />
      {errorsState && errorsState.email && (
        <Alert severity="warning">{errorMassage}</Alert>
      )}
      <TextField
        name="phone"
        id="phone"
        label="טלפון"
        value={inputValue.phone}
        onChange={handleInputsChange}
        sx={{ mt: 2 }}
        required
        fullWidth
      />
      {errorsState && errorsState.phone && (
        <Alert severity="warning">{errorMassage}</Alert>
      )}
      <Button onClick={handleSubmit}>סיימתי</Button>
    </Box>
  );
};

export default RegisterComponent;
